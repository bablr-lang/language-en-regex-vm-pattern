import { i, spam, re } from '@bablr/boot/shorthand.macro';
import { Node, CoveredBy, InjectFrom, Attributes, Holdable } from '@bablr/helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import when from 'iter-tools-es/methods/when';
import * as Shared from '@bablr/helpers/productions';
import { getCooked } from '@bablr/agast-helpers/stream';
import { buildString } from '@bablr/agast-vm-helpers';

export const name = 'Regex';

export const canonicalURL = 'https://github.com/bablr-lang/language-regex-vm-pattern';

export const dependencies = {};

const escapables = new Map(
  objectEntries({
    n: '\n'.codePointAt(0),
    r: '\r'.codePointAt(0),
    t: '\t'.codePointAt(0),
    0: '\0'.codePointAt(0),
  }),
);

const flags = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  unicode: 'u',
  sticky: 'y',
};
const flagsReverse = Object.fromEntries(Object.entries(flags).map(([key, value]) => [value, key]));

const unique = (flags) => flags.length === new Set(flags).size;

const getSpecialPattern = (span) => {
  if (span === 'Pattern') {
    return re`/[*+{}[\]()\.^$|\n\\]/`;
  } else if (span === 'CharacterClass') {
    return re`/[\]\.\\]/`;
  } else if (span === 'CharacterClass:First') {
    return re`/[\]^\.\\]/`;
  } else if (span === 'Quantifier') {
    return re`/[{}]/`;
  } else {
    throw new Error();
  }
};

