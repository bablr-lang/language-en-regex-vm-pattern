import { buildCovers } from '@bablr/grammar';

let eat, match, eatMatch, guard;

const node = Symbol.for('@bablr/node');

// export const escapeCharacterClass = (str) => str.replace(/]\\-/g, (r) => `\\${r}`);

// To avoid dep cycles this grammar cannot depend on regex parsing!
const t = {
  RegexMatcher(regex) {
    return { value: regex };
  },

  Regex(pattern, flags) {
    return { pattern, flags };
  },

  Pattern(alternatives) {
    return { alternatives };
  },

  Flag(value) {
    return { value };
  },

  Flags(values) {
    return [...values].map((value) => t.Flag(value));
  },

  Alternative(elements) {
    return { elements };
  },

  Quantifier(min, max, element, greedy = true) {
    return { element, min, max, greedy };
  },

  Character(value) {
    return { value };
  },

  Characters(value) {
    return value.map((chr) => t.Character(chr));
  },

  CharacterClass(elements, negate = false) {
    return { elements, negate };
  },

  CharacterSet(kind, negate = false) {
    return { kind, negate };
  },

  CharacterClassRange(min, max) {
    return { min, max };
  },
};

export class RegexNodeGrammar {
  constructor() {
    this.covers = buildCovers({
      [node]: [
        'RegExpLiteral',
        'Flag',
        'Pattern',
        'Alternative',
        'Group',
        'CapturingGroup',
        'Assertion',
        'Character',
        'CharacterClass',
        'CharacterClassRange',
        'CharacterSet',
        'Quantifier',
      ],
    });
  }

  // @Node
  *RegExpLiteral() {
    yield eat(
      t.TokenMatcher('Token', t.StringMatcher('/'), {
        startSpan: 'Expression',
        balanced: '/',
      }),
    );
    yield eat(t.NodeMatcher('Pattern', { path: 'pattern' }));
    yield eat(t.TokenMatcher('Token', t.StringMatcher('/'), { endSpan: 'Expression' }));
    while (yield eatMatch(t.NodeMatcher('Flag', { path: 'flags' })));
  }

  // @Node
  *Flag() {
    yield eat(
      t.TokenMatcher(
        'Token',
        t.RegexMatcher(t.Regex(t.Pattern([t.Alternative(t.Characters('gimsuy'))]), t.Flags('y'))),
        { path: 'value' },
      ),
    );
  }

  // @Node
  *Pattern() {
    yield eat(t.NodeMatcher('Alternatives'));
  }

