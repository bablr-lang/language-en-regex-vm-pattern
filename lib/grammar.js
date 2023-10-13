import { i } from '@bablr/helpers/shorthand';
import objectEntries from 'iter-tools-es/methods/object-entries';
import { buildCovers } from '@bablr/grammar';

const node = Symbol.for('@bablr/node');

export const name = 'Regex';

export const dependencies = new Map();

export const covers = buildCovers({
  [node]: [
    'RegExpLiteral',
    'Flags',
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
    'Punctuator',
    'Keyword',
    'Escape',
    'DecimalInteger',
  ],
  CharacterClassElement: ['CharacterClassRange', 'Character'],
});

const escapables = new Map(
  objectEntries({
    n: '\n'.codePointAt(0),
    r: '\r'.codePointAt(0),
    t: '\t'.codePointAt(0),
    0: '\0'.codePointAt(0),
  }),
);

const cookCharacterEscape = (escape, span) => {
  let hexMatch;

  if (!escape.startsWith('\\')) {
    throw new Error('regex escape must start with \\');
  }

  if ((hexMatch = /\\x([0-9a-f]{2})/iy.exec(escape))) {
    //continue
  } else if ((hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape))) {
    //continue
  } else if ((hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape))) {
    //continue
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

  const specialPattern = specialPatterns[span.type];

  specialPattern.lastIndex = 0; // NO!!!

  let specialMatch = specialPattern.exec(escape.slice(1));

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

const specialPatterns = {
  Expression: /[*+{}[\]()\.^$|\\\n]/y,
  CharacterClass: /[\]\\\.]/y,
  'CharacterClass:NoRange': /[\]\-\\\.]/y,
  'CharacterClass:NoNegate': /[\]^\\\.]/y,
};

