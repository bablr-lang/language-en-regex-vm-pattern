import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/agast-helpers/template";
import { interpolateArrayChildren as _interpolateArrayChildren } from "@bablr/agast-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/agast-helpers/template";
import * as _l from "@bablr/agast-vm-helpers/languages";
import * as _t from "@bablr/agast-helpers/shorthand";
var _initProto, _GroupDecs, _AssertionDecs, _StartOfInputAssertionDecs, _EndOfInputAssertionDecs, _WordBoundaryAssertionDecs, _CharacterDecs, _CharacterClassDecs, _CharacterClassRangeDecs, _CharacterSetDecs, _AnyCharacterSetDecs, _DigitCharacterSetDecs, _SpaceCharacterSetDecs, _WordCharacterSetDecs, _MatchDecs, _KeywordDecs, _PunctuatorDecs;
import { Node, CoveredBy, InjectFrom, Attributes, Holdable } from '@bablr/helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import when from 'iter-tools-es/methods/when';
import * as Shared from '@bablr/helpers/productions';
import { getCooked } from '@bablr/agast-helpers/stream';
import { buildString } from '@bablr/agast-vm-helpers';
export const name = 'Regex';
export const canonicalURL = 'https://github.com/bablr-lang/language-regex-vm-pattern';
export const dependencies = {};
const escapables = new Map(objectEntries({
  n: '\n'.codePointAt(0),
  r: '\r'.codePointAt(0),
  t: '\t'.codePointAt(0),
  0: '\0'.codePointAt(0)
}));
const flags = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  unicode: 'u',
  sticky: 'y'
};
const flagsReverse = Object.fromEntries(Object.entries(flags).map(([key, value]) => [value, key]));
const unique = flags => flags.length === new Set(flags).size;
const getSpecialPattern = span => {
  if (span === 'Pattern') {
    return _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
      open: _t.s_node(_l.Regex, "Punctuator", "/"),
      alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
        elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "["),
          elements: [_t.node(_l.Regex, "Character", [_t.lit("*")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("+")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("{")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("}")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("[")], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\]"
          }], {}, {
            cooked: "]"
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("(")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit(")")], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\."
          }], {}, {
            cooked: "."
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("^")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("$")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("|")], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\n"
          }], {}, {
            cooked: "\n"
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\\\"
          }], {}, {
            cooked: "\\"
          }))], {}, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "]")
        }, {})]
      }, {})],
      close: _t.s_node(_l.Regex, "Punctuator", "/")
    }, {});
  } else if (span === 'CharacterClass') {
    return _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
      open: _t.s_node(_l.Regex, "Punctuator", "/"),
      alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
        elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "["),
          elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\]"
          }], {}, {
            cooked: "]"
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\."
          }], {}, {
            cooked: "."
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\\\"
          }], {}, {
            cooked: "\\"
          }))], {}, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "]")
        }, {})]
      }, {})],
      close: _t.s_node(_l.Regex, "Punctuator", "/")
    }, {});
  } else if (span === 'CharacterClass:First') {
    return _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
      open: _t.s_node(_l.Regex, "Punctuator", "/"),
      alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
        elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "["),
          elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\]"
          }], {}, {
            cooked: "]"
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("^")], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\."
          }], {}, {
            cooked: "."
          }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\\\"
          }], {}, {
            cooked: "\\"
          }))], {}, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "]")
        }, {})]
      }, {})],
      close: _t.s_node(_l.Regex, "Punctuator", "/")
    }, {});
  } else if (span === 'Quantifier') {
    return _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
      open: _t.s_node(_l.Regex, "Punctuator", "/"),
      alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
        elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "["),
          elements: [_t.node(_l.Regex, "Character", [_t.lit("{")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("}")], {}, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "]")
        }, {})]
      }, {})],
      close: _t.s_node(_l.Regex, "Punctuator", "/")
    }, {});
  } else {
    throw new Error();
  }
};
export const grammar = (_GroupDecs = [CoveredBy('Element'), Node], _AssertionDecs = CoveredBy('Element'), _StartOfInputAssertionDecs = [CoveredBy('Assertion'), Node], _EndOfInputAssertionDecs = [CoveredBy('Assertion'), Node], _WordBoundaryAssertionDecs = [Attributes('negate'), CoveredBy('Assertion'), Node], _CharacterDecs = [CoveredBy('Element'), CoveredBy('CharacterClassElement'), Node], _CharacterClassDecs = [CoveredBy('Element'), Node], _CharacterClassRangeDecs = [CoveredBy('CharacterClassElement'), Node], _CharacterSetDecs = CoveredBy('Element'), _AnyCharacterSetDecs = [CoveredBy('CharacterSet'), Node], _DigitCharacterSetDecs = [CoveredBy('CharacterSet'), Node], _SpaceCharacterSetDecs = [CoveredBy('CharacterSet'), Node], _WordCharacterSetDecs = [CoveredBy('CharacterSet'), Node], _MatchDecs = InjectFrom(Shared), _KeywordDecs = [Node, InjectFrom(Shared)], _PunctuatorDecs = [Node, InjectFrom(Shared)], class RegexGrammar {
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "Pattern"], [Node, 2, "Flags"], [Node, 2, "Flag"], [Node, 2, "Alternative"], [Holdable, 2, "Element"], [_GroupDecs, 2, "Group"], [Node, 2, "CapturingGroup"], [_AssertionDecs, 2, "Assertion"], [_StartOfInputAssertionDecs, 2, "StartOfInputAssertion"], [_EndOfInputAssertionDecs, 2, "EndOfInputAssertion"], [_WordBoundaryAssertionDecs, 2, "WordBoundaryAssertion"], [_CharacterDecs, 2, "Character"], [_CharacterClassDecs, 2, "CharacterClass"], [_CharacterClassRangeDecs, 2, "CharacterClassRange"], [_CharacterSetDecs, 2, "CharacterSet"], [_AnyCharacterSetDecs, 2, "AnyCharacterSet"], [_DigitCharacterSetDecs, 2, "DigitCharacterSet"], [_SpaceCharacterSetDecs, 2, "SpaceCharacterSet"], [_WordCharacterSetDecs, 2, "WordCharacterSet"], [Node, 2, "Quantifier"], [Node, 2, "Number"], [Node, 2, "EscapeSequence"], [Node, 2, "EscapeCode"], [_MatchDecs, 2, "Match"], [_KeywordDecs, 2, "Keyword"], [_PunctuatorDecs, 2, "Punctuator"]], []).e;
  }
  constructor() {
    _initProto(this);
  }
  *Pattern() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("/")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("/")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("lexicalSpan")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("Pattern")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Alternatives")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("/")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Flags")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("flags")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Flags() {
    const flags = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "Character", [_t.lit("g")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("i")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("m")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("s")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("u")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("y")], {}, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "]")
              }, {}),
              value: _t.s_node(_l.Regex, "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}) || '';
    if (flags) {
      if (!unique(flags)) throw new Error('flags must be unique');
      for (const _ of flags) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Flag")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      }
    }
  }
  *Flag() {
    const flag = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "Character", [_t.lit("g")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("i")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("m")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("s")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("u")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("y")], {}, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    return {
      kind: flagsReverse[flag]
    };
  }
  *Alternatives() {
    do {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Alternative")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("alternatives[]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("|")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("separators")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
  }
  *Alternative() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Elements")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Elements() {
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "["),
              negate: _t.s_node(_l.Regex, "Keyword", "^"),
              elements: [_t.node(_l.Regex, "Character", [_t.lit("|")], {}, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "  "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Element")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("elements[]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Element() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("CharacterClass")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("[")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Group")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("(?:")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Assertion")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("$")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("^")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("b")], {}, {})]
              }, {}), _t.node(_l.Regex, "Alternative", [], {}, {})],
              separators: [_t.s_node(_l.Regex, "Punctuator", "|"), _t.s_node(_l.Regex, "Punctuator", "|")],
              close: _t.s_node(_l.Regex, "Punctuator", "/"),
              flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
                value: _t.s_node(_l.Regex, "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("CharacterSet")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\."
                }], {}, {
                  cooked: "."
                }))], {}, {})]
              }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("d")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("s")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("w")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("p")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              separators: [_t.s_node(_l.Regex, "Punctuator", "|")],
              close: _t.s_node(_l.Regex, "Punctuator", "/"),
              flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
                value: _t.s_node(_l.Regex, "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
                token: _t.s_node(_l.Spamex, "Punctuator", "*")
              }, {}),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Character")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "AnyCharacterSet", [_t.ref`value`], {
                  value: _t.s_node(_l.Regex, "Keyword", ".")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/"),
              flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
                value: _t.s_node(_l.Regex, "Keyword", "s")
              }, {
                kind: "dotAll"
              })]
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    return _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("holdForMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Quantifier")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Group() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("(?:")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(")")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Alternatives")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(")")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CapturingGroup() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("(")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(")")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Alternatives")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(")")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Assertion() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n    "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
                token: _t.s_node(_l.Spamex, "Punctuator", "*")
              }, {}),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("StartOfInputAssertion")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("^")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
                token: _t.s_node(_l.Spamex, "Punctuator", "*")
              }, {}),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("EndOfInputAssertion")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("$")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`, _t.ref`escape`], {
                token: _t.s_node(_l.Spamex, "Punctuator", "*"),
                escape: _t.s_node(_l.Spamex, "Punctuator", "@")
              }, {}),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("WordBoundaryAssertion")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("b")], {}, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/"),
              flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
                value: _t.s_node(_l.Regex, "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *StartOfInputAssertion() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("^")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *EndOfInputAssertion() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("$")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *WordBoundaryAssertion(props, s, ctx) {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    const m = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "Character", [_t.lit("b")], {}, {})]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/"),
            flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
              value: _t.s_node(_l.Regex, "Keyword", "i")
            }, {
              kind: "ignoreCase"
            })]
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(ctx.getCooked(m) === 'B', _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {}), ..._interpolateArray(ctx.getCooked(m) === 'B')],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Character(props, {
    span
  }) {
    const specialPattern = getSpecialPattern(span);
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
            type: "Literal",
            value: "\\\\"
          }], {}, {
            cooked: "\\"
          }))], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`escape`], {
              escape: _t.s_node(_l.Spamex, "Punctuator", "@")
            }, {}),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Escape")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, ..._interpolateArrayChildren(specialPattern, _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [..._interpolateArray(specialPattern)],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      throw new Error('invalid character');
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "AnyCharacterSet", [_t.ref`value`], {
                value: _t.s_node(_l.Regex, "Keyword", ".")
              }, {})]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/"),
            flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
              value: _t.s_node(_l.Regex, "Keyword", "s")
            }, {
              kind: "dotAll"
            })]
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *CharacterClass() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("[")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("startSpan")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("CharacterClass")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("]")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let first = !(yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("^")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {}));
    while (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "AnyCharacterSet", [_t.ref`value`], {
              value: _t.s_node(_l.Regex, "Keyword", ".")
            }, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/"),
          flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
            value: _t.s_node(_l.Regex, "Keyword", "s")
          }, {
            kind: "dotAll"
          })]
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("CharacterClassElement")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("elements[]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}), _t.node(_l.Instruction, "Object", [_t.ref`open`, ..._interpolateArrayChildren(when(first, [_t.node(_l.Instruction, "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`], {
            key: _t.node(_l.Instruction, "Literal", [_t.lit("first")], {}, {}),
            mapOperator: _t.s_node(_l.Instruction, "Punctuator", ":"),
            value: _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
              value: _t.s_node(_l.Instruction, "Keyword", "true")
            }, {})
          }, {})]), _t.ref`properties[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "{"),
            properties: [..._interpolateArray(when(first, [_t.node(_l.Instruction, "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`value`], {
              key: _t.node(_l.Instruction, "Literal", [_t.lit("first")], {}, {}),
              mapOperator: _t.s_node(_l.Instruction, "Punctuator", ":"),
              value: _t.node(_l.Instruction, "Boolean", [_t.ref`value`], {
                value: _t.s_node(_l.Instruction, "Keyword", "true")
              }, {})
            }, {})]))],
            close: _t.s_node(_l.Instruction, "Punctuator", "}")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      first = false;
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("]")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("endSpan")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("CharacterClass")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {}), _t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CharacterClassElement({
    props: {
      first
    }
  }) {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("CharacterClassRange")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "AnyCharacterSet", [_t.ref`value`], {
                  value: _t.s_node(_l.Regex, "Keyword", ".")
                }, {}), _t.node(_l.Regex, "Character", [_t.lit("-")], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  negate: _t.s_node(_l.Regex, "Keyword", "^"),
                  elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                    type: "Literal",
                    value: "\\]"
                  }], {}, {
                    cooked: "]"
                  }))], {}, {}), _t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                    type: "Literal",
                    value: "\\n"
                  }], {}, {
                    cooked: "\n"
                  }))], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {}), _t.node(_l.Instruction, "Object", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`properties[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`close`], {
              open: _t.s_node(_l.Instruction, "Punctuator", "{"),
              properties: [_t.node(_l.Instruction, "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
                type: "Literal",
                value: " "
              }], {}, [])), _t.ref`value`], {
                key: _t.node(_l.Instruction, "Literal", [_t.lit("first")], {}, {}),
                mapOperator: _t.s_node(_l.Instruction, "Punctuator", ":"),
                value: first
              }, {})],
              close: _t.s_node(_l.Instruction, "Punctuator", "}")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("CharacterSet")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\."
                }], {}, {
                  cooked: "."
                }))], {}, {})]
              }, {}), _t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("d")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("s")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("w")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("p")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              separators: [_t.s_node(_l.Regex, "Punctuator", "|")],
              close: _t.s_node(_l.Regex, "Punctuator", "/"),
              flags: [_t.node(_l.Regex, "Flag", [_t.ref`value`], {
                value: _t.s_node(_l.Regex, "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), ..._interpolateArrayChildren(when(first, _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node(_l.Spamex, "Literal", [_t.lit("span")], {}, {}),
              mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
              value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.s_node(_l.CSTML, "Punctuator", "'"),
                content: _t.node(_l.CSTML, "Content", [_t.lit("CharacterClass:First")], {}, {}),
                close: _t.s_node(_l.CSTML, "Punctuator", "'")
              }, {})
            }, {})), _t.ref`attributes[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
                token: _t.s_node(_l.Spamex, "Punctuator", "*")
              }, {}),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Character")], {}, {}),
              attributes: [..._interpolateArray(when(first, _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
                key: _t.node(_l.Spamex, "Literal", [_t.lit("span")], {}, {}),
                mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
                value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                  open: _t.s_node(_l.CSTML, "Punctuator", "'"),
                  content: _t.node(_l.CSTML, "Content", [_t.lit("CharacterClass:First")], {}, {}),
                  close: _t.s_node(_l.CSTML, "Punctuator", "'")
                }, {})
              }, {})))],
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CharacterClassRange({
    props: {
      first = false
    }
  }) {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), ..._interpolateArrayChildren(when(first, _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node(_l.Spamex, "Literal", [_t.lit("span")], {}, {}),
          mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("CharacterClass:First")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})
        }, {})), _t.ref`attributes[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Character")], {}, {}),
          attributes: [..._interpolateArray(when(first, _t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("span")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("CharacterClass:First")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})))],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("min")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("-")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("rangeOperator")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Character")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("max")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *CharacterSet() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.Instruction, "Null", [_t.ref`value`], {
          value: _t.s_node(_l.Instruction, "Keyword", "null")
        }, {}), _t.node(_l.Instruction, "Array", [_t.ref`open`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: "\n    "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "["),
          elements: [_t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("AnyCharacterSet")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(".")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("DigitCharacterSet")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("d")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("D")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("SpaceCharacterSet")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("s")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("S")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {}), _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("WordCharacterSet")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "/"),
              alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node(_l.Regex, "Punctuator", "["),
                  elements: [_t.node(_l.Regex, "Character", [_t.lit("w")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("W")], {}, {})],
                  close: _t.s_node(_l.Regex, "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "/")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", "]")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *AnyCharacterSet() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit(".")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *DigitCharacterSet() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let code = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "Character", [_t.lit("d")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("D")], {}, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(getCooked(code) === 'D', _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {}), ..._interpolateArray(getCooked(code) === 'D')],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *SpaceCharacterSet() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let code = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "Character", [_t.lit("s")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("S")], {}, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(getCooked(code) === 'S', _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {}), ..._interpolateArray(getCooked(code) === 'S')],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *WordCharacterSet() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let code = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node(_l.Regex, "Punctuator", "["),
                elements: [_t.node(_l.Regex, "Character", [_t.lit("w")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("W")], {}, {})],
                close: _t.s_node(_l.Regex, "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(getCooked(code) === 'W', _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {}), ..._interpolateArray(getCooked(code) === 'W')],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *Quantifier() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatHeld")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Element")], {}, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("element")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let attrs;
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("*")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      attrs = {
        min: 0,
        max: Infinity
      };
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("+")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      attrs = {
        min: 1,
        max: Infinity
      };
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("?")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      attrs = {
        min: 0,
        max: 1
      };
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("{")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          attributes: [_t.node(_l.Spamex, "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node(_l.Spamex, "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node(_l.Spamex, "Punctuator", "="),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("}")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      let max;
      let min = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Number")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("min")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
              token: _t.s_node(_l.Spamex, "Punctuator", "*")
            }, {}),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit(",")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("separator")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) {
        max = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Number")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("max")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      }
      attrs = {
        min,
        max
      };
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
              token: _t.s_node(_l.Spamex, "Punctuator", "*")
            }, {}),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("}")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            attributes: [_t.node(_l.Spamex, "BooleanAttribute", [_t.ref`key`], {
              key: _t.node(_l.Spamex, "Literal", [_t.lit("balancer")], {}, {})
            }, {})],
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
    return {
      attrs
    };
  }
  *Number() {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                value: _t.s_node(_l.Regex, "Keyword", "d")
              }, {}),
              value: _t.s_node(_l.Regex, "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *EscapeSequence(props, {
    span
  }, ctx) {
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
    let match, cooked;
    if (match = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.embedded(_t.s_e_node(_l.CSTML, 'Escape', [{
                type: "Literal",
                value: "\\\\"
              }], {}, {
                cooked: "\\"
              }))], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("/")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("n")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("r")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("t")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("0")], {}, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), ..._interpolateArrayChildren(match.value, _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
              token: _t.s_node(_l.Spamex, "Punctuator", "*")
            }, {}),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), ..._interpolateArray(match.value), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      cooked = escapables.get(match.value);
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("bindAttribute")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), ..._interpolateArrayChildren(buildString(cooked), _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Instruction, "Identifier", [_t.lit("cooked")], {}, {}), ..._interpolateArray(buildString(cooked))],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    } else if (match = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, ..._interpolateArrayChildren(getSpecialPattern(span).source, _t.ref`alternatives[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [..._interpolateArray(getSpecialPattern(span).source)],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      cooked = match.value;
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node(_l.Regex, "Punctuator", "/"),
          alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node(_l.Regex, "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_node(_l.Regex, "Punctuator", "["),
              elements: [_t.node(_l.Regex, "Character", [_t.lit("u")], {}, {}), _t.node(_l.Regex, "Character", [_t.lit("x")], {}, {})],
              close: _t.s_node(_l.Regex, "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_node(_l.Regex, "Punctuator", "/")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      const codeNode = yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("EscapeCode")], {}, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
      cooked = parseInt(ctx.unbox(ctx.getProperty(codeNode, 'value')), 16);
    } else {
      yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("fail")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {});
    }
    yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(buildString(cooked), _t.ref`values[]`, _t.embedded(_t.t_node(_l.Comment, null, [_t.embedded(_t.t_node('Space', 'Space', [_t.lit(' ')]))]))), _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Instruction, "Identifier", [_t.lit("cooked")], {}, {}), ..._interpolateArray(buildString(cooked))],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {});
  }
  *EscapeCode() {
    if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("u")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node(_l.CSTML, "Punctuator", "'"),
          content: _t.node(_l.CSTML, "Content", [_t.lit("type")], {}, {}),
          close: _t.s_node(_l.CSTML, "Punctuator", "'")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`, _t.ref`close`], {
            open: _t.s_node(_l.Spamex, "Punctuator", "<"),
            flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
              token: _t.s_node(_l.Spamex, "Punctuator", "*")
            }, {}),
            type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
            value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("{")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {}),
            close: _t.s_node(_l.Spamex, "Punctuator", ">")
          }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Digits")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`value`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
                token: _t.s_node(_l.Spamex, "Punctuator", "*")
              }, {}),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Punctuator")], {}, {}),
              value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.s_node(_l.CSTML, "Punctuator", "'"),
                content: _t.node(_l.CSTML, "Content", [_t.lit("}")], {}, {}),
                close: _t.s_node(_l.CSTML, "Punctuator", "'")
              }, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                element: _t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_node(_l.Regex, "Keyword", "d")
                }, {}),
                open: _t.s_node(_l.Regex, "Punctuator", "{"),
                min: _t.node(_l.Regex, "Number", [_t.lit("4")], {}, {}),
                close: _t.s_node(_l.Regex, "Punctuator", "}")
              }, {
                min: 4,
                max: undefined,
                greedy: true
              })]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
              value: _t.s_node(_l.Instruction, "Keyword", "null")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Digits")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
              value: _t.s_node(_l.Instruction, "Keyword", "null")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      }
    } else if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node(_l.Instruction, "Punctuator", "("),
        values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.ref`type`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node(_l.Spamex, "Punctuator", "<"),
          flags: _t.node(_l.Spamex, "NodeFlags", [_t.ref`token`], {
            token: _t.s_node(_l.Spamex, "Punctuator", "*")
          }, {}),
          type: _t.node(_l.Spamex, "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node(_l.CSTML, "Punctuator", "'"),
            content: _t.node(_l.CSTML, "Content", [_t.lit("x")], {}, {}),
            close: _t.s_node(_l.CSTML, "Punctuator", "'")
          }, {}),
          close: _t.s_node(_l.Spamex, "Punctuator", ">")
        }, {})],
        close: _t.s_node(_l.Instruction, "Punctuator", ")")
      }, {})
    }, {})) {
      if (yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node(_l.Instruction, "Identifier", [_t.lit("match")], {}, {}),
        arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node(_l.Instruction, "Punctuator", "("),
          values: [_t.node(_l.Regex, "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node(_l.Regex, "Punctuator", "/"),
            alternatives: [_t.node(_l.Regex, "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node(_l.Regex, "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                element: _t.node(_l.Regex, "DigitCharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.s_node(_l.Regex, "Punctuator", "\\"),
                  value: _t.s_node(_l.Regex, "Keyword", "d")
                }, {}),
                open: _t.s_node(_l.Regex, "Punctuator", "{"),
                min: _t.node(_l.Regex, "Number", [_t.lit("2")], {}, {}),
                close: _t.s_node(_l.Regex, "Punctuator", "}")
              }, {
                min: 2,
                max: undefined,
                greedy: true
              })]
            }, {})],
            close: _t.s_node(_l.Regex, "Punctuator", "/")
          }, {})],
          close: _t.s_node(_l.Instruction, "Punctuator", ")")
        }, {})
      }, {})) {
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
              value: _t.s_node(_l.Instruction, "Keyword", "null")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("open")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eat")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Spamex, "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node(_l.Spamex, "Punctuator", "<"),
              type: _t.node(_l.Spamex, "Identifier", [_t.lit("Digits")], {}, {}),
              close: _t.s_node(_l.Spamex, "Punctuator", ">")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("value")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
        yield _t.node(_l.Instruction, "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node(_l.Instruction, "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node(_l.Instruction, "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.s_t_node(_l.Space, 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node(_l.Instruction, "Punctuator", "("),
            values: [_t.node(_l.Instruction, "Null", [_t.ref`value`], {
              value: _t.s_node(_l.Instruction, "Keyword", "null")
            }, {}), _t.node(_l.CSTML, "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node(_l.CSTML, "Punctuator", "'"),
              content: _t.node(_l.CSTML, "Content", [_t.lit("close")], {}, {}),
              close: _t.s_node(_l.CSTML, "Punctuator", "'")
            }, {})],
            close: _t.s_node(_l.Instruction, "Punctuator", ")")
          }, {})
        }, {});
      }
    }
  }
  *Match() {}
  *Keyword() {}
  *Punctuator() {}
});