  *Alternatives() {
    do {
      yield eat(t.NodeMatcher('Alternative', { path: 'alternatives' }));
    } while (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('|'))));
  }

  // @Node
  *Alternative() {
    while (!p.done && !(yield match(t.TokenMatcher('Token', t.StringMatcher('|'))))) {
      yield eat(t.NodeMatcher('Element'));
    }
  }

  *Element() {
    if (yield match(t.StringMatcher('['))) {
      yield eat(t.NodeMatcher('CharacterClass', { path: 'elements' }));
    } else if (yield match(t.StringMatcher('(?:'))) {
      yield eat(t.NodeMatcher('Group', { path: 'elements' }));
    } else if (
      yield match(
        t.TokenMatcher(
          'Token',
          t.RegexMatcher(
            t.Regex(
              t.Pattern([
                t.Alternative([
                  ...t.Characters('(?'),
                  t.Quantifier(0, 1, t.Character('<')),
                  t.CharacterClass(t.Characters('=!')),
                ]),
              ]),
              t.Flags('y'),
            ),
          ),
        ),
      )
    ) {
      throw new Error('Lookeahead and lookbehind are not supported');
    } else if (yield match(t.StringMatcher('('))) {
      yield eat(t.NodeMatcher('CapturingGroup', { path: 'elements' }));
    } else if (
      yield match(
        t.TokenMatcher(
          'Token',
          t.RegexMatcher(
            t.Regex(
              t.Pattern([
                t.Alternative([t.CharacterClass(t.Characters('$^'))]),
                t.Alternative(t.Characters('\\b')),
                t.Alternative([]),
              ]),
              t.Flags('iy'),
            ),
          ),
        ),
      )
    ) {
      yield eat(t.NodeMatcher('Assertion', { path: 'elements' }));
    } else if (
      yield match(
        t.TokenMatcher(
          'Token',
          t.RegexMatcher(
            t.Regex(
              t.Pattern([
                t.Alternative(t.Characters('.')),
                t.Alternative([t.Character('\\'), t.CharacterClass(t.Characters('dswp'))]),
              ]),
              t.Flags('iy'),
            ),
          ),
        ),
      )
    ) {
      yield eat(t.NodeMatcher('CharacterSet', { path: 'elements' }));
    } else {
      yield eat(t.NodeMatcher('Character', { path: 'elements' }));
    }

    if (
      yield match(
        t.TokenMatcher(
          'Token',
          t.RegexMatcher(
            t.Regex(
              t.Pattern([
                t.Alternative(t.CharacterClass(t.Characters('*+?'))),
                t.Alternative([
                  t.Character('{'),
                  t.Quantifier(1, Infinity, t.CharacterSet('digit')),
                  t.Quantifier(0, 1, t.Character(',')),
                  t.Quantifier(0, Infinity, t.CharacterSet('digit')),
                  t.Character('}'),
                ]),
              ]),
              t.Flags('y'),
            ),
          ),
        ),
      )
    ) {
      yield replaceWith(t.NodeMatcher('Quantifier'));
    }
  }

  // @Node
  *Group() {
    yield eat(
      t.TokenMatcher('Token', t.StringMatcher('(?:'), { startSpan: 'Expression', balanced: ')' }),
    );
    yield eat(t.NodeMatcher('Alternatives'));
    yield eat(t.TokenMatcher('Token', ')', { endSpan: 'Expression' }));
  }

  // @Node
  *CapturingGroup() {
    yield eat(
      t.TokenMatcher('Token', t.StringMatcher('('), { startSpan: 'Expression', balanced: ')' }),
    );
    yield eat(t.NodeMatcher('Alternatives'));
    yield eat(t.TokenMatcher('Token', ')', { endSpan: 'Expression' }));
  }

  // @Node
  *Assertion() {
    if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('^')))) {
      return { kind: 'start' };
    } else if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('$')))) {
      return { kind: 'end' };
    } else {
      let m;
      if ((m = yield eatMatch(t.Regex(t.Pattern(t.Characters('\\b')), t.Flags('iy'))))) {
        return { kind: 'word', negate: m[1] === 'B' };
      } else {
        throw new Error('invalid boundary');
      }
    }
  }

  // @Node
  *Character() {}

  // @Node
  *CharacterClass() {
    yield eat('[', { startSpan: 'CharacterClass', balanced: ']' });

    yield replaceSpan({ type: 'CharacterClass:NoNegate', guard: span.guard });

    const negate = !!(yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('^'))));

    const elements = [];
    while (!p.done) {
      elements.push(yield eat(t.NodeMatcher('CharacterClassElement')));
    }

    yield eat(']', { endSpan: span.type });
    return { negate, elements };
  }

  *CharacterClassElement() {
    if (
      yield match(
        t.TokenMatcher(
          'Token',
          t.RegexMatcher(
            t.Regex(
              t.Pattern([
                t.Alternative([
                  t.CharacterSet('any'),
                  t.Character('-', t.CharacterClass([t.Character(']'), t.Character('\n')], true)),
                ]),
              ]),
              t.Flags('y'),
            ),
          ),
        ),
      )
    ) {
      return yield eat(t.NodeMatcher('CharacterClassRange'));
    } else {
      return yield eat(t.NodeMatcher('Character'));
    }
  }

  // @Node
  *CharacterClassRange() {
    const min = yield eat(t.NodeMatcher('Character'));
    yield replaceSpan({ type: 'CharacterClass', guard: span.guard });
    yield eat('-');
    const max = yield eat(t.NodeMatcher('Character'));
    yield replaceSpan({ type: 'CharacterClass:NoRange', guard: span.guard });
    return { min, max };
  }

  // @Node
  *CharacterSet() {
    if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('.')))) {
      return { kind: 'any' };
    }

    yield eat('\\');

    // TODO convert to disambiguate
    if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('d')))) {
      return { kind: 'digit', negate: false };
    } else if (yield eatMatch(t.StringMatcher('D'))) {
      return { kind: 'digit', negate: true };
    } else if (yield eatMatch(t.StringMatcher('s'))) {
      return { kind: 'space', negate: false };
    } else if (yield eatMatch(t.StringMatcher('S'))) {
      return { kind: 'space', negate: true };
    } else if (yield eatMatch(t.StringMatcher('w'))) {
      return { kind: 'word', negate: false };
    } else if (yield eatMatch(t.StringMatcher('W'))) {
      return { kind: 'word', negate: true };
    } else if (
      yield eatMatch(
        t.RegexMatcher(t.Regex(t.Pattern(t.Alternative(t.Characters('p'))), t.Flags('iy'))),
      )
    ) {
      throw new Error('unicode property character sets are not supported yet');
    } else {
      throw new Error('unknown character set kind');
    }
  }

  // @Node
  *Quantifier() {
    let min = -Infinity;
    let max = Infinity;

    if (!p.element) {
      throw new Error('nothing to quantify');
    }

    if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('*')))) {
      min = 0;
    } else if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('+')))) {
      min = 1;
    } else if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('?')))) {
      min = 0;
      max = 1;
    } else {
      yield eat('{');
      min = max = parseInt(
        yield eat(
          t.RegexMatcher(
            t.Regex(
              t.Pattern([t.Alternative([t.Quantifier(1, Infinity, t.CharacterClass('digit'))])]),
            ),
            t.Flags('y'),
          ),
        ),
        10,
      );
      if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher(',')))) {
        let m;
        if (
          (m = yield eatMatch(
            t.RegexMatcher(
              t.Regex(
                t.Pattern([t.Alternative([t.Quantifier(1, Infinity, t.CharacterClass('digit'))])]),
              ),
              t.Flags('y'),
            ),
          ))
        ) {
          max = parseInt(m, 10);
        }
      }
      yield eat('}');
    }

    const greedy = !(yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('?'))));

    return { min, max, greedy, element };
  }
}

