import { i, spam } from '@bablr/boot/shorthand.macro';
import { Node, CoveredBy, InjectFrom, Attributes } from '@bablr/helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import when from 'iter-tools-es/methods/when';
import * as Shared from '@bablr/helpers/productions';
import { getCooked } from '@bablr/agast-helpers/stream';

export const name = 'Regex';

export const dependencies = {};

const escapables = new Map(
  objectEntries({
    n: '\n'.codePointAt(0),
    r: '\r'.codePointAt(0),
    t: '\t'.codePointAt(0),
    0: '\0'.codePointAt(0),
  }),
);

export const cookEscape = (escape, span) => {
  let hexMatch;

  if (!escape.startsWith('\\')) {
    throw new Error('regex escape must start with \\');
  }

  if ((hexMatch = /\\x([0-9a-f]{2})/iy.exec(escape))) {
    // continue
  } else if ((hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape))) {
    // continue
  } else if ((hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape))) {
    // continue
  }

  if (hexMatch) {
    return parseInt(hexMatch[1], 16);
  }

  let litMatch = /\\([nrt0])/y.exec(escape);

  if (litMatch) {
    return escapables.get(litMatch[1]);
  }

  let specialMatch = getSpecialPattern(span).exec(escape.slice(1));

  if (specialMatch) {
    return specialMatch[0];
  }

  throw new Error('unable to cook escape');
};

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
  const { type } = span;
  if (type === 'Bare') {
    return /[*+{}[\]()\.^$|\\\n]/y;
  } else if (type === 'CharacterClass') {
    return /[\]\\\.]/y;
  } else if (type === 'CharacterClass:First') {
    return /[\]^\\\.]/y;
  } else if (type === 'Quantifier') {
    return /[{}]/;
  } else {
    throw new Error();
  }
};

