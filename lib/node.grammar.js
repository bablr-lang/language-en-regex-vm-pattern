import { buildCovers } from '@bablr/grammar';
import * as t from './builders.js';

const node = Symbol.for('@bablr/node');

export default class RegexNodeGrammar {
  constructor() {
    this.covers = buildCovers({
      [node]: [
        'Pattern',
        'Flag',
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
  *Pattern() {
    yield t.Call(
      'eat',
      t.TokenMatcher('Token', t.StringMatcher('/'), {
        startSpan: 'Expression',
        balanced: '/',
      }),
    );
    yield t.Call('eat', t.NodeMatcher('Alternatives'));
    yield t.Call('eat', t.TokenMatcher('Token', t.StringMatcher('/'), { endSpan: 'Expression' }));
    while (yield t.Call('eatMatch', t.NodeMatcher('Flag', { path: 'flags' })));
  }

  // @Node
  *Flag() {
    yield t.Call('eat', t.TokenMatcher('Flag'));
  }

  *Alternatives() {
    do {
      yield t.Call('eat', t.NodeMatcher('Alternative', { path: 'alternatives' }));
    } while (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('|'))));
  }

  // @Node
  *Alternative() {
    while (!p.done && !(yield t.Call('match', t.TokenMatcher('Token', t.StringMatcher('|'))))) {
      yield t.Call('eat', t.NodeMatcher('Element'));
    }
  }

  *Element() {
    if (yield t.Call('match', t.StringMatcher('['))) {
      yield t.Call('eat', t.NodeMatcher('CharacterClass', { path: 'elements' }));
    } else if (yield t.Call('match', t.StringMatcher('(?:'))) {
      yield t.Call('eat', t.NodeMatcher('Group', { path: 'elements' }));
    } else if (
      yield t.Call(
        'match',
        t.RegexMatcher(
          t.Pattern(
            t.Alternatives(
              t.Elements(
                ...t.Characters('(?'),
                t.Quantifier(0, 1, t.Character('<')),
                t.CharacterClass(t.Characters('=!')),
              ),
            ),
            t.Flags('y'),
          ),
        ),
      )
    ) {
      throw new Error('Lookahead and lookbehind are not supported');
    } else if (yield t.Call('match', t.StringMatcher('('))) {
      yield t.Call('eat', t.NodeMatcher('CapturingGroup', { path: 'elements' }));
    } else if (
      yield t.Call(
        'match',
        t.RegexMatcher(
          t.Pattern(
            t.Alternatives(
              t.Elements([t.CharacterClass(t.Characters('$^'))], t.Characters('\\b'), []),
            ),
            t.Flags('i', 'y'),
          ),
        ),
      )
    ) {
      yield t.Call('eat', t.NodeMatcher('Assertion', { path: 'elements' }));
    } else if (
      yield t.Call(
        'match',
        t.RegexMatcher(
          t.Pattern(
            t.Alternatives(t.Characters('.'), [
              t.Character('\\'),
              t.CharacterClass(t.Characters('dswp')),
            ]),
            t.Flags('i', 'y'),
          ),
        ),
      )
    ) {
      yield t.Call('eat', t.NodeMatcher('CharacterSet', { path: 'elements' }));
    } else {
      yield t.Call('eat', t.NodeMatcher('Character', { path: 'elements' }));
    }

    if (
      yield t.Call(
        'match',
        t.RegexMatcher(
          t.Pattern(
            t.Alternatives(t.CharacterClass(t.Characters('*+?')), [
              t.Character('{'),
              t.Quantifier(1, Infinity, t.CharacterSet('digit')),
              t.Quantifier(0, 1, t.Character(',')),
              t.Quantifier(0, Infinity, t.CharacterSet('digit')),
              t.Character('}'),
            ]),
            t.Flags('y'),
          ),
        ),
      )
    ) {
      yield hold();
      yield stackHeld(t.NodeMatcher('Quantifier'));
    }
  }

  // @Node
  *Group() {
    yield t.Call(
      'eat',
      t.TokenMatcher('Token', t.StringMatcher('(?:'), { startSpan: 'Expression', balanced: ')' }),
    );
    yield t.Call('eat', t.NodeMatcher('Alternatives'));
    yield t.Call('eat', t.TokenMatcher('Token', ')', { endSpan: 'Expression' }));
  }

  // @Node
  *CapturingGroup() {
    yield t.Call(
      'eat',
      t.TokenMatcher('Token', t.StringMatcher('('), { startSpan: 'Expression', balanced: ')' }),
    );
    yield t.Call('eat', t.NodeMatcher('Alternatives'));
    yield t.Call('eat', t.TokenMatcher('Token', ')', { endSpan: 'Expression' }));
  }

  // @Node
  *Assertion() {
    if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('^')))) {
      return { kind: 'start' };
    } else if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('$')))) {
      return { kind: 'end' };
    } else {
      let m;
      if (
        (m = yield t.Call(
          'eatMatch',
          t.Pattern(t.Alternatives(t.Characters('\\b')), t.Flags('i', 'y')),
        ))
      ) {
        return { kind: 'word', negate: m[1] === 'B' };
      } else {
        throw new Error('invalid boundary');
      }
    }
  }

  // @Node
  *Character() {
    yield t.Call('eat', t.TokenMatcher('Character'));
  }

  // @Node
  *CharacterClass() {
    yield t.Call('eat', '[', { startSpan: 'CharacterClass', balanced: ']' });

    yield replaceSpan({ type: 'CharacterClass:NoNegate', guard: span.guard });

    const negate = !!(yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('^'))));

    const elements = [];
    while (!p.done) {
      elements.push(yield t.Call('eat', t.NodeMatcher('CharacterClassElement')));
    }

    yield t.Call('eat', ']', { endSpan: span.type });
    return { negate, elements };
  }

  *CharacterClassElement() {
    if (
      yield t.Call(
        'match',
        t.RegexMatcher(
          t.Pattern(
            t.Alternatives(
              t.Elements(
                t.CharacterSet('any'),
                t.Character('-', t.CharacterClass(t.Characters(']\n'), true)),
              ),
            ),
            t.Flags('y'),
          ),
        ),
      )
    ) {
      return yield t.Call('eat', t.NodeMatcher('CharacterClassRange'));
    } else {
      return yield t.Call('eat', t.NodeMatcher('Character'));
    }
  }

  // @Node
  *CharacterClassRange() {
    const min = yield t.Call('eat', t.NodeMatcher('Character'));
    yield replaceSpan({ type: 'CharacterClass', guard: span.guard });
    yield t.Call('eat', '-');
    const max = yield t.Call('eat', t.NodeMatcher('Character'));
    yield replaceSpan({ type: 'CharacterClass:NoRange', guard: span.guard });
    return { min, max };
  }

  // @Node
  *CharacterSet() {
    if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('.')))) {
      return { kind: 'any' };
    }

    yield t.Call('eat', '\\');

    // TODO convert to disambiguate
    if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('d')))) {
      return { kind: 'digit', negate: false };
    } else if (yield t.Call('eatMatch', t.StringMatcher('D'))) {
      return { kind: 'digit', negate: true };
    } else if (yield t.Call('eatMatch', t.StringMatcher('s'))) {
      return { kind: 'space', negate: false };
    } else if (yield t.Call('eatMatch', t.StringMatcher('S'))) {
      return { kind: 'space', negate: true };
    } else if (yield t.Call('eatMatch', t.StringMatcher('w'))) {
      return { kind: 'word', negate: false };
    } else if (yield t.Call('eatMatch', t.StringMatcher('W'))) {
      return { kind: 'word', negate: true };
    } else if (
      yield t.Call(
        'eatMatch',
        t.RegexMatcher(t.Pattern(t.Alternatives(t.Characters('p')), t.Flags('i', 'y'))),
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

    if (!somethingIsHeld) {
      throw new Error('nothing to quantify');
    }

    if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('*')))) {
      min = 0;
    } else if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('+')))) {
      min = 1;
    } else if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('?')))) {
      min = 0;
      max = 1;
    } else {
      yield t.Call('eat', '{');
      min = max = parseInt(
        yield t.Call(
          'eat',
          t.RegexMatcher(
            t.Pattern(
              t.Alternatives(t.Elements(t.Quantifier(1, Infinity, t.CharacterClass('digit')))),
              t.Flags('y'),
            ),
          ),
        ),
        10,
      );
      if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher(',')))) {
        let m;
        if (
          (m = yield t.Call(
            'eatMatch',
            t.RegexMatcher(
              t.Pattern(
                t.Alternatives(t.Elements(t.Quantifier(1, Infinity, t.CharacterClass('digit')))),
                t.Flags('y'),
              ),
            ),
          ))
        ) {
          max = parseInt(m, 10);
        }
      }
      yield t.Call('eat', '}');
    }

    const greedy = !(yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('?'))));

    return { min, max, greedy };
  }
}
