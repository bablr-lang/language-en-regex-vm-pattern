import * as t from './builders.js';

export default class RegexTokenGrammar {
  *Character() {
    const esc = yield t.Call('match', t.TokenMatcher('Escape', t.StringMatcher('\\')));

    yield t.Call('eat', esc ? t.TokenMatcher('EscapeSequence') : t.TokenMatcher('Literal'));
  }

  // @Token
  *Literal({ state }) {
    const { span } = state;

    let regex;

    if (span.type === 'Expression') {
      regex = t.Pattern(
        t.Alternatives(t.Elements(t.CharacterClass(t.Characters('*+{}[]().^$|\\\n')))),
        t.Flags('y'),
      );
    } else if (span.type === 'CharacterClass') {
      regex = t.Pattern(
        t.Alternatives(t.Elements(t.CharacterClass(t.Characters('].\\\n')))),
        t.Flags('y'),
      );
    } else if (span.type === 'CharacterClass:NoRange') {
      regex = t.Pattern(
        t.Alternatives(t.Elements(t.CharacterClass(t.Characters(']-.\\\n')))),
        t.Flags('y'),
      );
    } else if (span.type === 'CharacterClass:NoNegate') {
      regex = t.Pattern(
        t.Alternatives(t.Elements(t.CharacterClass(t.Characters(']^.\\\n')))),
        t.Flags('y'),
      );
    } else {
      throw new Error('Invalid span');
    }

    yield t.Call('eat', t.RegexMatcher(regex));
  }

  // @Token
  *Punctuator({ value }) {
    yield t.Call('eat', value);
  }

  *EscapeSequence() {
    const escapeType = yield t.Call(
      'eatMatch',
      t.RegexMatcher(
        t.Pattern(t.Alternatives(t.Elements(t.CharacterSet(t.Characters('ux')))), t.Flags('y')),
      ),
    );

    let code;
    if (escapeType === 'x') {
      code = yield t.Call(
        'eatMatch',
        t.RegexMatcher(
          t.Pattern(
            t.Alternatives(
              t.Elements(
                t.Quantifier(
                  2,
                  2,
                  t.CharacterSet([
                    t.CharacterClassRange(t.Character('0'), t.Character('9')),
                    t.CharacterClassRange(t.Character('a'), t.Character('f')),
                  ]),
                ),
              ),
            ),
            t.Flags('i', 'y'),
          ),
        ),
      );
    } else {
      if (yield t.Call('eatMatch', t.TokenMatcher('Token', t.StringMatcher('{')))) {
        code = yield t.Call(
          'eat',
          t.RegexMatcher(
            t.Pattern(
              t.Alternatives(
                t.Elements(t.Quantifier(1, 6, t.CharacterSet([t.CharacterSet('digit')]))),
              ),
              t.Flags('y'),
            ),
          ),
        );
        yield t.Call('eat', '}');
      } else {
        code = yield t.Call(
          'eatMatch',
          t.RegexMatcher(
            t.Pattern(
              t.Alternatives(
                t.Elements(t.Quantifier(4, 4, t.CharacterSet([t.CharacterSet('digit')]))),
              ),
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
    yield t.Call('eat', '/');
  }

  // @Token
  *EscapeCode() {
    if (yield t.Call('guard', t.TokenMatcher('Literal'))) {
      yield t.Call(
        'eat',
        t.RegexMatcher(
          t.Pattern(t.Alternatives(t.Elements(t.CharacterClass('any'))), t.Flags('s', 'y')),
        ),
      );
    }
  }

  // @Token
  *Flag() {
    yield t.Call(
      'eat',
      t.RegexMatcher(t.Pattern(t.Alternatives(t.Characters('gimsuy')), t.Flags('y'))),
    );
  }
}
