import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/agast-helpers/template";
import { interpolateArrayChildren as _interpolateArrayChildren } from "@bablr/agast-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/agast-helpers/template";
import * as _t from "@bablr/agast-helpers/shorthand";
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _initProto;
import { Node, CoveredBy, InjectFrom, Attributes } from '@bablr/helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import when from 'iter-tools-es/methods/when';
import * as Shared from '@bablr/helpers/productions';
import { getCooked } from '@bablr/agast-helpers/stream';
export const name = 'Regex';
export const dependencies = {};
const escapables = new Map(objectEntries({
  n: '\n'.codePointAt(0),
  r: '\r'.codePointAt(0),
  t: '\t'.codePointAt(0),
  0: '\0'.codePointAt(0)
}));
export const cookEscape = (escape, span) => {
  let hexMatch;
  if (!escape.startsWith('\\')) {
    throw new Error('regex escape must start with \\');
  }
  if (hexMatch = /\\x([0-9a-f]{2})/iy.exec(escape)) {
    // continue
  } else if (hexMatch = /\\u([0-9a-f]{4})/iy.exec(escape)) {
    // continue
  } else if (hexMatch = /\\u{([0-9a-f]+)}/iy.exec(escape)) {
    // continue
  }
  if (hexMatch) {
    return parseInt(hexMatch[1], 16);
  }
  let litMatch = /\\([nrt0])/y.exec(escape);
  if (litMatch) {
    return escapables.get(litMatch[1]);
  }
  let specialMatch = getSpecialPattern(span).exec(escape.slice(1));
  if (specialMatch) {
    return specialMatch[0];
  }
  throw new Error('unable to cook escape');
};
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
  const {
    type
  } = span;
  if (type === 'Bare') {
    return /[*+{}[\]()\.^$|\\\n]/y;
  } else if (type === 'CharacterClass') {
    return /[\]\\\.]/y;
  } else if (type === 'CharacterClass:First') {
    return /[\]^\\\.]/y;
  } else if (type === 'Quantifier') {
    return /[{}]/;
  } else {
    throw new Error();
  }
};
export const grammar = (_dec = CoveredBy('Assertion'), _dec2 = CoveredBy('Assertion'), _dec3 = Attributes('negate'), _dec4 = CoveredBy('Assertion'), _dec5 = CoveredBy('CharacterClassElement'), _dec6 = CoveredBy('CharacterClassElement'), _dec7 = CoveredBy('CharacterSet'), _dec8 = CoveredBy('CharacterSet'), _dec9 = CoveredBy('CharacterSet'), _dec10 = CoveredBy('CharacterSet'), _dec11 = InjectFrom(Shared), _dec12 = InjectFrom(Shared), _dec13 = InjectFrom(Shared), class RegexGrammar {
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "Pattern"], [Node, 2, "Flag"], [Node, 2, "Alternative"], [Node, 2, "Group"], [Node, 2, "CapturingGroup"], [[_dec, Node], 2, "StartOfInputAssertion"], [[_dec2, Node], 2, "EndOfInputAssertion"], [[_dec3, _dec4, Node], 2, "WordBoundaryAssertion"], [[Node, _dec5], 2, "Character"], [Node, 2, "CharacterClass"], [[Node, _dec6], 2, "CharacterClassRange"], [[_dec7, Node], 2, "AnyCharacterSet"], [[_dec8, Node], 2, "DigitCharacterSet"], [[_dec9, Node], 2, "SpaceCharacterSet"], [[_dec10, Node], 2, "WordCharacterSet"], [Node, 2, "Quantifier"], [Node, 2, "Number"], [_dec11, 2, "Match"], [_dec12, 2, "Keyword"], [_dec13, 2, "Punctuator"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *Pattern() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("/")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("/")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Alternatives")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("alternatives[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("/")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Flags")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("flags")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Flags() {
    const flags = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node("Regex", "Punctuator", "["),
                elements: [_t.node("Regex", "Character", [_t.lit("g")], {}, {}), _t.node("Regex", "Character", [_t.lit("i")], {}, {}), _t.node("Regex", "Character", [_t.lit("m")], {}, {}), _t.node("Regex", "Character", [_t.lit("s")], {}, {}), _t.node("Regex", "Character", [_t.lit("u")], {}, {}), _t.node("Regex", "Character", [_t.lit("y")], {}, {})],
                close: _t.s_node("Regex", "Punctuator", "]")
              }, {}),
              value: _t.s_node("Regex", "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}) || '';
    if (!unique(flags)) throw new Error('flags must be unique');
    for (const _ of flags) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("Flag")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Flag() {
    const flag = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node("Regex", "Punctuator", "/"),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node("Regex", "Punctuator", "["),
                elements: [_t.node("Regex", "Character", [_t.lit("g")], {}, {}), _t.node("Regex", "Character", [_t.lit("i")], {}, {}), _t.node("Regex", "Character", [_t.lit("m")], {}, {}), _t.node("Regex", "Character", [_t.lit("s")], {}, {}), _t.node("Regex", "Character", [_t.lit("u")], {}, {}), _t.node("Regex", "Character", [_t.lit("y")], {}, {})],
                close: _t.s_node("Regex", "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node("Regex", "Punctuator", "/")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    return {
      kind: flagsReverse[flag]
    };
  }
  *Alternatives() {
    do {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("Alternative")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    } while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("|")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("separators")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}));
  }
  *Alternative() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Elements")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("elements")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Elements() {
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "["),
              negate: _t.s_node("Regex", "Keyword", "^"),
              elements: [_t.node("Regex", "Character", [_t.lit("|")], {}, {})],
              close: _t.s_node("Regex", "Punctuator", "]")
            }, {})]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("Element")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *Element() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("CharacterClass")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("[")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Group")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("(?:")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Assertion")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("$")], {}, {}), _t.node("Regex", "Character", [_t.lit("^")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "Character", [_t.lit("b")], {}, {})]
              }, {}), _t.node("Regex", "Alternative", [], {}, {})],
              separators: [_t.s_node("Regex", "Punctuator", "|"), _t.s_node("Regex", "Punctuator", "|")],
              close: _t.s_node("Regex", "Punctuator", "/"),
              flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                value: _t.s_node("Regex", "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("CharacterSet")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\."
                }], {}, {
                  cooked: "."
                }))], {}, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("d")], {}, {}), _t.node("Regex", "Character", [_t.lit("s")], {}, {}), _t.node("Regex", "Character", [_t.lit("w")], {}, {}), _t.node("Regex", "Character", [_t.lit("p")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              separators: [_t.s_node("Regex", "Punctuator", "|")],
              close: _t.s_node("Regex", "Punctuator", "/"),
              flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                value: _t.s_node("Regex", "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Character")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    return _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("shiftMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Quantifier")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Group() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("(?:")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit(")")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Alternatives")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("alternatives[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(")")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *CapturingGroup() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("(")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit(")")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Alternatives")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("alternatives[]")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(")")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Assertion() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n    "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
                syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
              }, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit("StartOfInputAssertion")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("^")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
                syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
              }, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit("EndOfInputAssertion")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("$")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`, _t.ref`escapeFlag`], {
                syntacticFlag: _t.s_node("Spamex", "Punctuator", "*"),
                escapeFlag: _t.s_node("Spamex", "Punctuator", "@")
              }, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit("WordBoundaryAssertion")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "Character", [_t.lit("b")], {}, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/"),
              flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                value: _t.s_node("Regex", "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *StartOfInputAssertion() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("^")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *EndOfInputAssertion() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("$")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *WordBoundaryAssertion(props, s, ctx) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    const m = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
            open: _t.s_node("Regex", "Punctuator", "/"),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "Character", [_t.lit("b")], {}, {})]
            }, {})],
            close: _t.s_node("Regex", "Punctuator", "/"),
            flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
              value: _t.s_node("Regex", "Keyword", "i")
            }, {
              kind: "ignoreCase"
            })]
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(ctx.getCooked(m) === 'B', _t.ref`values[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {}), ..._interpolateArray(ctx.getCooked(m) === 'B')],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Character({
    span
  }) {
    const specialPattern = getSpecialPattern(span);
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatchEscape")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: "\n        "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: "\n      "
      }], {}, [])), _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
            elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}), _t.node("Regex", "CapturingGroup", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`separators[]`, ..._interpolateArrayChildren(specialPattern.source, _t.ref`alternatives[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "("),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("u")], {}, {}), _t.node("Regex", "CapturingGroup", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "("),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                    elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                      type: "Literal",
                      value: "\\{"
                    }], {}, {
                      cooked: "{"
                    }))], {}, {}), _t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`separator`, _t.ref`max`, _t.ref`close`], {
                      element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                        escape: _t.s_node("Regex", "Punctuator", "\\"),
                        value: _t.s_node("Regex", "Keyword", "d")
                      }, {
                        kind: "digit"
                      }),
                      open: _t.s_node("Regex", "Punctuator", "{"),
                      min: _t.node("Regex", "Number", [_t.lit("1")], {}, {}),
                      separator: _t.s_node("Regex", "Punctuator", ","),
                      max: _t.node("Regex", "Number", [_t.lit("6")], {}, {}),
                      close: _t.s_node("Regex", "Punctuator", "}")
                    }, {
                      min: 1,
                      max: 6,
                      greedy: true
                    }), _t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                      type: "Literal",
                      value: "\\}"
                    }], {}, {
                      cooked: "}"
                    }))], {}, {})]
                  }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                    elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                      element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                        escape: _t.s_node("Regex", "Punctuator", "\\"),
                        value: _t.s_node("Regex", "Keyword", "d")
                      }, {
                        kind: "digit"
                      }),
                      open: _t.s_node("Regex", "Punctuator", "{"),
                      min: _t.node("Regex", "Number", [_t.lit("4")], {}, {}),
                      close: _t.s_node("Regex", "Punctuator", "}")
                    }, {
                      min: 4,
                      max: undefined,
                      greedy: true
                    })]
                  }, {})],
                  separators: [_t.s_node("Regex", "Punctuator", "|")],
                  close: _t.s_node("Regex", "Punctuator", ")")
                }, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.lit("x")], {}, {}), _t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                  element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                    open: _t.s_node("Regex", "Punctuator", "["),
                    elements: [_t.node("Regex", "CharacterClassRange", [_t.ref`min`, _t.ref`rangeOperator`, _t.ref`max`], {
                      min: _t.node("Regex", "Character", [_t.lit("0")], {}, {}),
                      rangeOperator: _t.s_node("Regex", "Punctuator", "-"),
                      max: _t.node("Regex", "Character", [_t.lit("9")], {}, {})
                    }, {}), _t.node("Regex", "CharacterClassRange", [_t.ref`min`, _t.ref`rangeOperator`, _t.ref`max`], {
                      min: _t.node("Regex", "Character", [_t.lit("a")], {}, {}),
                      rangeOperator: _t.s_node("Regex", "Punctuator", "-"),
                      max: _t.node("Regex", "Character", [_t.lit("f")], {}, {})
                    }, {}), _t.node("Regex", "CharacterClassRange", [_t.ref`min`, _t.ref`rangeOperator`, _t.ref`max`], {
                      min: _t.node("Regex", "Character", [_t.lit("A")], {}, {}),
                      rangeOperator: _t.s_node("Regex", "Punctuator", "-"),
                      max: _t.node("Regex", "Character", [_t.lit("F")], {}, {})
                    }, {})],
                    close: _t.s_node("Regex", "Punctuator", "]")
                  }, {}),
                  open: _t.s_node("Regex", "Punctuator", "{"),
                  min: _t.node("Regex", "Number", [_t.lit("2")], {}, {}),
                  close: _t.s_node("Regex", "Punctuator", "}")
                }, {
                  min: 2,
                  max: undefined,
                  greedy: true
                })]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("n")], {}, {}), _t.node("Regex", "Character", [_t.lit("r")], {}, {}), _t.node("Regex", "Character", [_t.lit("t")], {}, {}), _t.node("Regex", "Character", [_t.lit("0")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {}), ..._interpolateArray(specialPattern.source)],
              separators: [_t.s_node("Regex", "Punctuator", "|"), _t.s_node("Regex", "Punctuator", "|"), _t.s_node("Regex", "Punctuator", "|")],
              close: _t.s_node("Regex", "Punctuator", ")")
            }, {})]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      // done
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, ..._interpolateArrayChildren(specialPattern, _t.ref`values[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [..._interpolateArray(specialPattern)],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      throw new Error('invalid character');
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
            open: _t.s_node("Regex", "Punctuator", "/"),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                value: _t.s_node("Regex", "Keyword", ".")
              }, {
                kind: "any"
              })]
            }, {})],
            close: _t.s_node("Regex", "Punctuator", "/"),
            flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
              value: _t.s_node("Regex", "Keyword", "s")
            }, {
              kind: "dotAll"
            })]
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    }
  }
  *CharacterClass() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("[")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("startSpan")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("CharacterClass")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {}), _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("]")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    let first = !(yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("^")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {}));
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("match")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
              value: _t.s_node("Regex", "Keyword", ".")
            }, {
              kind: "any"
            })]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/"),
          flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
            value: _t.s_node("Regex", "Keyword", "s")
          }, {
            kind: "dotAll"
          })]
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("CharacterClassElement")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("elements[]")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}), _t.node("Instruction", "Object", [_t.ref`open`, ..._interpolateArrayChildren(when(first, [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`], {
            key: _t.node("Instruction", "Literal", [_t.lit("first")], {}, {}),
            mapOperator: _t.s_node("Instruction", "Punctuator", ":"),
            value: _t.node("Instruction", "Boolean", [_t.ref`value`], {
              value: _t.s_node("Instruction", "Keyword", "true")
            }, {})
          }, {})]), _t.ref`properties[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "{"),
            properties: [..._interpolateArray(when(first, [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`value`], {
              key: _t.node("Instruction", "Literal", [_t.lit("first")], {}, {}),
              mapOperator: _t.s_node("Instruction", "Punctuator", ":"),
              value: _t.node("Instruction", "Boolean", [_t.ref`value`], {
                value: _t.s_node("Instruction", "Keyword", "true")
              }, {})
            }, {})]))],
            close: _t.s_node("Instruction", "Punctuator", "}")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
      first = false;
    }
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("]")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("endSpan")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("CharacterClass")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {}), _t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *CharacterClassElement({
    props: {
      first
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Any")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n        "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("CharacterClassRange")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                  value: _t.s_node("Regex", "Keyword", ".")
                }, {
                  kind: "any"
                }), _t.node("Regex", "Character", [_t.lit("-")], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  negate: _t.s_node("Regex", "Keyword", "^"),
                  elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                    type: "Literal",
                    value: "\\]"
                  }], {}, {
                    cooked: "]"
                  }))], {}, {}), _t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                    type: "Literal",
                    value: "\\n"
                  }], {}, {
                    cooked: "\n"
                  }))], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`properties[]`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), _t.ref`close`], {
              open: _t.s_node("Instruction", "Punctuator", "{"),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.embedded(_t.t_node('Space', 'Space', [{
                type: "Literal",
                value: " "
              }], {}, [])), _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit("first")], {}, {}),
                mapOperator: _t.s_node("Instruction", "Punctuator", ":"),
                value: first
              }, {})],
              close: _t.s_node("Instruction", "Punctuator", "}")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("CharacterSet")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`separators[]`, _t.ref`alternatives[]`, _t.ref`close`, _t.ref`flags[]`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\."
                }], {}, {
                  cooked: "."
                }))], {}, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("d")], {}, {}), _t.node("Regex", "Character", [_t.lit("s")], {}, {}), _t.node("Regex", "Character", [_t.lit("w")], {}, {}), _t.node("Regex", "Character", [_t.lit("p")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              separators: [_t.s_node("Regex", "Punctuator", "|")],
              close: _t.s_node("Regex", "Punctuator", "/"),
              flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                value: _t.s_node("Regex", "Keyword", "i")
              }, {
                kind: "ignoreCase"
              })]
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
              type: "Literal",
              value: " "
            }], {}, [])), ..._interpolateArrayChildren(when(first, _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.lit("span")], {}, {}),
              mapOperator: _t.s_node("Spamex", "Punctuator", "="),
              value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                open: _t.s_node("String", "Punctuator", "'"),
                content: _t.node("String", "Content", [_t.lit("CharacterClass:First")], {}, {}),
                close: _t.s_node("String", "Punctuator", "'")
              }, {})
            }, {})), _t.ref`attributes[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Character")], {}, {}),
              attributes: [..._interpolateArray(when(first, _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.lit("span")], {}, {}),
                mapOperator: _t.s_node("Spamex", "Punctuator", "="),
                value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
                  open: _t.s_node("String", "Punctuator", "'"),
                  content: _t.node("String", "Content", [_t.lit("CharacterClass:First")], {}, {}),
                  close: _t.s_node("String", "Punctuator", "'")
                }, {})
              }, {})))],
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *CharacterClassRange({
    props: {
      first = false
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), ..._interpolateArrayChildren(when(first, _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.lit("span")], {}, {}),
          mapOperator: _t.s_node("Spamex", "Punctuator", "="),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("CharacterClass:First")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {})
        }, {})), _t.ref`attributes[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Character")], {}, {}),
          attributes: [..._interpolateArray(when(first, _t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("span")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("CharacterClass:First")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})))],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("min")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("-")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("rangeOperator")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Character")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("max")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *CharacterSet() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Match")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("Instruction", "Null", [_t.ref`value`], {
          value: _t.s_node("Instruction", "Keyword", "null")
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n      "
        }], {}, [])), _t.ref`elements[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: "\n    "
        }], {}, [])), _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "["),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("AnyCharacterSet")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit(".")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("DigitCharacterSet")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("d")], {}, {}), _t.node("Regex", "Character", [_t.lit("D")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("SpaceCharacterSet")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("s")], {}, {}), _t.node("Regex", "Character", [_t.lit("S")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("WordCharacterSet")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
              open: _t.s_node("Regex", "Punctuator", "/"),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`, _t.ref`elements[]`], {
                elements: [_t.node("Regex", "Character", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
                  type: "Literal",
                  value: "\\\\"
                }], {}, {
                  cooked: "\\"
                }))], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                  open: _t.s_node("Regex", "Punctuator", "["),
                  elements: [_t.node("Regex", "Character", [_t.lit("w")], {}, {}), _t.node("Regex", "Character", [_t.lit("W")], {}, {})],
                  close: _t.s_node("Regex", "Punctuator", "]")
                }, {})]
              }, {})],
              close: _t.s_node("Regex", "Punctuator", "/")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", "]")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *AnyCharacterSet() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit(".")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *DigitCharacterSet() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    let code = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node("Regex", "Punctuator", "/"),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node("Regex", "Punctuator", "["),
                elements: [_t.node("Regex", "Character", [_t.lit("d")], {}, {}), _t.node("Regex", "Character", [_t.lit("D")], {}, {})],
                close: _t.s_node("Regex", "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node("Regex", "Punctuator", "/")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(getCooked(code) === 'D', _t.ref`values[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {}), ..._interpolateArray(getCooked(code) === 'D')],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *SpaceCharacterSet() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    let code = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node("Regex", "Punctuator", "/"),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node("Regex", "Punctuator", "["),
                elements: [_t.node("Regex", "Character", [_t.lit("s")], {}, {}), _t.node("Regex", "Character", [_t.lit("S")], {}, {})],
                close: _t.s_node("Regex", "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node("Regex", "Punctuator", "/")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(getCooked(code) === 'S', _t.ref`values[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {}), ..._interpolateArray(getCooked(code) === 'S')],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *WordCharacterSet() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.embedded(_t.s_e_node('Escape', 'SymbolicEscape', [{
              type: "Literal",
              value: "\\\\"
            }], {}, {
              cooked: "\\"
            }))], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("escape")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    let code = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
            open: _t.s_node("Regex", "Punctuator", "/"),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
              elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`elements[]`, _t.ref`elements[]`, _t.ref`close`], {
                open: _t.s_node("Regex", "Punctuator", "["),
                elements: [_t.node("Regex", "Character", [_t.lit("w")], {}, {}), _t.node("Regex", "Character", [_t.lit("W")], {}, {})],
                close: _t.s_node("Regex", "Punctuator", "]")
              }, {})]
            }, {})],
            close: _t.s_node("Regex", "Punctuator", "/")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("bindAttribute")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), ..._interpolateArrayChildren(getCooked(code) === 'W', _t.ref`values[]`, t.t_node('Comment', null, [t.t_node('Space', 'Space', [t.lit(' ')])])), _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("negate")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {}), ..._interpolateArray(getCooked(code) === 'W')],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Quantifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatHeld")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          type: _t.node("Spamex", "Identifier", [_t.lit("Element")], {}, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("element")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
    let attrs;
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("*")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      attrs = {
        min: 0,
        max: Infinity
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("+")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      attrs = {
        min: 1,
        max: Infinity
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Keyword")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("?")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("value")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      attrs = {
        min: 0,
        max: 1
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
        type: "Literal",
        value: " "
      }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
          open: _t.s_node("Spamex", "Punctuator", "<"),
          flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
            syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
          }, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("{")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {}),
          attributes: [_t.node("Spamex", "MappingAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit("balanced")], {}, {}),
            mapOperator: _t.s_node("Spamex", "Punctuator", "="),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("}")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})
          }, {})],
          close: _t.s_node("Spamex", "Punctuator", ">")
        }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
          open: _t.s_node("String", "Punctuator", "'"),
          content: _t.node("String", "Content", [_t.lit("open")], {}, {}),
          close: _t.s_node("String", "Punctuator", "'")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {})) {
      let max;
      let min = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            type: _t.node("Spamex", "Identifier", [_t.lit("Number")], {}, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("min")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
      if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
              syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
            }, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit(",")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {}),
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("separator")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {})) {
        max = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node("Instruction", "Identifier", [_t.lit("eatMatch")], {}, {}),
          arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
            open: _t.s_node("Instruction", "Punctuator", "("),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.s_node("Spamex", "Punctuator", "<"),
              type: _t.node("Spamex", "Identifier", [_t.lit("Number")], {}, {}),
              close: _t.s_node("Spamex", "Punctuator", ">")
            }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("max")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {})],
            close: _t.s_node("Instruction", "Punctuator", ")")
          }, {})
        }, {});
      }
      attrs = {
        min,
        max
      };
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.embedded(_t.t_node('Space', 'Space', [{
          type: "Literal",
          value: " "
        }], {}, [])), _t.ref`values[]`, _t.ref`close`], {
          open: _t.s_node("Instruction", "Punctuator", "("),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`flags`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`type`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`value`, _t.embedded(_t.t_node('Space', 'Space', [{
            type: "Literal",
            value: " "
          }], {}, [])), _t.ref`attributes[]`, _t.ref`close`], {
            open: _t.s_node("Spamex", "Punctuator", "<"),
            flags: _t.node("Spamex", "NodeFlags", [_t.ref`syntacticFlag`], {
              syntacticFlag: _t.s_node("Spamex", "Punctuator", "*")
            }, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit("Punctuator")], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
              open: _t.s_node("String", "Punctuator", "'"),
              content: _t.node("String", "Content", [_t.lit("}")], {}, {}),
              close: _t.s_node("String", "Punctuator", "'")
            }, {}),
            attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
              key: _t.node("Spamex", "Literal", [_t.lit("balancer")], {}, {})
            }, {})],
            close: _t.s_node("Spamex", "Punctuator", ">")
          }, {}), _t.node("String", "String", [_t.ref`open`, _t.ref`content`, _t.ref`close`], {
            open: _t.s_node("String", "Punctuator", "'"),
            content: _t.node("String", "Content", [_t.lit("close")], {}, {}),
            close: _t.s_node("String", "Punctuator", "'")
          }, {})],
          close: _t.s_node("Instruction", "Punctuator", ")")
        }, {})
      }, {});
    }
    return {
      attrs
    };
  }
  *Number() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit("eat")], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`values[]`, _t.ref`close`], {
        open: _t.s_node("Instruction", "Punctuator", "("),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`alternatives[]`, _t.ref`close`], {
          open: _t.s_node("Regex", "Punctuator", "/"),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`elements[]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                escape: _t.s_node("Regex", "Punctuator", "\\"),
                value: _t.s_node("Regex", "Keyword", "d")
              }, {
                kind: "digit"
              }),
              value: _t.s_node("Regex", "Keyword", "+")
            }, {
              min: 1,
              max: Infinity,
              greedy: true
            })]
          }, {})],
          close: _t.s_node("Regex", "Punctuator", "/")
        }, {})],
        close: _t.s_node("Instruction", "Punctuator", ")")
      }, {})
    }, {});
  }
  *Match() {}
  *Keyword() {}
  *Punctuator() {}
});