export const grammar = class RegexMiniparserGrammar {
  // @Node
  *Pattern() {
    yield i`eat(<| Punctuator '/' path='open' startSpan='Expression' balanced='/' |>)`;
    yield i`eat(<Alternatives path='[alternatives]'>)`;
    yield i`eat(<| Punctuator '/' path='close' endSpan='Expression' balancer |>)`;
    yield i`eat(<Flags path='[flags]'>)`;
  }

  *Flags({ attrs }) {
    const flags = yield i`match(/[gimsuy]+/)` || '';

    if (!unique(flags)) throw new Error('flags must be unique');

    for (const _ of flags) {
      yield i`eat(<Flag ${attrs}>)`;
    }
  }

  // @Node
  *Flag() {
    const flag = yield i`eatMatch(<| Keyword /[gimsuy]/ path='value' |>)`;

    return { kind: flagsReverse[flag] };
  }

  *Alternatives({ attrs }) {
    do {
      yield i`eat(<Alternative ${attrs}>)`;
    } while (yield i`eatMatch(<| Punctuator '|' path=[separators] |>)`);
  }

  // @Node
  *Alternative() {
    yield i`eat(Elements path='[elements]')`;
  }

  *Elements({ attrs }) {
    while (yield i`match(/./s)`) {
      yield i`eat(<Element ${attrs}>)`;
    }
  }

  // @Cover
  *Element({ attrs }) {
    let el;
    if (yield i`match('[')`) {
      el = yield i`eat(<CharacterClass ${attrs}>)`;
    } else if (yield i`match('(?:')`) {
      el = yield i`eat(<Group ${attrs}>)`;
    } else if (yield i`match(/\(\?<?[=!]/)`) {
      throw new Error('Lookeahead and lookbehind are not supported');
    } else if (yield i`match('(')`) {
      el = yield i`eat(<CapturingGroup ${attrs}>)`;
    } else if (yield i`match(/[$^]|\\b|/i)`) {
      el = yield i`eat(<Assertion ${attrs}>)`;
    } else if (yield i`match(/\.|\\[dswp]/i)`) {
      el = yield i`eat(<CharacterSet ${attrs}>)`;
    } else {
      el = yield i`eat('Character', attrs)`;
    }

    if (yield i`match(/[*+?]|{\d+,?\d*}/)`) {
      yield shiftProduction('Quantifier', attrs);
    }
  }

  // @Node
  *Group() {
    yield i`eat(<| Punctuator '(?:' path='open' startSpan='Expression' balanced=')' |>)`;
    yield i`eat(<Alternatives path='[alternatives]'>)`;
    yield i`eat(<| Punctuator ')' path='close' endSpan='Expression' balancer |>)`;
  }

  // @Node
  *CapturingGroup() {
    yield i`eat(<| Punctuator '(' path='open' startSpan='Expression' balanced=')' |>)`;
    yield i`eat(<Alternatives path='[alternatives]'>)`;
    yield i`eat(<| Punctuator ')' path='close' endSpan='Expression' balancer |>)`;
  }

  // @Node
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

  // @Node
  *Character() {
    const specialPattern = specialPatterns[span.type];

    if (
      yield eatMatchEscape(
        new RegExp(
          String.raw`\\(u(\{\d{1,6}\}|\d{4})|x[0-9a-fA-F]{2}|[nrt0]|${specialPattern.source})`,
          'y',
        ),
        cookCharacterEscape,
      )
    ) {
      // done
    } else if (yield i`match(${specialPattern})`) {
      throw new Error('invalid character');
    } else {
      yield i`eat(/./s)`;
    }
  }

  // @Node
  *CharacterClass() {
    yield i`eat(<| Punctuator '[' path='open' startSpan='CharacterClass' balanced=']' |>)`;

    yield replaceSpan({ type: 'CharacterClass:NoNegate', guard: span.guard });

    yield i`eatMatch(<| Keyword '^' path='negate' |>)`;

    while (yield i`match(/./s)`) {
      yield i`eat(<CharacterClassElement path='[elements]'>)`;
    }

    yield replaceSpan({ type: 'CharacterClass', guard: span.guard });
    yield i`eat(<| Punctuator ']' path='close' endSpan='CharacterClass' balancer |>)`;
  }

  // @Cover
  *CharacterClassElement({ attrs }) {
    if (yield i`match(/.-[^\]\n]/)`) {
      yield i`eat(<CharacterClassRange ${attrs}>)`;
    } else if (yield i`match(/\.|\\[dswp]/i)`) {
      yield i`eat(<CharacterSet ${attrs}>)`;
    } else {
      yield i`eat(<Character ${attrs}>)`;
    }
  }

  // @Node
  *CharacterClassRange() {
    yield i`eat(<Character path='min'>)`;
    yield replaceSpan({ type: 'CharacterClass', guard: span.guard });
    yield i`eat(<| Punctuator '-' path='rangeOperator' |>)`;
    yield i`eat(<Character path='max'>)`;
    yield replaceSpan({ type: 'CharacterClass:NoRange', guard: span.guard });
  }

  // @Node
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

  // @Node
  *Quantifier() {
    yield eatHeldProduction('Element', { path: 'element' });

    let attrs;

    if (yield i`eatMatch(<| Keyword '*' path='value' |>)`) {
      attrs = { min: 0, max: Infinity };
    } else if (yield i`eatMatch(<| Keyword '+' path='value' |>)`) {
      attrs = { min: 1, max: Infinity };
    } else if (yield i`eatMatch(<| Keyword '?' path='value' |>)`) {
      attrs = { min: 0, max: 1 };
    } else if (yield i`match('{')`) {
      yield i`eat(<| Punctuator '{' path='open' balanced='}' |>)`;

      let max;
      let min = yield i`eat(<| DecimalInteger /\d+/ path='min' |>)`;

      if (yield i`eatMatch(<| Punctuator ',' path='separator' |>)`) {
        max = yield i`eatMatch(<| DecimalInteger /\d+/y path='max' |>)`;
      }

      attrs = { min, max };

      yield i`eat(<| Punctuator '}' path='close' balancer |>)`;
    }

    yield (element = null);

    return { attrs };
  }
};
