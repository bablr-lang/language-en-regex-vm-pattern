export const MiniprinterGrammar = class RegexMiniprinterGrammar {
  RegExpLiteral(p, node) {
    p.print('/');
    p.pushSpan({ type: 'Expression' });
    p.eatProduction(node.pattern);
    p.popSpan();
    p.print('/');
    p.eatProduction(node.flags);
  }

  Assertion(p, node) {
    switch (node.kind) {
      case 'start':
        p.print('^');
        break;

      case 'end':
        p.print('$');
        break;

      case 'word':
        p.print('\\b');
        break;

      default:
        throw new Error('invalid boundary');
    }
  }

  Alternatives(p, node) {
    for (const alternative of node.alternatives) {
      p.eatProduction(alternative);
    }
  }

  Alternative(p, node) {
    for (const element of node.elements) {
      p.eatProduction(element);
    }
  }

  Group(p, node) {
    p.print('(?:');
    p.pushSpan({ type: 'Expression' });
    p.eatProduction(node, 'Alternatives');
    p.popSpan();
    p.print(')');
  }

  CapturingGroup(p, node) {
    p.print('(');
    p.pushSpan({ type: 'Expression' });
    p.eatProduction(node, 'Alternatives');
    p.popSpan();
    p.print(')');
  }

  Pattern(p, node) {
    p.eatProduction(node, 'Alternatives');
  }

  Character(p, node) {
    switch (node.value) {
      case '\t':
        p.print('\\t');
        break;
      case '\r':
        p.print('\\r');
        break;
      case '\n':
        p.print('\\n');
        break;
      case '\v':
        p.print('\\v');
        break;
      case '\f':
        p.print('\\f');
        break;
      case '\\':
        p.print('\\\\');
        break;
      default:
        if (
          (p.span.type === 'Bare' && '*+{}[]().^$|'.includes(node.value)) ||
          (p.span.type === 'CharacterClass' && ']'.includes(node.value)) ||
          (p.span.type === 'CharacterClass:NoRange' && ']-'.includes(node.value)) ||
          (p.span.type === 'CharacterClass:NoNegate' && ']^'.includes(node.value))
        ) {
          p.print('\\');
        }
        p.print(node.value);
        break;
    }
  }

  CharacterClass(p, node) {
    p.print('[');

    p.pushSpan({ type: 'CharacterClass' });

    if (node.negate) {
      p.print('^');
    }

    p.pushSpan({ type: 'CharacterClass:NoNegate' });

    for (const element of node.elements) {
      p.eatProduction(element);
    }

    p.popSpan();
    p.popSpan();
    p.print(']');
  }

  CharacterClassRange(p, node) {
    p.eatProduction(node.min);
    p.replaceSpan({ type: 'CharacterClass' });
    p.print('-');
    p.eatProduction(node.max);
    p.replaceSpan({ type: 'CharacterClass:NoRange' });
  }

  CharacterSet(p, node) {
    switch (node.kind) {
      case 'any':
        p.print('.');
        break;
      case 'space':
        p.print('\\s');
        break;
      case 'word':
        p.print('\\w');
        break;
      case 'digit':
        p.print('\\d');
        break;
      case 'property':
        throw new Error('unicode property character sets are not supported yet');
      default:
        throw new Error('unknown character set kind');
    }
  }

  Quantifier(p, node) {
    const { min, max, greedy } = node;

    p.eatProduction(node.element);

    if (max === Infinity) {
      if (min === 0) {
        p.print('*');
      } else if (min === 1) {
        p.print('+');
      } else {
        p.print(`{${min}}`);
      }
    } else {
      p.print`{${min},${max}}`;
    }

    if (greedy) {
      p.print('?');
    }
  }

  Flags(p, node) {
    if (node.global) p.print('g');
    if (node.ignoreCase) p.print('i');
    if (node.multiline) p.print('m');
    if (node.dotAll) p.print('s');
    if (node.unicode) p.print('u');
    if (node.sticky) p.print('y');
  }
};
