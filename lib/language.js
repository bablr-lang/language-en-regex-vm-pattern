import { buildCovers } from '@bablr/grammar';
import { RegexMiniparserGrammar } from './parse-grammar.js';
import { RegexMiniprinterGrammar } from './print-grammar.js';

const node = Symbol.for('@bablr/node');

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
  ],
});

const miniparser = Symbol.for('@bablr/grammars/miniparser');
const miniprinter = Symbol.for('@bablr/grammars/miniprinter');

export const grammars = {
  [miniparser]: RegexMiniparserGrammar,
  [miniprinter]: RegexMiniprinterGrammar,
};
