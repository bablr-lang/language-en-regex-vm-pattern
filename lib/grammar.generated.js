import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
import { interpolateString as _interpolateString } from "@bablr/boot-helpers/template";
import { interpolateArray as _interpolateArray } from "@bablr/boot-helpers/template";
import * as _t from "@bablr/boot-helpers/types";
var _dec, _dec2, _initProto;
import { Node, Cover, CoveredBy } from '@bablr/boot-helpers/decorators';
import objectEntries from 'iter-tools-es/methods/object-entries';
import when from 'iter-tools-es/methods/when';
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
export const grammar = (_dec = CoveredBy('CharacterClassElement'), _dec2 = CoveredBy('CharacterClassElement'), class RegexGrammar {
  static {
    [_initProto] = _applyDecs(this, [[Node, 2, "Pattern"], [Node, 2, "Flag"], [Node, 2, "Alternative"], [Cover, 2, "Element"], [Node, 2, "Group"], [Node, 2, "CapturingGroup"], [Node, 2, "Assertion"], [[Node, _dec], 2, "Character"], [Node, 2, "CharacterClass"], [Cover, 2, "CharacterClassElement"], [[Node, _dec2], 2, "CharacterClassRange"], [Node, 2, "CharacterSet"], [Node, 2, "Quantifier"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  *Pattern() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`/`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`/`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Alternatives`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`alternatives`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`/`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Flags`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`flags`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Flags() {
    const flags = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
              element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                elements: [_t.node("Regex", "Character", [_t.lit`g`], {}, {}), _t.node("Regex", "Character", [_t.lit`i`], {}, {}), _t.node("Regex", "Character", [_t.lit`m`], {}, {}), _t.node("Regex", "Character", [_t.lit`s`], {}, {}), _t.node("Regex", "Character", [_t.lit`u`], {}, {}), _t.node("Regex", "Character", [_t.lit`y`], {}, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
              }, {}),
              value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
            }, {
              min: 1,
              max: Infinity
            })]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}) || '';
    if (!unique(flags)) throw new Error('flags must be unique');
    for (const _ of flags) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Flag`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *Flag() {
    const flag = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
              elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                elements: [_t.node("Regex", "Character", [_t.lit`g`], {}, {}), _t.node("Regex", "Character", [_t.lit`i`], {}, {}), _t.node("Regex", "Character", [_t.lit`m`], {}, {}), _t.node("Regex", "Character", [_t.lit`s`], {}, {}), _t.node("Regex", "Character", [_t.lit`u`], {}, {}), _t.node("Regex", "Character", [_t.lit`y`], {}, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
              }, {})]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    return {
      kind: flagsReverse[flag]
    };
  }
  *Alternatives() {
    do {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Alternative`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    } while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`|`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`separators`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}));
  }
  *Alternative() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Elements`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`elements`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Elements() {
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`[elements]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
              negate: _t.node("Regex", "Keyword", [_t.lit`^`], {}, {}),
              elements: [_t.node("Regex", "Character", [_t.lit`|`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
            }, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Element`], {}, {}),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *Element() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Any`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`CharacterClass`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
                  open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
                  fragments: [_t.node("String", "Fragment", [_t.lit`[`], {}, {})],
                  close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
                }, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Group`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
                  open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
                  fragments: [_t.node("String", "Fragment", [_t.lit`(?:`], {}, {})],
                  close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
                }, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Assertion`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.lit`$`], {}, {}), _t.node("Regex", "Character", [_t.lit`^`], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                    }, {})]
                  }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.lit`b`], {}, {})]
                  }, {}), _t.node("Regex", "Alternative", [], {}, {})],
                  separators: [_t.node("Regex", "Punctuator", [_t.lit`|`], {}, {}), _t.node("Regex", "Punctuator", [_t.lit`|`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                    value: _t.node("Regex", "Keyword", [_t.lit`i`], {}, {})
                  }, {
                    kind: "ignoreCase"
                  })]
                }, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`CharacterSet`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {})]
                  }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.lit`d`], {}, {}), _t.node("Regex", "Character", [_t.lit`s`], {}, {}), _t.node("Regex", "Character", [_t.lit`w`], {}, {}), _t.node("Regex", "Character", [_t.lit`p`], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                    }, {})]
                  }, {})],
                  separators: [_t.node("Regex", "Punctuator", [_t.lit`|`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                    value: _t.node("Regex", "Keyword", [_t.lit`i`], {}, {})
                  }, {
                    kind: "ignoreCase"
                  })]
                }, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Character`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`shiftMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Quantifier`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
          properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
            key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
            mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
            value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`*`], {}, {}), _t.node("Regex", "Character", [_t.lit`+`], {}, {}), _t.node("Regex", "Character", [_t.lit`?`], {}, {}), _t.node("Regex", "Character", [_t.lit`{`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Group() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`(?:`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`)`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Alternatives`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`alternatives`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`)`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *CapturingGroup() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`(`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`)`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Alternatives`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`alternatives`], {}, {}),
            closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
          }, {
            isArray: true
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`)`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *Assertion() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`^`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      return {
        kind: 'start'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`$`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      return {
        kind: 'end'
      };
    } else {
      if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Escape`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.esc()], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {}),
            path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
              accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
              value: _t.node("Spamex", "Identifier", [_t.lit`escape`], {}, {})
            }, {
              isArray: false
            }),
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {})) {
        const m = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
          arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
              value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                  elements: [_t.node("Regex", "Character", [_t.lit`b`], {}, {})]
                }, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                  value: _t.node("Regex", "Keyword", [_t.lit`i`], {}, {})
                }, {
                  kind: "ignoreCase"
                })]
              }, {}),
              path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
                accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
                value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
              }, {
                isArray: false
              }),
              close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})
        }, {});
        return {
          kind: 'word',
          negate: m === 'B'
        };
      } else {
        throw new Error('invalid boundary');
      }
    }
  }
  *Character({
    span
  }) {
    const specialPattern = getSpecialPattern(span);
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatchEscape`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
            elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CapturingGroup", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`(`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                elements: [_t.node("Regex", "Character", [_t.lit`u`], {}, {}), _t.node("Regex", "CapturingGroup", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`(`], {}, {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`separator`, _t.ref`max`, _t.ref`close`], {
                      element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                        escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                        value: _t.node("Regex", "Keyword", [_t.lit`d`], {}, {})
                      }, {
                        kind: "digit"
                      }),
                      open: _t.node("Regex", "Punctuator", [_t.lit`{`], {}, {}),
                      min: _t.node("Regex", "Number", [_t.lit`1`], {}, {}),
                      separator: _t.node("Regex", "Punctuator", [_t.lit`,`], {}, {}),
                      max: _t.node("Regex", "Number", [_t.lit`6`], {}, {}),
                      close: _t.node("Regex", "Punctuator", [_t.lit`}`], {}, {})
                    }, {
                      min: "1",
                      max: "6"
                    }), _t.node("Regex", "Character", [_t.esc()], {}, {})]
                  }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                      element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                        escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                        value: _t.node("Regex", "Keyword", [_t.lit`d`], {}, {})
                      }, {
                        kind: "digit"
                      }),
                      open: _t.node("Regex", "Punctuator", [_t.lit`{`], {}, {}),
                      min: _t.node("Regex", "Number", [_t.lit`4`], {}, {}),
                      close: _t.node("Regex", "Punctuator", [_t.lit`}`], {}, {})
                    }, {
                      min: "4",
                      max: undefined
                    })]
                  }, {})],
                  separators: [_t.node("Regex", "Punctuator", [_t.lit`|`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`)`], {}, {})
                }, {})]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                elements: [_t.node("Regex", "Character", [_t.lit`x`], {}, {}), _t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`open`, _t.ref`min`, _t.ref`close`], {
                  element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                    open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                    elements: [_t.node("Regex", "CharacterClassRange", [_t.ref`min`, _t.ref`rangeOperator`, _t.ref`max`], {
                      min: _t.node("Regex", "Character", [_t.lit`0`], {}, {}),
                      rangeOperator: _t.node("Regex", "Punctuator", [_t.lit`-`], {}, {}),
                      max: _t.node("Regex", "Character", [_t.lit`9`], {}, {})
                    }, {}), _t.node("Regex", "CharacterClassRange", [_t.ref`min`, _t.ref`rangeOperator`, _t.ref`max`], {
                      min: _t.node("Regex", "Character", [_t.lit`a`], {}, {}),
                      rangeOperator: _t.node("Regex", "Punctuator", [_t.lit`-`], {}, {}),
                      max: _t.node("Regex", "Character", [_t.lit`f`], {}, {})
                    }, {}), _t.node("Regex", "CharacterClassRange", [_t.ref`min`, _t.ref`rangeOperator`, _t.ref`max`], {
                      min: _t.node("Regex", "Character", [_t.lit`A`], {}, {}),
                      rangeOperator: _t.node("Regex", "Punctuator", [_t.lit`-`], {}, {}),
                      max: _t.node("Regex", "Character", [_t.lit`F`], {}, {})
                    }, {})],
                    close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                  }, {}),
                  open: _t.node("Regex", "Punctuator", [_t.lit`{`], {}, {}),
                  min: _t.node("Regex", "Number", [_t.lit`2`], {}, {}),
                  close: _t.node("Regex", "Punctuator", [_t.lit`}`], {}, {})
                }, {
                  min: "2",
                  max: undefined
                })]
              }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                  elements: [_t.node("Regex", "Character", [_t.lit`n`], {}, {}), _t.node("Regex", "Character", [_t.lit`r`], {}, {}), _t.node("Regex", "Character", [_t.lit`t`], {}, {}), _t.node("Regex", "Character", [_t.lit`0`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                }, {})]
              }, {}), _interpolateArray(specialPattern.source)],
              separators: [_t.node("Regex", "Punctuator", [_t.lit`|`], {}, {}), _t.node("Regex", "Punctuator", [_t.lit`|`], {}, {}), _t.node("Regex", "Punctuator", [_t.lit`|`], {}, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`)`], {}, {})
            }, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      // done
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_interpolateArray(specialPattern)],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      throw new Error('invalid character');
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
            open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
              elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                value: _t.node("Regex", "Keyword", [_t.lit`.`], {}, {})
              }, {
                kind: "any"
              })]
            }, {})],
            close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
            flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
              value: _t.node("Regex", "Keyword", [_t.lit`s`], {}, {})
            }, {
              kind: "dotAll"
            })]
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
  }
  *CharacterClass() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`[`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`startSpan`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`CharacterClass`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {}), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`]`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    let first = !(yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`^`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`negate`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {}));
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
              value: _t.node("Regex", "Keyword", [_t.lit`.`], {}, {})
            }, {
              kind: "any"
            })]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
            value: _t.node("Regex", "Keyword", [_t.lit`s`], {}, {})
          }, {
            kind: "dotAll"
          })]
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`CharacterClassElement`], {}, {}),
            path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`openArrayBracket`, _t.ref`value`, _t.ref`closeArrayBracket`], {
              accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
              openArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`[`], {}, {}),
              value: _t.node("Spamex", "Identifier", [_t.lit`elements`], {}, {}),
              closeArrayBracket: _t.node("Spamex", "Punctuator", [_t.lit`]`], {}, {})
            }, {
              isArray: true
            }),
            close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
          }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.ref`[properties]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
            properties: [_interpolateArray(when(first, _t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
              key: _t.node("Instruction", "Literal", [_t.lit`first`], {}, {}),
              mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
              value: _t.node("Instruction", "Identifier", [_t.lit`true`], {}, {})
            }, {})))],
            close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
      first = false;
    }
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`]`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`endSpan`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`CharacterClass`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {}), _t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *CharacterClassElement({
    props: {
      first
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Any`], {}, {}),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {}), _t.node("Instruction", "Array", [_t.ref`open`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`[elements]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`[`], {}, {}),
          elements: [_t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`CharacterClassRange`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.lit`.`], {}, {})
                    }, {
                      kind: "any"
                    }), _t.node("Regex", "Character", [_t.lit`-`], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                      negate: _t.node("Regex", "Keyword", [_t.lit`^`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "Character", [_t.esc()], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                    }, {})]
                  }, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
                }, {})
              }, {}), _t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`first`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: when(first, _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
                  key: _t.node("Spamex", "Literal", [_t.lit`span`], {}, {}),
                  mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
                  value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
                    open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
                    fragments: [_t.node("String", "Fragment", [_t.lit`CharacterClass:First`], {}, {})],
                    close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
                  }, {})
                }, {}))
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`CharacterSet`], {}, {}),
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {}), _t.node("Instruction", "Object", [_t.ref`open`, _t.trivia` `, _t.ref`[properties]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Instruction", "Punctuator", [_t.lit`{`], {}, {}),
              properties: [_t.node("Instruction", "Property", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Instruction", "Literal", [_t.lit`guard`], {}, {}),
                mapOperator: _t.node("Instruction", "Punctuator", [_t.lit`:`], {}, {}),
                value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`[separators]`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
                  open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {})]
                  }, {}), _t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "Character", [_t.esc()], {}, {}), _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                      open: _t.node("Regex", "Punctuator", [_t.lit`[`], {}, {}),
                      elements: [_t.node("Regex", "Character", [_t.lit`d`], {}, {}), _t.node("Regex", "Character", [_t.lit`s`], {}, {}), _t.node("Regex", "Character", [_t.lit`w`], {}, {}), _t.node("Regex", "Character", [_t.lit`p`], {}, {})],
                      close: _t.node("Regex", "Punctuator", [_t.lit`]`], {}, {})
                    }, {})]
                  }, {})],
                  separators: [_t.node("Regex", "Punctuator", [_t.lit`|`], {}, {})],
                  close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                  flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                    value: _t.node("Regex", "Keyword", [_t.lit`i`], {}, {})
                  }, {
                    kind: "ignoreCase"
                  })]
                }, {})
              }, {})],
              close: _t.node("Instruction", "Punctuator", [_t.lit`}`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {}), _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Character`], {}, {}),
              attributes: [_interpolateArray(first)],
              close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`]`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *CharacterClassRange({
    props: {
      first = false
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Character`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`min`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_interpolateArray(when(first, _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`span`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`CharacterClass:First`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})))],
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`-`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`rangeOperator`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Character`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`max`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
  }
  *CharacterSet() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`.`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      return {
        kind: 'any'
      };
    }
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.esc()], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`escape`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    let attrs;
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`d`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        kind: 'digit'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`D`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        kind: 'digit',
        negate: true
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`s`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        kind: 'space'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`S`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        kind: 'space',
        negate: true
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`w`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        kind: 'word'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`W`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        kind: 'word',
        negate: true
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`match`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
          open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "Character", [_t.lit`p`], {}, {})]
          }, {})],
          close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
          flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
            value: _t.node("Regex", "Keyword", [_t.lit`i`], {}, {})
          }, {
            kind: "ignoreCase"
          })]
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      throw new Error('unicode property character sets are not supported yet');
    } else {
      throw new Error('unknown character set kind');
    }
    return {
      attrs
    };
  }
  *Quantifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatHeld`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`path`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Element`], {}, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`element`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {});
    let attrs;
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`*`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        min: 0,
        max: Infinity
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`+`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        min: 1,
        max: Infinity
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Keyword`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`?`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`value`], {}, {})
          }, {
            isArray: false
          }),
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      attrs = {
        min: 0,
        max: 1
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
      verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
      arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
        open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
        values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
          type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
          value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
            open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
            fragments: [_t.node("String", "Fragment", [_t.lit`{`], {}, {})],
            close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
          }, {}),
          path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
            accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
            value: _t.node("Spamex", "Identifier", [_t.lit`open`], {}, {})
          }, {
            isArray: false
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.lit`balanced`], {}, {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.lit`=`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`}`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {})
          }, {})],
          close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
        }, {})],
        close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
      }, {})
    }, {})) {
      let max;
      let min = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Number`], {}, {}),
            value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                  element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                    escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                    value: _t.node("Regex", "Keyword", [_t.lit`d`], {}, {})
                  }, {
                    kind: "digit"
                  }),
                  value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
                }, {
                  min: 1,
                  max: Infinity
                })]
              }, {})],
              close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {})
            }, {}),
            path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
              accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
              value: _t.node("Spamex", "Identifier", [_t.lit`min`], {}, {})
            }, {
              isArray: false
            }),
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
      if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`,`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {}),
            path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
              accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
              value: _t.node("Spamex", "Identifier", [_t.lit`separator`], {}, {})
            }, {
              isArray: false
            }),
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {})) {
        max = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
          verb: _t.node("Instruction", "Identifier", [_t.lit`eatMatch`], {}, {}),
          arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
            open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
            values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
              type: _t.node("Spamex", "Identifier", [_t.lit`Number`], {}, {}),
              value: _t.node("Regex", "Pattern", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`[flags]`], {
                open: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                  elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                    element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                      escape: _t.node("Regex", "Punctuator", [_t.lit`\\`], {}, {}),
                      value: _t.node("Regex", "Keyword", [_t.lit`d`], {}, {})
                    }, {
                      kind: "digit"
                    }),
                    value: _t.node("Regex", "Keyword", [_t.lit`+`], {}, {})
                  }, {
                    min: 1,
                    max: Infinity
                  })]
                }, {})],
                close: _t.node("Regex", "Punctuator", [_t.lit`/`], {}, {}),
                flags: [_t.node("Regex", "Flag", [_t.ref`value`], {
                  value: _t.node("Regex", "Keyword", [_t.lit`y`], {}, {})
                }, {
                  kind: "sticky"
                })]
              }, {}),
              path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
                accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
                value: _t.node("Spamex", "Identifier", [_t.lit`max`], {}, {})
              }, {
                isArray: false
              }),
              close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
            }, {})],
            close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
          }, {})
        }, {});
      }
      attrs = {
        min,
        max
      };
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`arguments`], {
        verb: _t.node("Instruction", "Identifier", [_t.lit`eat`], {}, {}),
        arguments: _t.node("Instruction", "Tuple", [_t.ref`open`, _t.ref`[values]`, _t.ref`close`], {
          open: _t.node("Instruction", "Punctuator", [_t.lit`(`], {}, {}),
          values: [_t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`path`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.lit`<|`], {}, {}),
            type: _t.node("Spamex", "Identifier", [_t.lit`Punctuator`], {}, {}),
            value: _t.node("String", "String", [_t.ref`open`, _t.ref`[fragments]`, _t.ref`close`], {
              open: _t.node("String", "Punctuator", [_t.lit`'`], {}, {}),
              fragments: [_t.node("String", "Fragment", [_t.lit`}`], {}, {})],
              close: _t.node("String", "Punctuator", [_t.lit`'`], {}, {})
            }, {}),
            path: _t.node("Spamex", "Path", [_t.ref`accessOperator`, _t.ref`value`], {
              accessOperator: _t.node("Spamex", "Punctuator", [_t.lit`.`], {}, {}),
              value: _t.node("Spamex", "Identifier", [_t.lit`close`], {}, {})
            }, {
              isArray: false
            }),
            attributes: [_t.node("Spamex", "BooleanAttribute", [_t.ref`key`], {
              key: _t.node("Spamex", "Literal", [_t.lit`balancer`], {}, {})
            }, {})],
            close: _t.node("Spamex", "Punctuator", [_t.lit`|>`], {}, {})
          }, {})],
          close: _t.node("Instruction", "Punctuator", [_t.lit`)`], {}, {})
        }, {})
      }, {});
    }
    return {
      attrs
    };
  }
});
