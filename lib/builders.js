// To avoid dep cycles this grammar cannot depend on regex parsing!

export const Call = (verb, ...args) => {
  return { verb, args };
};

export const NodeMatcher = (tagName, attrs, args) => {
  return { tagName, attrs, args };
};

export const TokenMatcher = (tagName, value, attrs, args) => {
  return { tagName, value, attrs, args };
};

export const RegexMatcher = (pattern) => {
  return { value: pattern };
};

export const StringMatcher = (str) => {
  return { value: str };
};

export const Pattern = (alternatives, flags) => {
  return { alternatives, flags };
};

export const Flag = (value) => {
  return { value };
};

export const Flags = (...values) => {
  return [...values].map((value) => Flag(value));
};

export const Alternative = (elements) => {
  return { elements };
};

export const Alternatives = (...alternatives) => {
  return [...alternatives].map((value) => Alternative(value));
};

export const Quantifier = (min, max, element, greedy = true) => {
  return { element, min, max, greedy };
};

export const Character = (value) => {
  return { value };
};

export const Characters = (value) => {
  return value.map((chr) => Character(chr));
};

export const CharacterClass = (elements, negate = false) => {
  return { elements, negate };
};

export const CharacterSet = (kind, negate = false) => {
  return { kind, negate };
};

export const CharacterClassRange = (min, max) => {
  return { min, max };
};
