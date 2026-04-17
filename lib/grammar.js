import {
  eat,
  eatMatch,
  match,
  shiftMatch,
  guard,
  defineAttribute,
  fail,
  m,
  o,
  r,
  startSpan,
  endSpan,
  startSubspan,
} from '@bablr/helpers/grammar';
import { buildString } from '@bablr/helpers/builders';
import { get } from '@bablr/agast-helpers/path';
import { printSource } from '@bablr/agast-helpers/tree';
import * as BSet from '@bablr/agast-helpers/b-set';
import * as BMap from '@bablr/agast-helpers/b-map';
import { immutable, freeze } from '@bablr/agast-helpers/object';

let { entry } = BMap;

const escapables = freeze({
  n: '\n',
  r: '\r',
  t: '\t',
  0: '\0',
});

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
  if (span.name === 'Pattern') {
    return m`/[*+?{}[\]().^$|\n\\<>]/`;
  } else if (span.name === 'CharacterClass') {
    return m`/[\]\\]/`;
  } else {
    throw new Error('unknown span type for special pattern');
  }
};

export default class Regex {
  static canonicalURL = 'https://bablr.org/languages/core/en/bablr-regex-pattern';
  static dependencies = freeze({});
  static defaultMatcher = m`<Pattern />`;
  static fragmentProduction = null;
  static context = immutable({});

  constructor() {
    this.literals = BSet.from('Keyword');
    this.emptyables = BSet.from('Alternatives', 'Alternative', 'Elements', 'Flags');
    this.attributes = BMap.from(
      entry(
        'Flags',
        Object.fromEntries(Object.keys(flagCharacters).map((key) => [key, undefined])),
      ),
      entry('WordBoundaryAssertion', { negate: undefined }),
      entry('CharacterClass', { negate: undefined }),
      entry('DigitCharacterSet', { negate: undefined }),
      entry('SpaceCharacterSet', { negate: undefined }),
      entry('WordCharacterSet', { negate: undefined }),
      entry('Quantifier', { min: undefined, max: undefined }),
    );
  }

  *Pattern() {
    yield eat(m`openToken*: <* '/' />`);
    yield startSpan('Pattern', '/');
    yield eat(m`<__Alternatives />`);
    yield endSpan();
    yield eat(m`closeToken*: <* '/' />`);
    yield eat(m`flags$: <Flags />`);
  }

  *Flags() {
    const flags = yield match(m`/[gimsuy]+/`);

    const flagsStr = printSource(flags) || '';

    if (flagsStr && !unique(flagsStr)) throw new Error('flags must be unique');

    for (const { 0: name, 1: chr } of Object.entries(flagCharacters)) {
      if (flagsStr.includes(chr)) {
        yield defineAttribute(name, true);
      } else {
        yield defineAttribute(name, false);
      }
    }

    for (const flagChr of flagsStr) {
      yield eat(m`tokens[]*: <*Keyword ${buildString(flagChr)} />`);
    }
  }

  *Alternatives() {
    do {
      yield eat(m`alternatives[]$: <Alternative />`);
    } while (yield eatMatch(m`#separatorTokens: <* '|' />`));
  }

  *Alternative() {
    yield eat(m`elements[]+$: <__Elements />`);
  }

  *Elements({ matcher }) {
    while (yield match(m`/[^|]/`)) {
      yield eat(m`${get('refMatcher', matcher)} <_Element />`);
    }
  }

  *Element({ s }) {
    if (yield eatMatch(m`<CharacterClass '[' />`)) {
    } else if (yield eatMatch(m`<Group /\((?:\?:)?/ />`)) {
    } else if (yield match(m`/\(\?\<?[=!]/`)) {
      yield fail('Lookahead and lookbehind are not supported');
    } else if (yield eatMatch(m`<CapturingGroup '(' />`)) {
    } else if (yield eatMatch(m`<_Assertion /[$^]|\\b/i />`)) {
    } else if (yield eatMatch(m`<Gap '\\g' />`)) {
    } else if (yield eatMatch(m`<_CharacterSet /\.|\\[dswp]/i />`)) {
    } else {
      if (!(yield match(m`'\\'`))) {
        yield guard(getSpecialPattern(s().span));
      }
      yield eat(m`<*Character />`);
    }

    return r(shiftMatch(m`<Quantifier /[*+?{]/ />`));
  }

  *Group() {
    yield eat(m`openToken*: <* /\((?:\?:)?/ />`);
    yield startSubspan(null, ')');
    yield eat(m`<__Alternatives />`);
    yield endSpan();
    yield eat(m`closeToken*: <* ')' />`);
  }

  *CapturingGroup() {
    yield eat(m`openToken*: <* '(' />`);
    yield startSpan('Pattern', ')');
    yield eat(m`<__Alternatives />`);
    yield endSpan();
    yield eat(m`closeToken*: <* ')' />`);
  }

  *Assertion() {
    if (yield eatMatch(m`<StartOfInputAssertion '^' />`)) {
    } else if (yield eatMatch(m`<EndOfInputAssertion '$' />`)) {
    } else {
      yield eat(m`<WordBoundaryAssertion /\\b/i />`);
    }
  }

  *StartOfInputAssertion() {
    yield eat(m`sigilToken*: <*Keyword '^' />`);
  }

  *EndOfInputAssertion() {
    yield eatMatch(m`sigilToken*: <*Keyword '$' />`);
  }

  *WordBoundaryAssertion() {
    yield eatMatch(m`escapeToken*: <* '\\' />`);
    const m_ = yield eat(m`value*: <*Keyword /b/i />`);
    yield defineAttribute('negate', printSource(m_.node) === 'B');
  }