export const grammar = class RegexGrammar {
  @Node
  *Pattern() {
    yield i`eat(<*Punctuator '/' balanced='/' lexicalSpan='Pattern'> 'open')`;
    yield i`eat(<Alternatives>)`;
    yield i`eat(<*Punctuator '/' balancer> 'close')`;
    yield i`eatMatch(<Flags> 'flags')`;
  }

  @Node
  *Flags() {
    const flags = yield i`match(/[gimsuy]+/)` || '';

    if (flags) {
      if (!unique(flags)) throw new Error('flags must be unique');

      for (const _ of flags) {
        yield i`eat(<Flag>)`;
      }
    }
  }

  @Node
  *Flag() {
    const flag = yield i`eatMatch(<*Keyword /[gimsuy]/> 'value')`;

    return { kind: flagsReverse[flag] };
  }

  *Alternatives() {
    do {
      yield i`eat(<Alternative> 'alternatives[]')`;
    } while (yield i`eatMatch(<*Punctuator '|'> 'separators')`);
  }

  @Node
  *Alternative() {
    yield i`eat(<Elements>)`;
  }

  *Elements() {
    while (yield i`match(/[^|]/)`) {
      yield i`eat(<Element>  'elements[]')`;
    }
  }

  @Holdable
  *Element() {
    yield i`eat(<Match> null [
        (<CharacterClass> '[')
        (<Group> '(?:')
        (<Assertion> /[$^]|\\b|/i)
        (<CharacterSet> /\.|\\[dswp]/i)
        (<*Character> /./s)
      ])`;

    return i`holdForMatch(<Quantifier>)`;
  }

  @CoveredBy('Element')
  @Node
  *Group() {
    yield i`eat(<*Punctuator '(?:' balanced=')'> 'open')`;
    yield i`eat(<Alternatives>)`;
    yield i`eat(<*Punctuator ')' balancer> 'close')`;
  }

  @Node
  *CapturingGroup() {
    yield i`eat(<*Punctuator '(' balanced=')'> 'open')`;
    yield i`eat(<Alternatives>)`;
    yield i`eat(<*Punctuator ')' balancer> 'close')`;
  }

  @CoveredBy('Element')
  *Assertion() {
    yield i`eat(<Match> null [
      (<*StartOfInputAssertion> '^')
      (<*EndOfInputAssertion> '$')
      (<*@ WordBoundaryAssertion> /\\b/i)
    ])`;
  }

  @CoveredBy('Assertion')
  @Node
  *StartOfInputAssertion() {
    yield i`eat(<*Keyword '^'> 'value')`;
  }

  @CoveredBy('Assertion')
  @Node
  *EndOfInputAssertion() {
    yield i`eatMatch(<*Keyword '$'> 'value')`;
  }

  @Attributes('negate')
  @CoveredBy('Assertion')
  @Node
  *WordBoundaryAssertion(props, s, ctx) {
    yield i`eatMatch(<*Punctuator '\\'> 'escape')`;
    const m = yield i`eat(<*Keyword /b/i> 'value')`;
    yield i`bindAttribute('negate' ${ctx.getCooked(m) === 'B'})`;
  }

  @CoveredBy('Element')
  @CoveredBy('CharacterClassElement')
  @Node
  *Character(props, { span }) {
    const specialPattern = getSpecialPattern(span);

    if (yield i`match('\\')`) {
      yield i`eat(<@Escape>)`;
    } else if (yield i`match(${specialPattern})`) {
      throw new Error('invalid character');
    } else {
      yield i`eat(/./s)`;
    }
  }

  @CoveredBy('Element')
  @Node
  *CharacterClass() {
    yield i`eat(<*Punctuator '[' startSpan='CharacterClass' balanced=']'> 'open')`;

    let first = !(yield i`eatMatch(<*Keyword '^'> 'negate')`);

    while (yield i`match(/./s)`) {
      yield i`eat(<CharacterClassElement> 'elements[]' {${when(first, [
        i.Property`first: true`,
      ])}})`;
      first = false;
    }

    yield i`eat(<*Punctuator ']' endSpan='CharacterClass' balancer> 'close')`;
  }

  *CharacterClassElement({ props: { first } }) {
    yield i`eat(<Match> null [
        (<CharacterClassRange> /.-[^\]\n]/ { first: ${first} })
        (<CharacterSet> /\.|\\[dswp]/i)
        (<*Character ${when(first, spam.Attribute`span='CharacterClass:First'`)}>)
      ])`;
  }

  @CoveredBy('CharacterClassElement')
  @Node
  *CharacterClassRange({ props: { first = false } }) {
    yield i`eat(<*Character ${when(first, spam.Attribute`span='CharacterClass:First'`)}> 'min')`;
    yield i`eat(<*Punctuator '-'> 'rangeOperator')`;
    yield i`eat(<*Character> 'max')`;
  }

  @CoveredBy('Element')
  *CharacterSet() {
    yield i`eat(<Match> null [
      (<AnyCharacterSet> '.')
      (<DigitCharacterSet> /\\[dD]/)
      (<SpaceCharacterSet> /\\[sS]/)
      (<WordCharacterSet> /\\[wW]/)
    ])`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *AnyCharacterSet() {
    yield i`eat(<*Keyword '.'> 'value')`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *DigitCharacterSet() {
    yield i`eat(<*Punctuator '\\'> 'escape')`;

    let code = yield i`eat(<*Keyword /[dD]/> 'value')`;

    yield i`bindAttribute('negate' ${getCooked(code) === 'D'})`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *SpaceCharacterSet() {
    yield i`eat(<*Punctuator '\\'> 'escape')`;

    let code = yield i`eat(<*Keyword /[sS]/> 'value')`;

    yield i`bindAttribute('negate' ${getCooked(code) === 'S'})`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *WordCharacterSet() {
    yield i`eat(<*Punctuator '\\'> 'escape')`;

    let code = yield i`eat(<*Keyword /[wW]/> 'value')`;

    yield i`bindAttribute('negate' ${getCooked(code) === 'W'})`;
  }

  @Node
  *Quantifier() {
    yield i`eatHeld(<Element> 'element')`;

    let attrs;

    if (yield i`eatMatch(<*Keyword '*'> 'value')`) {
      attrs = { min: 0, max: Infinity };
    } else if (yield i`eatMatch(<*Keyword '+'> 'value')`) {
      attrs = { min: 1, max: Infinity };
    } else if (yield i`eatMatch(<*Keyword '?'> 'value')`) {
      attrs = { min: 0, max: 1 };
    } else if (yield i`eat(<*Punctuator '{' balanced='}'> 'open')`) {
      let max;
      let min = yield i`eat(<Number> 'min')`;

      if (yield i`eatMatch(<*Punctuator ','> 'separator')`) {
        max = yield i`eatMatch(<Number> 'max')`;
      }

      attrs = { min, max };

      yield i`eat(<*Punctuator '}' balancer> 'close')`;
    }

    return { attrs };
  }

  @Node
  *Number() {
    yield i`eat(/\d+/)`;
  }

  @Node
  *EscapeSequence(props, { span }, ctx) {
    yield i`eat(<*Punctuator '\\'> 'escape')`;

    let match, cooked;

    if ((match = yield i`match(/[\\/nrt0]/)`)) {
      yield i`eat(<*Keyword> ${match.value} 'value')`;
      cooked = escapables.get(match.value);

      yield i`bindAttribute(cooked ${buildString(cooked)})`;
    } else if ((match = yield i`match(/${getSpecialPattern(span).source}/)`)) {
      cooked = match.value;
    } else if (yield i`match(/[ux]/)`) {
      const codeNode = yield i`eat(<EscapeCode> 'value')`;
      cooked = parseInt(ctx.unbox(ctx.getProperty(codeNode, 'value')), 16);
    } else {
      yield i`fail()`;
    }

    yield i`bindAttribute(cooked ${buildString(cooked)})`;
  }

  @Node
  *EscapeCode() {
    if (yield i`eatMatch(<*Keyword 'u'> 'type')`) {
      if (yield i`eatMatch(<*Punctuator '{'> 'open')`) {
        yield i`eatMatch(<Digits> 'value')`;
        yield i`eatMatch(<*Punctuator '}'> 'close')`;
      } else if (yield i`match(/\d{4}/)`) {
        yield i`eatMatch(null 'open')`;
        yield i`eat(<Digits> 'value')`;
        yield i`eatMatch(null 'close')`;
      }
    } else if (yield i`eatMatch(<*Keyword 'x'>)`) {
      if (yield i`match(/\d{2}/)`) {
        yield i`eatMatch(null 'open')`;
        yield i`eat(<Digits> 'value')`;
        yield i`eatMatch(null 'close')`;
      }
    }
  }

  @InjectFrom(Shared)
  *Match() {}

  @Node
  @InjectFrom(Shared)
  *Keyword() {}

  @Node
  @InjectFrom(Shared)
  *Punctuator() {}
};