export class RegexTokenGrammar {
  *Character() {
    const esc = yield match(t.TokenMatcher('Escape', t.StringMatcher('\\')));

    yield eat(esc ? t.TokenMatcher('EscapeSequence') : t.TokenMatcher('Literal'));
  }

  // @Token
  *Literal({ state }) {
    const { span } = state;

    let regex;

    if (span.type === 'Expression') {
      regex = t.Regex(
        t.Pattern([t.Alternative(t.CharacterClass(t.Characters('*+{}[]().^$|\\\n')))]),
        t.Flags('y'),
      );
    } else if (span.type === 'CharacterClass') {
      regex = t.Regex(t.Pattern([t.Alternative([t.CharacterClass(t.Characters('].\\\n'))])]), [
        t.Flags('y'),
      ]);
    } else if (span.type === 'CharacterClass:NoRange') {
      regex = t.Regex(
        t.Pattern([t.Alternative([t.CharacterClass(t.Characters(']-.\\\n'))])]),
        t.Flags('y'),
      );
    } else if (span.type === 'CharacterClass:NoNegate') {
      regex = t.Regex(
        t.Pattern([t.Alternative([t.CharacterClass(t.Characters(']^.\\\n'))])]),
        t.Flags('y'),
      );
    } else {
      throw new Error('Invalid span');
    }

    yield eat(t.RegexMatcher(regex));
  }

  // @Token
  *Punctuator({ value }) {
    yield eat(value);
  }

  *EscapeSequence() {
    const escapeType = yield eatMatch(
      t.RegexMatcher(t.Regex(t.Alternative([t.CharacterSet(t.Characters('ux'))]), t.Flags('y'))),
    );

    let code;
    if (escapeType === 'x') {
      code = yield eatMatch(
        t.RegexMatcher(
          t.Regex(
            t.Alternative(
              t.Quantifier(
                2,
                2,
                t.CharacterSet([
                  t.CharacterClassRange(t.Character('0'), t.Character('9')),
                  t.CharacterClassRange(t.Character('a'), t.Character('f')),
                ]),
              ),
            ),
            t.Flags('iy'),
          ),
        ),
      );
    } else {
      if (yield eatMatch(t.TokenMatcher('Token', t.StringMatcher('{')))) {
        code = yield eat(
          t.RegexMatcher(
            t.Regex(
              t.Alternative(t.Quantifier(1, 6, t.CharacterSet([t.CharacterSet('digit')]))),
              t.Flags('y'),
            ),
          ),
        );
        yield eat('}');
      } else {
        code = yield eatMatch(
          t.RegexMatcher(
            t.Regex(
              t.Alternative(t.Quantifier(4, 4, t.CharacterSet([t.CharacterSet('digit')]))),
              t.Flags('y'),
            ),
          ),
        );
      }
    }
    if (!code) {
      throw new Error('Invalid escape sequence');
    }
    String.fromCodePoint(parseInt(code, 10));
  }

  // @Token
  *Escape() {
    yield eat('/');
  }

  // @Token
  *EscapeCode({ value }) {
    if (yield guard(t.TokenMatcher('Literal'))) {
      yield eat(
        t.RegexMatcher(
          t.Regex(t.Pattern([t.Alternative([t.CharacterClass('any')])]), t.Flags('sy')),
        ),
      );
    }
  }
}
