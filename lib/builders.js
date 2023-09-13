// To avoid dep cycles this grammar cannot depend on regex parsing!

export const fail = () => {
  return {
    type: 'Fail',
    value: undefined,
  };
};

export const disambiguate = (choices) => {
  return {
    type: 'Disambiguate',
    value: choices,
  };
};

export const Guard = (spamex) => {
  return {
    type: 'Match',
    value: {
      successEffect: 'None',
      failureEffect: 'Fail',
      spamex,
    },
  };
};

export const Match = (spamex) => {
  return {
    type: 'Match',
    value: {
      successEffect: 'None',
      failureEffect: 'None',
      spamex,
    },
  };
};

export const Eat = (spamex) => {
  return {
    type: 'Match',
    value: {
      successEffect: 'Eat',
      failureEffect: 'Fail',
      spamex,
    },
  };
};

export const EatMatch = (spamex) => {
  return {
    type: 'Match',
    value: {
      successEffect: 'Eat',
      failureEffect: 'None',
      spamex,
    },
  };
};

export const NodeMatcher = (tagName, attrs, args) => {
  return { tagName, attrs, args };
};

export const TokenMatcher = (tagName, value, attrs, args) => {
  return { tagName, value, attrs, args };
};

export const RegexMatcher = (regex) => {
  return { value: regex };
};

export const StringMatcher = (str) => {
  return { value: str };
};

export const Regex = (pattern, flags) => {
  return { pattern, flags };
};

export const Pattern = (alternatives) => {
  return { alternatives };
};

export const Flag = (value) => {
  return { value };
};

export const Flags = (values) => {
  return [...values].map((value) => Flag(value));
};

export const Alternative = (elements) => {
  return { elements };
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
