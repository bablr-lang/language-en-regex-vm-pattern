import { RegexMiniparserGrammar } from './parse-grammar.js';
import { RegexMiniprinterGrammar } from './print-grammar.js';

const miniparser = Symbol.for('@bablr/grammars/miniparser');
const miniprinter = Symbol.for('@bablr/grammars/miniprinter');

export const grammars = {
  [miniparser]: RegexMiniparserGrammar,
  [miniprinter]: RegexMiniprinterGrammar,
};
