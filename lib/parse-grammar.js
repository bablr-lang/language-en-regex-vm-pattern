// export const escapeCharacterClass = (str) => str.replace(/]\\-/g, (r) => `\\${r}`);

const unique = (flags) => flags.length === new Set(flags).size;

const specialPatterns = {
  Expression: /[*+{}[\]()\.^$|\\\n]/y,
  CharacterClass: /[\]\\\.]/y,
  'CharacterClass:NoRange': /[\]\-\\\.]/y,
  'CharacterClass:NoNegate': /[\]^\\\.]/y,
};

export class RegexMiniparserGrammar {
  // @Node
  RegExpLiteral(p) {
    p.eat('/', { startSpan: 'Expression', balanced: '/' });
    const pattern = p.eatProduction('Pattern');
    p.eat('/', { endSpan: 'Expression' });
    const flags = p.eatProduction('Flags');

    return { pattern, flags };
  }

  // @Node
  Flags(p) {
    const flags = p.eatMatch(/[gimsuy]+/y) || '';

    if (!unique(flags)) throw new Error('flags must be unique');

    return {
      global: flags.includes('g'),
      ignoreCase: flags.includes('i'),
      multiline: flags.includes('m'),
      dotAll: flags.includes('s'),
      unicode: flags.includes('u'),
      sticky: flags.includes('y'),
    };
  }

  // @Node
  Pattern(p) {
    const alternatives = p.eatProduction('Alternatives');
    return { alternatives };
  }

  Alternatives(p) {
    const alternatives = [];
    do {
      alternatives.push(p.eatProduction('Alternative'));
    } while (p.eatMatch('|'));
    return alternatives;
  }

  // @Node
  Alternative(p) {
    const elements = [];
    while (!p.done && !p.match('|')) {
      elements.push(p.eatProduction('Element'));
    }
    return { elements };
  }

  Element(p) {
    let el;
    if (p.match('[')) {
      el = p.eatProduction('CharacterClass');
    } else if (p.match('(?:')) {
      el = p.eatProduction('Group');
    } else if (p.match(/\(\?<?[=!]/y)) {
      throw new Error('Lookeahead and lookbehind are not supported');
    } else if (p.match('(')) {
      el = p.eatProduction('CapturingGroup');
    } else if (p.match(/[$^]|\\b|/iy)) {
      el = p.eatProduction('Assertion');
    } else if (p.match(/\.|\\[dswp]/iy)) {
      el = p.eatProduction('CharacterSet');
    } else {
      el = p.eatProduction('Character');
    }

    if (p.match(/[*+?]|{\d+,?\d*}/y)) {
      p.element = el; // not my best work
      return p.eatProduction('Quantifier');
    } else {
      return el;
    }
  }

  // @Node
  Group(p) {
    p.eat('(?:', { startSpan: 'Expression', balanced: ')' });
    const alternatives = p.eatProduction('Alternatives');
    p.eat(')', { endSpan: 'Expression' });
    return { alternatives };
  }

  // @Node
  CapturingGroup(p) {
    p.eat('(', { startSpan: 'Expression', balanced: ')' });
    const alternatives = p.eatProduction('Alternatives');
    p.eat(')', { endSpan: 'Expression' });
    return { alternatives };
  }

  // @Node
  Assertion(p) {
    if (p.eatMatch('^')) {
      return { kind: 'start' };
    } else if (p.eatMatch('$')) {
      return { kind: 'end' };
    } else {
      let m;
      if ((m = p.eatMatch(/\\b/iy))) {
        return { kind: 'word', negate: m[1] === 'B' };
      } else {
        throw new Error('invalid boundary');
      }
    }
  }

  // @Node
  Character(p) {
    const specialPattern = specialPatterns[p.span.type];
    const esc = p.eatMatch('\\');
    let value;

    if (esc) {
      const escapeType = p.eatMatch(/[ux]/y);
      if (escapeType) {
        let code;
        if (escapeType === 'x') {
          code = p.eatMatch(/[0-9a-f]{2}/iy);
        } else {
          if (p.eatMatch('{')) {
            code = p.eat(/\d{1,6}/y);
            p.eat('}');
          } else {
            code = p.eatMatch(/\d{4}/y);
          }
        }
        if (!code) {
          throw new Error('Inavlid escape sequence');
        }
        value = String.fromCodePoint(parseInt(code, 10));
      } else {
        value = p.eat(specialPattern);
      }
    } else if (!p.match(specialPattern)) {
      value = p.eat(/./sy);
    } else {
      throw new Error('invalid character');
    }

    return { value };
  }

  // @Node
  CharacterClass(p) {
    p.eat('[', { startSpan: 'CharacterClass', balanced: ']' });

    p.replaceSpan({ type: 'CharacterClass:NoNegate', guard: p.span.guard });

    const negate = !!p.eatMatch('^');

    const elements = [];
    while (!p.done) {
      elements.push(p.eatProduction('CharacterClassElement'));
    }

    p.eat(']', { endSpan: p.span.type });
    return { negate, elements };
  }

  CharacterClassElement(p) {
    if (p.match(/.-[^\]\n]/y)) {
      return p.eatProduction('CharacterClassRange');
    } else {
      return p.eatProduction('Character');
    }
  }

  // @Node
  CharacterClassRange(p) {
    const min = p.eatProduction('Character');
    p.replaceSpan({ type: 'CharacterClass', guard: p.span.guard });
    p.eat('-');
    const max = p.eatProduction('Character');
    p.replaceSpan({ type: 'CharacterClass:NoRange', guard: p.span.guard });
    return { min, max };
  }

  // @Node
  CharacterSet(p) {
    if (p.eatMatch('.')) {
      return { kind: 'any' };
    }

    p.eat('\\');

    if (p.eatMatch('d')) {
      return { kind: 'digit', negate: false };
    } else if (p.eatMatch('D')) {
      return { kind: 'digit', negate: true };
    } else if (p.eatMatch('s')) {
      return { kind: 'space', negate: false };
    } else if (p.eatMatch('S')) {
      return { kind: 'space', negate: true };
    } else if (p.eatMatch('w')) {
      return { kind: 'word', negate: false };
    } else if (p.eatMatch('W')) {
      return { kind: 'word', negate: true };
    } else if (p.eatMatch(/p/iy)) {
      throw new Error('unicode property character sets are not supported yet');
    } else {
      throw new Error('unknown character set kind');
    }
  }

  // @Node
  Quantifier(p) {
    let min = -Infinity;
    let max = Infinity;

    if (!p.element) {
      throw new Error('nothing to quantify');
    }

    if (p.eatMatch('*')) {
      min = 0;
    } else if (p.eatMatch('+')) {
      min = 1;
    } else if (p.eatMatch('?')) {
      min = 0;
      max = 1;
    } else {
      p.eat('{');
      min = max = parseInt(p.eat(/\d+/y), 10);
      if (p.eatMatch(',')) {
        let m;
        if ((m = p.eatMatch(/\d+/y))) {
          max = parseInt(m, 10);
        }
      }
      p.eat('}');
    }

    const greedy = !p.eatMatch('?');

    const { element } = p;

    p.element = null;
    return { min, max, greedy, element };
  }
}
