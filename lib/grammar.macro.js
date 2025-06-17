import { re, spam as m } from '@bablr/boot';
import {
  Node,
  CoveredBy,
  InjectFrom,
  UndefinedAttributes,
  AllowEmpty,
  Literal,
} from '@bablr/helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import * as Shared from '@bablr/helpers/productions';
import {
  eat,
  eatMatch,
  match,
  shiftMatch,
  guard,
  defineAttribute,
  fail,
  o,
} from '@bablr/helpers/grammar';
import { buildString, buildBoolean } from '@bablr/helpers/builders';

export const canonicalURL = 'https://bablr.org/languages/core/en/bablr-regex-pattern';

export const dependencies = {};

const escapables = new Map(
  objectEntries({
    n: '\n',
    r: '\r',
    t: '\t',
    0: '\0',
  }),
);

const flagCharacters = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  unicode: 'u',
  sticky: 'y',
};

const unique = (flags) => flags.length === new Set(flags).size;

const getSpecialPattern = (span) => {
  if (span === 'Pattern') {
    return re`/[*+?{}[\]().^$|\n\\<>]/`;
  } else if (span === 'CharacterClass') {
    return re`/[\]\\]/`;
  } else {
    throw new Error('unknown span type for special pattern');
  }
};

export const grammar = class RegexGrammar {
  @Node
  *Pattern() {
    yield eat(m`openToken: <*Punctuator '/' { balanced: '/', balancedSpan: 'Pattern' } />`);
    yield eat(m`<__Alternatives />`);
    yield eat(m`closeToken: <*Punctuator '/' { balancer: true } />`);
    yield eat(m`flags$: <Flags />`);
  }

  @UndefinedAttributes(Object.keys(flagCharacters))
  @AllowEmpty
  @Node
  *Flags({ ctx }) {
    const flags = yield match(re`/[gimsuy]+/`);

    const flagsStr = ctx.sourceTextFor(flags) || '';

    if (flagsStr && !unique(flagsStr)) throw new Error('flags must be unique');

    for (const { 0: name, 1: chr } of Object.entries(flagCharacters)) {
      if (flagsStr.includes(chr)) {
        yield defineAttribute(name, true);
      } else {
        yield defineAttribute(name, false);
      }
    }

    for (const flagChr of flagsStr) {
      yield eat(m`tokens[]: <*Keyword ${buildString(flagChr)} />`);
    }
  }

  @AllowEmpty
  *Alternatives() {
    do {
      yield eat(m`alternatives[]$: <Alternative />`);
    } while (yield eatMatch(m`separatorTokens[]: <*Punctuator '|' />`));
  }

  @AllowEmpty
  @Node
  *Alternative() {
    yield eat(m`elements[]+$: <__Elements />`);
  }

  @AllowEmpty
  *Elements() {
    yield eat(m`.[]: []`);
    while (yield match(re`/[^|]/`)) {
      yield eat(m`.[]+: <_Element />`);
    }
  }

  *Element() {
    yield guard(m`<*Keyword /[*+?]/ />`);

    yield eat(m`<__Any />`, [
      m`<CharacterClass '[' />`,
      m`<Group '(?:' />`,
      m`<__Assertion /[$^]|\\b/i />`,
      m`<Gap '\\g' />`,
      m`<__CharacterSet /\.|\\[dswp]/i />`,
      m`<*Character />`,
    ]);

    if (yield match(re`/[*+?{]/`)) {
      return shiftMatch(m`<Quantifier />`);
    }
  }

  @CoveredBy('Element')
  @Node
  *Group() {
    yield eat(m`openToken: <*Punctuator '(?:' { balanced: ')' } />`);
    yield eat(m`<__Alternatives />`);
    yield eat(m`closeToken: <*Punctuator ')' { balancer: true } />`);
  }

  @Node
  *CapturingGroup() {
    yield eat(m`openToken: <*Punctuator '(' { balanced: ')' } />`);
    yield eat(m`<__Alternatives />`);
    yield eat(m`closeToken: <*Punctuator ')' { balancer: true } />`);
  }

  @CoveredBy('Element')
  *Assertion() {
    yield eat(m`<__Any />`, [
      m`<*StartOfInputAssertion '^' />`,
      m`<*EndOfInputAssertion '$' />`,
      m`<*WordBoundaryAssertion /\\b/i />`,
    ]);
  }

  @CoveredBy('Assertion')
  @Node
  *StartOfInputAssertion() {
    yield eat(m`sigilToken: <*Keyword '^' />`);
  }

  @CoveredBy('Assertion')
  @Node
  *EndOfInputAssertion() {
    yield eatMatch(m`sigilToken: <*Keyword '$' />`);
  }

  @UndefinedAttributes(['negate'])
  @CoveredBy('Assertion')
  @Node
  *WordBoundaryAssertion({ ctx }) {
    yield eatMatch(m`escapeToken: <*Punctuator '\\' />`);
    const m_ = yield eat(m`value: <*Keyword /b/i />`);
    yield defineAttribute('negate', buildBoolean(ctx.sourceTextFor(m_) === 'B'));
  }

  @CoveredBy('Assertion')
  @Node
  *Gap() {
    yield eatMatch(m`escapeToken: <*Punctuator '\\' />`);
    yield eat(m`value: <*Keyword 'g' />`);
  }

  @CoveredBy('Element')
  @CoveredBy('CharacterClassElement')
  @Node
  *Character() {
    if (yield match('\\')) {
      yield eat(m`@: <EscapeSequence />`);
    } else {
      yield eat(re`/[^\r\n\t]/`);
    }
  }

  @UndefinedAttributes(['negate'])
  @CoveredBy('Element')
  @Node
  *CharacterClass() {
    yield eat(m`openToken: <*Punctuator '[' { balancedSpan: 'CharacterClass', balanced: ']' } />`);

    let negate = yield eatMatch(m`negateToken: <*Keyword '^' />`, null, o({ bind: true }));

    yield defineAttribute('negate', !!negate);

    while (yield match(re`/./s`)) {
      yield eat(m`elements[]+$: <_CharacterClassElement />`);
    }

    yield eat(m`closeToken: <*Punctuator ']' { balancer: true } />`);
  }

  *CharacterClassElement() {
    yield eat(m`<__Any />`, [
      m`<__CharacterSet /\\[dswp]/i />`,
      m`<Gap '\\g' />`,
      m`<*Character />`,
    ]);

    if (yield match('-')) {
      return shiftMatch(m`<CharacterClassRange />`);
    }
  }

  @CoveredBy('CharacterClassElement')
  @Node
  *CharacterClassRange() {
    yield eat(m`min+$: <*Character />`);
    yield eat(m`sigilToken: <*Punctuator '-' />`);
    yield eat(m`max+$: <*Character />`);
  }

  @CoveredBy('Element')
  *CharacterSet() {
    yield eat(m`<__Any />`, [
      m`<AnyCharacterSet '.' />`,
      m`<DigitCharacterSet /\\[dD]/  />`,
      m`<SpaceCharacterSet /\\[sS]/  />`,
      m`<WordCharacterSet /\\[wW]/  />`,
    ]);
  }

  @CoveredBy('Element')
  @CoveredBy('CharacterSet')
  @Node
  *AnyCharacterSet() {
    yield eat(m`sigilToken: <*Keyword '.' />`);
  }

  @UndefinedAttributes(['negate'])
  @CoveredBy('Element')
  @CoveredBy('CharacterSet')
  @Node
  *DigitCharacterSet({ ctx }) {
    yield eat(m`escapeToken: <*Punctuator '\\' />`);

    let code = yield eat(m`value: <*Keyword /[dD]/ />`);

    yield defineAttribute('negate', ctx.sourceTextFor(code) === 'D');
  }

  @UndefinedAttributes(['negate'])
  @CoveredBy('Element')
  @CoveredBy('CharacterSet')
  @Node
  *SpaceCharacterSet({ ctx }) {
    yield eat(m`escapeToken: <*Punctuator '\\' />`);

    let code = yield eat(m`value: <*Keyword /[sS]/ />`);

    yield defineAttribute('negate', ctx.sourceTextFor(code) === 'S');
  }

  @UndefinedAttributes(['negate'])
  @CoveredBy('Element')
  @CoveredBy('CharacterSet')
  @Node
  *WordCharacterSet({ ctx }) {
    yield eat(m`escapeToken: <*Punctuator '\\' />`);

    let code = yield eat(m`value: <*Keyword /[wW]/ />`);

    yield defineAttribute('negate', ctx.sourceTextFor(code) === 'W');
  }

  @UndefinedAttributes(['min', 'max'])
  @Node
  *Quantifier({ ctx }) {
    yield eat(m`element+$: <_Element />`);

    let attrs, sigil;

    if ((sigil = yield eatMatch(m`sigilToken: <*Keyword /[*+?]/ />`))) {
      switch (ctx.sourceTextFor(sigil)) {
        case '*':
          attrs = { min: 0, max: Infinity };
          break;
        case '+':
          attrs = { min: 1, max: Infinity };
          break;
        case '?':
          attrs = { min: 0, max: 1 };
          break;
        default:
          yield fail();
      }
    } else if (yield eat(m`openToken: <*Punctuator '{' { balanced: '}' } />`)) {
      let max;
      let min = yield eat(m`min$: <*UnsignedInteger />`);

      if (yield eatMatch(m`separator: <*Punctuator ',' />`)) {
        max = yield eatMatch(m`max$: <*UnsignedInteger />`);
      }

      min = min && ctx.sourceTextFor(min);
      max = max && ctx.sourceTextFor(max);

      min = min && parseInt(min, 10);
      max = max && parseInt(max, 10);

      attrs = { min, max };

      yield eat(m`closeToken: <*Punctuator '}' { balancer: true } />`);
    }

    yield defineAttribute('min', attrs.min);
    yield defineAttribute('max', attrs.max);
  }

  @Node
  *UnsignedInteger() {
    yield eat(re`/\d+/`);
  }

  @Node
  *UnsignedHexInteger() {
    yield eat(re`/[\da-fA-F]+/`);
  }

  @Node
  *EscapeSequence({ state, ctx }) {
    const parentSpan = state.span;

    yield eat(m`escape: <*Punctuator '\\' { openSpan: 'Escape' } />`);

    let m_;
    let cooked;

    if ((m_ = yield match(re`/[\\/nrt0]/`))) {
      const match_ = ctx.sourceTextFor(m_);
      yield eat(m`code: <*Keyword ${buildString(match_)} { closeSpan: 'Escape' } />`);

      cooked = escapables.get(match_) || match_;
    } else if ((m_ = yield match(getSpecialPattern(parentSpan)))) {
      cooked = ctx.sourceTextFor(m_);
      yield eat(m`code: <*Keyword ${buildString(cooked)} { closeSpan: 'Escape' } />`);
    } else if (yield match(re`/[ux]/`)) {
      let code = yield eat(m`code: <EscapeCode { closeSpan: 'Escape' } />`);

      let value = code.get('value');

      cooked = String.fromCodePoint(parseInt(ctx.sourceTextFor(value), 16));
    } else {
      yield fail();
    }

    yield defineAttribute('cooked', cooked);
  }

  @Node
  *EscapeCode() {
    if (yield eatMatch(m`type: <*Keyword 'u' />`)) {
      if (yield eatMatch(m`openToken: <*Punctuator '{' />`)) {
        yield eatMatch(m`value$: <*UnsignedHexInteger />`);
        yield eat(m`closeToken: <*Punctuator '}' />`);
      } else {
        yield eat(m`value$: <*UnsignedHexInteger /[\da-fA-F]{4}/ />`);
        yield eat(m`closeToken: null`);
      }
    } else if (yield eatMatch(m`type: <*Keyword 'x' />`)) {
      yield eat(m`openToken: null`);
      yield eat(m`value$: <*UnsignedHexInteger /[\da-fA-F]{2}/ />`);
      yield eat(m`closeToken: null`);
    }
  }

  *Digits() {
    while (yield eatMatch(m`<*Digit />`));
  }

  @Node
  *Digit() {
    yield eat(re`/\d/`);
  }

  @InjectFrom(Shared)
  *Any() {}

  @Literal
  @Node
  @InjectFrom(Shared)
  *Keyword() {}

  @Literal
  @Node
  @InjectFrom(Shared)
  *Punctuator() {}
};