export const grammar = class RegexGrammar {
  @Node
  *Pattern() {
    yield i`eat(<* Punctuator '/' balanced='/'> 'open')`;
    yield i`eat(<Alternatives> 'alternatives[]')`;
    yield i`eat(<* Punctuator '/' balancer> 'close')`;
    yield i`eat(<Flags> 'flags')`;
  }

  *Flags() {
    const flags = yield i`match(/[gimsuy]+/)` || '';

    if (!unique(flags)) throw new Error('flags must be unique');

    for (const _ of flags) {
      yield i`eat(<Flag>)`;
    }
  }

  @Node
  *Flag() {
    const flag = yield i`eatMatch(<* Keyword /[gimsuy]/> 'value')`;

    return { kind: flagsReverse[flag] };
  }

  *Alternatives() {
    do {
      yield i`eat(<Alternative>)`;
    } while (yield i`eatMatch(<* Punctuator '|'> 'separators')`);
  }

  @Node
  *Alternative() {
    yield i`eat(<Elements> 'elements')`;
  }

  *Elements() {
    while (yield i`match(/[^|]/)`) {
      yield i`eat(<Element>)`;
    }
  }

  *Element() {
    yield i`eat(<Match> null [
        (<CharacterClass> '[')
        (<Group> '(?:')
        (<Assertion> /[$^]|\\b|/i)
        (<CharacterSet> /\.|\\[dswp]/i)
        (<Character>)
      ])`;

    return i`shiftMatch(<Quantifier>)`;
  }

  @Node
  *Group() {
    yield i`eat(<* Punctuator '(?:' balanced=')'> 'open')`;
    yield i`eat(<Alternatives> 'alternatives[]')`;
    yield i`eat(<* Punctuator ')' balancer> 'close')`;
  }

  @Node
  *CapturingGroup() {
    yield i`eat(<* Punctuator '(' balanced=')'> 'open')`;
    yield i`eat(<Alternatives> 'alternatives[]')`;
    yield i`eat(<* Punctuator ')' balancer> 'close')`;
  }

  *Assertion() {
    yield i`eat(<Match> null [
      (<* StartOfInputAssertion> '^')
      (<* EndOfInputAssertion> '$')
      (<*@ WordBoundaryAssertion> /\\b/i)
    ])`;
  }

  @CoveredBy('Assertion')
  @Node
  *StartOfInputAssertion() {
    yield i`eat(<* Keyword '^'> 'value')`;
  }

  @CoveredBy('Assertion')
  @Node
  *EndOfInputAssertion() {
    yield i`eatMatch(<* Keyword '$'> 'value')`;
  }

  @Attributes('negate')
  @CoveredBy('Assertion')
  @Node
  *WordBoundaryAssertion(props, s, ctx) {
    yield i`eatMatch(<* Punctuator '\\'> 'escape')`;
    const m = yield i`eat(<* Keyword /b/i> 'value')`;
    yield i`bindAttribute('negate' ${ctx.getCooked(m) === 'B'})`;
  }

  @Node
  @CoveredBy('CharacterClassElement')
  *Character({ span }) {
    const specialPattern = getSpecialPattern(span);

    if (
      yield i`eatMatchEscape(
        /\\(u(\{\d{1,6}\}|\d{4})|x[0-9a-fA-F]{2}|[nrt0]|${specialPattern.source})/
      )`
    ) {
      // done
    } else if (yield i`match(${specialPattern})`) {
      throw new Error('invalid character');
    } else {
      yield i`eat(/./s)`;
    }
  }

  @Node
  *CharacterClass() {
    yield i`eat(<* Punctuator '[' startSpan='CharacterClass' balanced=']'> 'open')`;

    let first = !(yield i`eatMatch(<* Keyword '^'> 'negate')`);

    while (yield i`match(/./s)`) {
      yield i`eat(<CharacterClassElement> 'elements[]' {${when(first, [
        i.Property`first: true`,
      ])}})`;
      first = false;
    }

    yield i`eat(<* Punctuator ']' endSpan='CharacterClass' balancer> 'close')`;
  }

  *CharacterClassElement({ props: { first } }) {
    yield i`eat(<Any> null [
        (<CharacterClassRange> /.-[^\]\n]/ { first: ${first} })
        (<CharacterSet> /\.|\\[dswp]/i)
        (<Character ${when(first, spam.Attribute`span='CharacterClass:First'`)}>)
      ])`;
  }

  @Node
  @CoveredBy('CharacterClassElement')
  *CharacterClassRange({ props: { first = false } }) {
    yield i`eat(<Character ${when(first, spam.Attribute`span='CharacterClass:First'`)}> 'min')`;
    yield i`eat(<* Punctuator '-'> 'rangeOperator')`;
    yield i`eat(<Character> 'max')`;
  }

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
    yield i`eat(<* Keyword '.'> 'value')`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *DigitCharacterSet() {
    yield i`eat(<* Punctuator '\\'> 'escape')`;

    let code = yield i`eat(<* Keyword /[dD]/> 'value')`;

    yield i`bindAttribute('negate' ${getCooked(code) === 'D'})`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *SpaceCharacterSet() {
    yield i`eat(<* Punctuator '\\'> 'escape')`;

    let code = yield i`eat(<* Keyword /[sS]/> 'value')`;

    yield i`bindAttribute('negate' ${getCooked(code) === 'S'})`;
  }

  @CoveredBy('CharacterSet')
  @Node
  *WordCharacterSet() {
    yield i`eat(<* Punctuator '\\'> 'escape')`;

    let code = yield i`eat(<* Keyword /[wW]/> 'value')`;

    yield i`bindAttribute('negate' ${getCooked(code) === 'W'})`;
  }

  @Node
  *Quantifier() {
    yield i`eatHeld(<Element> 'element')`;

    let attrs;

    if (yield i`eatMatch(<* Keyword '*'> 'value')`) {
      attrs = { min: 0, max: Infinity };
    } else if (yield i`eatMatch(<* Keyword '+'> 'value')`) {
      attrs = { min: 1, max: Infinity };
    } else if (yield i`eatMatch(<* Keyword '?'> 'value')`) {
      attrs = { min: 0, max: 1 };
    } else if (yield i`eat(<* Punctuator '{' balanced='}'> 'open')`) {
      let max;
      let min = yield i`eat(<Number> 'min')`;

      if (yield i`eatMatch(<* Punctuator ','> 'separator')`) {
        max = yield i`eatMatch(<Number> 'max')`;
      }

      attrs = { min, max };

      yield i`eat(<* Punctuator '}' balancer> 'close')`;
    }

    return { attrs };
  }

  @Node
  *Number() {
    yield i`eat(/\d+/)`;
  }

  @InjectFrom(Shared)
  *Match() {}

  @InjectFrom(Shared)
  *Keyword() {}

  @InjectFrom(Shared)
  *Punctuator() {}
};
