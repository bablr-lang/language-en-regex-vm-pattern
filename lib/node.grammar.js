import { buildCovers } from '@bablr/grammar';
import * as t from './builders.js';

const node = Symbol.for('@bablr/node');

export default class RegexNodeGrammar {
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
    yield t.Eat(
      t.TokenMatcher('Token', t.StringMatcher('/'), {
        startSpan: 'Expression',
        balanced: '/',
      }),
    );
    yield t.Eat(t.NodeMatcher('Pattern', { path: 'pattern' }));
    yield t.Eat(t.TokenMatcher('Token', t.StringMatcher('/'), { endSpan: 'Expression' }));
    while (yield t.EatMatch(t.NodeMatcher('Flag', { path: 'flags' })));
  }

  // @Node
  *Flag() {
    yield t.Eat(t.TokenMatcher('Flag'));
  }

  // @Node
  *Pattern() {
    yield t.Eat(t.NodeMatcher('Alternatives'));
  }

  *Alternatives() {
    do {
      yield t.Eat(t.NodeMatcher('Alternative', { path: 'alternatives' }));
    } while (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('|'))));
  }

  // @Node
  *Alternative() {
    while (!p.done && !(yield t.Match(t.TokenMatcher('Token', t.StringMatcher('|'))))) {
      yield t.Eat(t.NodeMatcher('Element'));
    }
  }

  *Element() {
    if (yield t.Match(t.StringMatcher('['))) {
      yield t.Eat(t.NodeMatcher('CharacterClass', { path: 'elements' }));
    } else if (yield t.Match(t.StringMatcher('(?:'))) {
      yield t.Eat(t.NodeMatcher('Group', { path: 'elements' }));
    } else if (
      yield t.Match(
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
      )
    ) {
      throw new Error('Lookahead and lookbehind are not supported');
    } else if (yield t.Match(t.StringMatcher('('))) {
      yield t.Eat(t.NodeMatcher('CapturingGroup', { path: 'elements' }));
    } else if (
      yield t.Match(
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
      )
    ) {
      yield t.Eat(t.NodeMatcher('Assertion', { path: 'elements' }));
    } else if (
      yield t.Match(
        t.RegexMatcher(
          t.Regex(
            t.Pattern([
              t.Alternative(t.Characters('.')),
              t.Alternative([t.Character('\\'), t.CharacterClass(t.Characters('dswp'))]),
            ]),
            t.Flags('iy'),
          ),
        ),
      )
    ) {
      yield t.Eat(t.NodeMatcher('CharacterSet', { path: 'elements' }));
    } else {
      yield t.Eat(t.NodeMatcher('Character', { path: 'elements' }));
    }

    if (
      yield t.Match(
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
      )
    ) {
      yield hold();
      yield stackHeld(t.NodeMatcher('Quantifier'));
    }
  }

  // @Node
  *Group() {
    yield t.Eat(
      t.TokenMatcher('Token', t.StringMatcher('(?:'), { startSpan: 'Expression', balanced: ')' }),
    );
    yield t.Eat(t.NodeMatcher('Alternatives'));
    yield t.Eat(t.TokenMatcher('Token', ')', { endSpan: 'Expression' }));
  }

  // @Node
  *CapturingGroup() {
    yield t.Eat(
      t.TokenMatcher('Token', t.StringMatcher('('), { startSpan: 'Expression', balanced: ')' }),
    );
    yield t.Eat(t.NodeMatcher('Alternatives'));
    yield t.Eat(t.TokenMatcher('Token', ')', { endSpan: 'Expression' }));
  }

  // @Node
  *Assertion() {
    if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('^')))) {
      return { kind: 'start' };
    } else if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('$')))) {
      return { kind: 'end' };
    } else {
      let m;
      if ((m = yield t.EatMatch(t.Regex(t.Pattern(t.Characters('\\b')), t.Flags('iy'))))) {
        return { kind: 'word', negate: m[1] === 'B' };
      } else {
        throw new Error('invalid boundary');
      }
    }
  }

  // @Node
  *Character() {
    yield t.Eat(t.TokenMatcher('Character'));
  }

  // @Node
  *CharacterClass() {
    yield t.Eat('[', { startSpan: 'CharacterClass', balanced: ']' });

    yield replaceSpan({ type: 'CharacterClass:NoNegate', guard: span.guard });

    const negate = !!(yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('^'))));

    const elements = [];
    while (!p.done) {
      elements.push(yield t.Eat(t.NodeMatcher('CharacterClassElement')));
    }

    yield t.Eat(']', { endSpan: span.type });
    return { negate, elements };
  }

  *CharacterClassElement() {
    if (
      yield t.Match(
        t.RegexMatcher(
          t.Regex(
            t.Pattern([
              t.Alternative([
                t.CharacterSet('any'),
                t.Character('-', t.CharacterClass(t.Characters(']\n'), true)),
              ]),
            ]),
            t.Flags('y'),
          ),
        ),
      )
    ) {
      return yield t.Eat(t.NodeMatcher('CharacterClassRange'));
    } else {
      return yield t.Eat(t.NodeMatcher('Character'));
    }
  }

  // @Node
  *CharacterClassRange() {
    const min = yield t.Eat(t.NodeMatcher('Character'));
    yield replaceSpan({ type: 'CharacterClass', guard: span.guard });
    yield t.Eat('-');
    const max = yield t.Eat(t.NodeMatcher('Character'));
    yield replaceSpan({ type: 'CharacterClass:NoRange', guard: span.guard });
    return { min, max };
  }

  // @Node
  *CharacterSet() {
    if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('.')))) {
      return { kind: 'any' };
    }

    yield t.Eat('\\');

    // TODO convert to disambiguate
    if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('d')))) {
      return { kind: 'digit', negate: false };
    } else if (yield t.EatMatch(t.StringMatcher('D'))) {
      return { kind: 'digit', negate: true };
    } else if (yield t.EatMatch(t.StringMatcher('s'))) {
      return { kind: 'space', negate: false };
    } else if (yield t.EatMatch(t.StringMatcher('S'))) {
      return { kind: 'space', negate: true };
    } else if (yield t.EatMatch(t.StringMatcher('w'))) {
      return { kind: 'word', negate: false };
    } else if (yield t.EatMatch(t.StringMatcher('W'))) {
      return { kind: 'word', negate: true };
    } else if (
      yield t.EatMatch(
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

    if (!somethingIsHeld) {
      throw new Error('nothing to quantify');
    }

    if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('*')))) {
      min = 0;
    } else if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('+')))) {
      min = 1;
    } else if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('?')))) {
      min = 0;
      max = 1;
    } else {
      yield t.Eat('{');
      min = max = parseInt(
        yield t.Eat(
          t.RegexMatcher(
            t.Regex(
              t.Pattern([t.Alternative([t.Quantifier(1, Infinity, t.CharacterClass('digit'))])]),
            ),
            t.Flags('y'),
          ),
        ),
        10,
      );
      if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher(',')))) {
        let m;
        if (
          (m = yield t.EatMatch(
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
      yield t.Eat('}');
    }

    const greedy = !(yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('?'))));

    return { min, max, greedy };
  }
}
