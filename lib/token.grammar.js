import * as t from './builders.js';

export default class RegexTokenGrammar {
  *Character() {
    const esc = yield t.Match(t.TokenMatcher('Escape', t.StringMatcher('\\')));

    yield t.Eat(esc ? t.TokenMatcher('EscapeSequence') : t.TokenMatcher('Literal'));
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

    yield t.Eat(t.RegexMatcher(regex));
  }

  // @Token
  *Punctuator({ value }) {
    yield t.Eat(value);
  }

  *EscapeSequence() {
    const escapeType = yield t.EatMatch(
      t.RegexMatcher(t.Regex(t.Alternative([t.CharacterSet(t.Characters('ux'))]), t.Flags('y'))),
    );

    let code;
    if (escapeType === 'x') {
      code = yield t.EatMatch(
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
      if (yield t.EatMatch(t.TokenMatcher('Token', t.StringMatcher('{')))) {
        code = yield t.Eat(
          t.RegexMatcher(
            t.Regex(
              t.Alternative(t.Quantifier(1, 6, t.CharacterSet([t.CharacterSet('digit')]))),
              t.Flags('y'),
            ),
          ),
        );
        yield t.Eat('}');
      } else {
        code = yield t.EatMatch(
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
    yield t.Eat('/');
  }

  // @Token
  *EscapeCode() {
    if (yield t.Guard(t.TokenMatcher('Literal'))) {
      yield t.Eat(
        t.RegexMatcher(
          t.Regex(t.Pattern([t.Alternative([t.CharacterClass('any')])]), t.Flags('sy')),
        ),
      );
    }
  }

  // @Token
  *Flag() {
    yield t.Eat(
      t.RegexMatcher(t.Regex(t.Pattern([t.Alternative(t.Characters('gimsuy'))]), t.Flags('y'))),
    );
  }
}
