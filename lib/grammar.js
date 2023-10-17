import { i, spam } from '@bablr/boot/shorthand.macro';
import { Node, Cover, CoveredBy } from '@bablr/boot-helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import when from 'iter-tools-es/methods/when';

export const name = 'Regex';

export const dependencies = new Map();

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

  if (!escape.startsWith('\\')) {
    throw new Error('regex escape must start with \\');
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

export const grammar = class RegexMiniparserGrammar {
  @Node
  *Pattern() {
    yield i`eat(<| Punctuator '/' path='open' balanced='/' |>)`;
    yield i`eat(<Alternatives path='[alternatives]'>)`;
    yield i`eat(<| Punctuator '/' path='close' balancer |>)`;
    yield i`eat(<Flags path='[flags]'>)`;
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
    const flag = yield i`eatMatch(<| Keyword /[gimsuy]/ path='value' |>)`;

    return { kind: flagsReverse[flag] };
  }

  *Alternatives() {
    do {
      yield i`eat(<Alternative>)`;
    } while (yield i`eatMatch(<| Punctuator '|' path='[separators]' |>)`);
  }

  @Node
  *Alternative() {
    yield i`eat(<Elements path='[elements]'>)`;
  }

  *Elements() {
    while (yield i`match(/[^|]/)`) {
      yield i`eat(<Element>)`;
    }
  }

  @Cover
  *Element() {
    yield i`eat(<Any {[
        <CharacterClass { guard: '[' }>
        <Group { guard: '(?:' }>
        <Assertion { guard: '/[$^]|\\b|/i' }>
        <CharacterSet { guard: '/\.|\\[dswp]/i' }>
        <Character>
      ]}>)`;

    yield i`shiftMatch(<Quantifier { guard: /[*+?{]/ }>)`;
  }

  @Node
  *Group() {
    yield i`eat(<| Punctuator '(?:' path='open' balanced=')' |>)`;
    yield i`eat(<Alternatives path='[alternatives]'>)`;
    yield i`eat(<| Punctuator ')' path='close' balancer |>)`;
  }

  @Node
  *CapturingGroup() {
    yield i`eat(<| Punctuator '(' path='open' balanced=')' |>)`;
    yield i`eat(<Alternatives path='[alternatives]'>)`;
    yield i`eat(<| Punctuator ')' path='close' balancer |>)`;
  }

  @Node
  *Assertion() {
    if (yield i`eatMatch(<| Punctuator '^' path='value' |>)`) {
      return { kind: 'start' };
    } else if (yield i`eatMatch(<| Keyword '$' path='value' |>)`) {
      return { kind: 'end' };
    } else {
      if (yield i`eatMatch(<| Escape '\\' path='escape' |>)`) {
        const m = yield i`eat(<| Keyword /b/i path='value' |>)`;
        return { kind: 'word', negate: m === 'B' };
      } else {
        throw new Error('invalid boundary');
      }
    }
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
    yield i`eat(<| Punctuator '[' path='open' startSpan='CharacterClass' balanced=']' |>)`;

    let first = !(yield i`eatMatch(<| Keyword '^' path='negate' |>)`);

    while (yield i`match(/./s)`) {
      yield i`eat(<CharacterClassElement path='[elements]' {${when(
        first,
        spam.Argument`first: true`,
      )}}>)`;
      first = false;
    }

    yield i`eat(<| Punctuator ']' path='close' endSpan='CharacterClass' balancer |>)`;
  }

  @Cover
  *CharacterClassElement({ props: { first } }) {
    yield i`eat(<Any {[
        <CharacterClassRange { guard: /.-[^\]\n]/, first: ${first} }>
        <CharacterSet { guard: /\.|\\[dswp]/i }>
        <Character ${when(first, spam.Attribute`span='CharacterClass:First'`)}>
      ]}>)`;
  }

  @Node
  @CoveredBy('CharacterClassElement')
  *CharacterClassRange({ props: { first = false } }) {
    yield i`eat(<Character path='min' ${when(
      first,
      spam.Attribute`span='CharacterClass:First'`,
    )}>)`;
    yield i`eat(<| Punctuator '-' path='rangeOperator' |>)`;
    yield i`eat(<Character path='max'>)`;
  }

  @Node
  *CharacterSet() {
    if (yield i`eatMatch(<| Keyword '.' path='value' |>)`) {
      return { kind: 'any' };
    }

    yield i`eat(<| Punctuator '\\' path='escape' |>)`;

    let attrs;

    if (yield i`eatMatch(<| Keyword 'd' path='value' |>)`) {
      attrs = { kind: 'digit' };
    } else if (yield i`eatMatch(<| Keyword 'D' path='value' |>)`) {
      attrs = { kind: 'digit', negate: true };
    } else if (yield i`eatMatch(<| Keyword 's' path='value' |>)`) {
      attrs = { kind: 'space' };
    } else if (yield i`eatMatch(<| Keyword 'S' path='value' |>)`) {
      attrs = { kind: 'space', negate: true };
    } else if (yield i`eatMatch(<| Keyword 'w' path='value' |>)`) {
      attrs = { kind: 'word' };
    } else if (yield i`eatMatch(<| Keyword 'W' path='value' |>)`) {
      attrs = { kind: 'word', negate: true };
    } else if (yield i`match(/p/i)`) {
      throw new Error('unicode property character sets are not supported yet');
    } else {
      throw new Error('unknown character set kind');
    }

    return { attrs };
  }

  @Node
  *Quantifier() {
    yield i`eatHeld(<Element path='element'>)`;

    let attrs;

    if (yield i`eatMatch(<| Keyword '*' path='value' |>)`) {
      attrs = { min: 0, max: Infinity };
    } else if (yield i`eatMatch(<| Keyword '+' path='value' |>)`) {
      attrs = { min: 1, max: Infinity };
    } else if (yield i`eatMatch(<| Keyword '?' path='value' |>)`) {
      attrs = { min: 0, max: 1 };
    } else if (yield i`eat(<| Punctuator '{' path='open' balanced='}' |>)`) {
      let max;
      let min = yield i`eat(<| Number /\d+/ path='min' |>)`;

      if (yield i`eatMatch(<| Punctuator ',' path='separator' |>)`) {
        max = yield i`eatMatch(<| Number /\d+/y path='max' |>)`;
      }

      attrs = { min, max };

      yield i`eat(<| Punctuator '}' path='close' balancer |>)`;
    }

    return { attrs };
  }
};