  *Gap() {
    yield eatMatch(m`escapeToken*: <* '\\' />`);
    yield eat(m`value*: <*Keyword 'g' />`);
  }

  *Character() {
    if (yield match(m`'\\'`)) {
      yield eat(m`@: <EscapeSequence />`);
    } else {
      yield eat(m`/[^\r\n\t]/`);
    }
  }

  *CharacterClass() {
    yield eat(m`openToken*: <* '[' />`);
    yield startSpan('CharacterClass', ']');

    let negate = yield eatMatch(m`negateToken*: <*Keyword '^' />`);

    yield defineAttribute('negate', !!negate);

    while (yield match(m`/[^\]]/s`)) {
      yield eat(m`elements[]+$: <_CharacterClassElement />`);
    }

    yield endSpan();
    yield eat(m`closeToken*: <* ']' />`);
  }

  *CharacterClassElement() {
    if (yield eatMatch(m`<_CharacterSet /\\[dswp]/i />`)) {
    } else if (yield eatMatch(m`<Gap '\\g' />`)) {
    } else {
      yield eat(m`<*Character />`);
    }

    if (yield match(m`'-'`)) {
      return r(shiftMatch(m`<CharacterClassRange />`));
    }
  }

  *CharacterClassRange() {
    yield eat(m`min+$: <*Character />`, o({}), o({ held: 'eat' }));
    yield eat(m`sigilToken*: <* '-' />`);
    yield eat(m`max+$: <*Character />`);
  }

  *CharacterSet() {
    if (yield eatMatch(m`<AnyCharacterSet '.' />`)) {
    } else if (yield eatMatch(m`<DigitCharacterSet /\\[dD]/  />`)) {
    } else if (yield eatMatch(m`<SpaceCharacterSet /\\[sS]/  />`)) {
    } else {
      yield eat(m`<WordCharacterSet /\\[wW]/ />`);
    }
  }

  *AnyCharacterSet() {
    yield eat(m`sigilToken*: <*Keyword '.' />`);
  }

  *DigitCharacterSet() {
    yield eat(m`escapeToken*: <* '\\' />`);

    let code = yield eat(m`value*: <*Keyword /[dD]/ />`);

    yield defineAttribute('negate', printSource(code.node) === 'D');
  }

  *SpaceCharacterSet() {
    yield eat(m`escapeToken*: <* '\\' />`);

    let code = yield eat(m`value*: <*Keyword /[sS]/ />`);

    yield defineAttribute('negate', printSource(code.node) === 'S');
  }

  *WordCharacterSet() {
    yield eat(m`escapeToken*: <* '\\' />`);

    let code = yield eat(m`value*: <*Keyword /[wW]/ />`);

    yield defineAttribute('negate', printSource(code.node) === 'W');
  }

  *Quantifier() {
    yield eat(m`element+$: <_Element />`, o({}), o({ held: 'eat' }));

    let attrs, sigil;

    if ((sigil = yield eatMatch(m`sigilToken*: <*Keyword /[*+?]/ />`))) {
      switch (printSource(sigil.node)) {
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
    } else if (yield eat(m`openToken*: <* '{' />`)) {
      yield eat(m`min$: <*UnsignedInteger />`);

      if (yield eatMatch(m`separator$: <* ',' />`)) {
        yield eatMatch(m`max$: <*UnsignedInteger />`);
      }

      yield eat(m`closeToken*: <* '}' />`);
    }

    yield defineAttribute('min', attrs.min);
    yield defineAttribute('max', attrs.max);
  }

  *UnsignedInteger() {
    yield eat(m`/\d+/`);
  }

  *UnsignedHexInteger() {
    yield eat(m`/[\da-fA-F]+/`);
  }

  *EscapeSequence({ ctx, s }) {
    let { getGapNode } = ctx;
    let parentSpan = s().span;

    yield startSpan('Escape');

    yield eat(m`sigilToken*: <* '\\' />`);

    let m_;
    let cooked;

    if ((m_ = yield match(m`/[\\/nrt0]/`))) {
      let match_ = printSource(m_);
      yield eat(m`code*: <*Keyword ${buildString(match_)} />`);

      cooked = escapables[match_] || match_;
    } else if ((m_ = yield match(getSpecialPattern(parentSpan)))) {
      cooked = printSource(m_);
      yield eat(m`code*: <*Keyword ${buildString(cooked)} />`);
    } else if (yield match(m`/[ux]/`)) {
      let code = yield eat(m`code*: <EscapeCode />`);

      let value = getGapNode(get('value', code.node));

      cooked = String.fromCodePoint(parseInt(printSource(value, { getGapNode }), 16));
    } else {
      yield fail();
    }

    yield endSpan();

    yield defineAttribute('cooked', cooked);
  }

  *EscapeCode() {
    if (yield eatMatch(m`type*: <*Keyword 'u' />`)) {
      if (yield eatMatch(m`openToken*: <* '{' />`)) {
        yield eatMatch(m`value: <*UnsignedHexInteger />`);
        yield eat(m`closeToken*: <* '}' />`);
      } else {
        yield eat(m`value: <*UnsignedHexInteger /[\da-fA-F]{4}/ />`);
      }
    } else if (yield eatMatch(m`type*: <*Keyword 'x' />`)) {
      yield eat(m`value: <*UnsignedHexInteger /[\da-fA-F]{2}/ />`);
    }
  }

  *Digits() {
    while (yield eatMatch(m`<*Digit />`));
  }

  *Digit() {
    yield eat(m`/\d/`);
  }
}

freeze(Regex);
freeze(Regex.prototype);
