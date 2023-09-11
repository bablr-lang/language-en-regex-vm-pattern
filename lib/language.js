import { buildCovers } from '@bablr/grammar';
import { RegexMiniparserGrammar } from './parse-grammar.js';

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

export const grammars = {
  [miniparser]: RegexMiniparserGrammar,
};
