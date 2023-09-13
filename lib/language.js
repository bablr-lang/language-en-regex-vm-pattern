import { RegexMiniparserGrammar } from './parse-grammar.js';

const miniparser = Symbol.for('@bablr/grammars/miniparser');

export const grammars = {
  [miniparser]: RegexMiniparserGrammar,
};
