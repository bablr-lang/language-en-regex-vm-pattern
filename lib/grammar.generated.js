import _applyDecs from "@babel/runtime/helpers/applyDecs2305";
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
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`/`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Alternatives`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[alternatives]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`/`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Flags`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[flags]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Flags() {
    const flags = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
            element: _t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.str`[`], {}),
              elements: [_t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {})],
              close: _t.node("Regex", "Punctuator", [_t.str`]`], {})
            }),
            value: _t.node("Regex", "Keyword", [_t.str`+`], {})
          })]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    }) || '';
    if (!unique(flags)) throw new Error('flags must be unique');
    for (const _ of flags) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Flag`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    }
  }
  *Flag() {
    const flag = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
              open: _t.node("Regex", "Punctuator", [_t.str`[`], {}),
              elements: [_t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {}), _t.node("Regex", "Character", [_t.str`g`], {})],
              close: _t.node("Regex", "Punctuator", [_t.str`]`], {})
            })]
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    return {
      kind: flagsReverse[flag]
    };
  }
  *Alternatives() {
    do {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Alternative`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    } while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`|`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[separators]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    }));
  }
  *Alternative() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Elements`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[elements]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Elements() {
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`negate`, _t.ref`[elements]`, _t.ref`close`], {
            open: _t.node("Regex", "Punctuator", [_t.str`[`], {}),
            negate: _t.node("Regex", "Keyword", [_t.str`^`], {}),
            elements: [_t.node("Regex", "Character", [_t.str`|`], {})],
            close: _t.node("Regex", "Punctuator", [_t.str`]`], {})
          })]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Element`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    }
  }
  *Element() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Any`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClass`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClass`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClass`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClass`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClass`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                  value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
                  close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
                })
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`shiftMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Quantifier`], {}),
        props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
          values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
            value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                elements: [_t.node("Regex", "CharacterClass", [_t.ref`open`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`, _t.ref`close`], {
                  open: _t.node("Regex", "Punctuator", [_t.str`[`], {}),
                  elements: [_t.node("Regex", "Character", [_t.str`*`], {}), _t.node("Regex", "Character", [_t.str`*`], {}), _t.node("Regex", "Character", [_t.str`*`], {}), _t.node("Regex", "Character", [_t.str`*`], {})],
                  close: _t.node("Regex", "Punctuator", [_t.str`]`], {})
                })]
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Group() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`(?:`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Alternatives`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[alternatives]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`)`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *CapturingGroup() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`(`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Alternatives`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`[alternatives]`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`)`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *Assertion() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`^`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      return {
        kind: 'start'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`$`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      return {
        kind: 'end'
      };
    } else {
      if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Escape`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`\\\\`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`escape`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      })) {
        const m = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
          verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
          open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
          argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
            value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                elements: [_t.node("Regex", "Character", [_t.str`b`], {})]
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
              flags: _t.node("Regex", "Flag", [_t.ref`value`], {
                value: _t.node("Regex", "Keyword", [_t.str`i`], {})
              })
            }),
            attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
              value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
                close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
              })
            })],
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }),
          close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
        });
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
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.trivia` `, _t.ref`argument`, _t.trivia` `, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatchEscape`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`], {
          elements: [_t.node("Regex", "Character", [_t.esc()], {}), _t.node("Regex", "Character", [_t.esc()], {})]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      // done
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.gap`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: specialPattern,
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      throw new Error('invalid character');
    } else {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
            elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
              value: _t.node("Regex", "Keyword", [_t.str`.`], {})
            })]
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
          flags: _t.node("Regex", "Flag", [_t.ref`value`], {
            value: _t.node("Regex", "Keyword", [_t.str`s`], {})
          })
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    }
  }
  *CharacterClass() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`[`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    let first = !(yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`^`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`negate`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    }));
    while (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
            value: _t.node("Regex", "Keyword", [_t.str`.`], {})
          })]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        flags: _t.node("Regex", "Flag", [_t.ref`value`], {
          value: _t.node("Regex", "Keyword", [_t.str`s`], {})
        })
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`CharacterClassElement`], {}),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`[elements]`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.gap`[values]`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
            values: [when(first, _t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.str`first`], {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
              value: _t.node("Spamex", "Boolean", [_t.ref`value`], {
                value: _t.node("Spamex", "Keyword", [_t.str`true`], {})
              })
            }))],
            close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
          }),
          close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      first = false;
    }
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`]`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *CharacterClassElement({
    props: {
      first
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Any`], {}),
        props: _t.node("Spamex", "MatchablesArrayProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`{[`], {}),
          values: [_t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClassRange`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.ref`[separators]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    })]
                  })],
                  close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
                })
              }), _t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    })]
                  })],
                  close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
                })
              })],
              separators: [_t.node("Spamex", "Punctuator", [_t.str`,`], {})],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClassRange`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.ref`[separators]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    })]
                  })],
                  close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
                })
              }), _t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    })]
                  })],
                  close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
                })
              })],
              separators: [_t.node("Spamex", "Punctuator", [_t.str`,`], {})],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          }), _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`props`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`CharacterClassRange`], {}),
            props: _t.node("Spamex", "ObjectProps", [_t.ref`open`, _t.trivia` `, _t.ref`[values]`, _t.ref`[separators]`, _t.trivia` `, _t.ref`[values]`, _t.trivia` `, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`{`], {}),
              values: [_t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    })]
                  })],
                  close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
                })
              }), _t.node("Spamex", "Argument", [_t.ref`key`, _t.ref`mapOperator`, _t.trivia` `, _t.ref`value`], {
                key: _t.node("Spamex", "Literal", [_t.str`guard`], {}),
                mapOperator: _t.node("Spamex", "Punctuator", [_t.str`:`], {}),
                value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
                  open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
                  alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`, _t.ref`[elements]`, _t.ref`[elements]`], {
                    elements: [_t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    }), _t.node("Regex", "CharacterSet", [_t.ref`value`], {
                      value: _t.node("Regex", "Keyword", [_t.str`.`], {})
                    })]
                  })],
                  close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
                })
              })],
              separators: [_t.node("Spamex", "Punctuator", [_t.str`,`], {})],
              close: _t.node("Spamex", "Punctuator", [_t.str`}`], {})
            }),
            close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`]}`], {})
        }),
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *CharacterClassRange({
    props: {
      first = false
    }
  }) {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.gap`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Character`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`min`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), when(first, _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`span`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`CharacterClass:First`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }))],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`-`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`rangeOperator`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Character`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`max`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
  }
  *CharacterSet() {
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`.`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      return {
        kind: 'any'
      };
    }
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`\\\\`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`escape`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    let attrs;
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`d`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        kind: 'digit'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`D`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        kind: 'digit',
        negate: true
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`s`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        kind: 'space'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`S`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        kind: 'space',
        negate: true
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`w`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        kind: 'word'
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`W`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        kind: 'word',
        negate: true
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`match`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
          elements: [_t.node("Regex", "Character", [_t.str`p`], {})]
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
        flags: _t.node("Regex", "Flag", [_t.ref`value`], {
          value: _t.node("Regex", "Keyword", [_t.str`i`], {})
        })
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      throw new Error('unicode property character sets are not supported yet');
    } else {
      throw new Error('unknown character set kind');
    }
    return {
      attrs
    };
  }
  *Quantifier() {
    yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatHeld`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "NodeMatcher", [_t.ref`open`, _t.ref`type`, _t.trivia` `, _t.ref`[attributes]`, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Element`], {}),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`element`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    });
    let attrs;
    if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`*`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        min: 0,
        max: Infinity
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`+`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        min: 1,
        max: Infinity
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Keyword`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`?`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`value`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      attrs = {
        min: 0,
        max: 1
      };
    } else if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
      verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
      open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
      argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
        open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
        type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
        value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
          value: _t.node("Spamex", "Literal", [_t.str`{`], {}),
          close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
        }),
        attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
          key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
          mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`open`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          })
        })],
        close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
      }),
      close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
    })) {
      let max;
      let min = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Number`], {}),
          value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
            alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
              elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                  escape: _t.node("Regex", "Punctuator", [_t.str`\\`], {}),
                  value: _t.node("Regex", "Keyword", [_t.str`d`], {})
                }),
                value: _t.node("Regex", "Keyword", [_t.str`+`], {})
              })]
            })],
            close: _t.node("Spamex", "Punctuator", [_t.str`/`], {})
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`min`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
      if (yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`,`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`separator`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      })) {
        max = yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
          verb: _t.node("Instruction", "Identifier", [_t.str`eatMatch`], {}),
          open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
          argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
            type: _t.node("Spamex", "Identifier", [_t.str`Number`], {}),
            value: _t.node("Spamex", "Regex", [_t.ref`open`, _t.ref`[alternatives]`, _t.ref`close`, _t.ref`flags`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
              alternatives: [_t.node("Regex", "Alternative", [_t.ref`[elements]`], {
                elements: [_t.node("Regex", "Quantifier", [_t.ref`element`, _t.ref`value`], {
                  element: _t.node("Regex", "CharacterSet", [_t.ref`escape`, _t.ref`value`], {
                    escape: _t.node("Regex", "Punctuator", [_t.str`\\`], {}),
                    value: _t.node("Regex", "Keyword", [_t.str`d`], {})
                  }),
                  value: _t.node("Regex", "Keyword", [_t.str`+`], {})
                })]
              })],
              close: _t.node("Spamex", "Punctuator", [_t.str`/`], {}),
              flags: _t.node("Regex", "Flag", [_t.ref`value`], {
                value: _t.node("Regex", "Keyword", [_t.str`y`], {})
              })
            }),
            attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
              key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
              mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
              value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
                open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
                value: _t.node("Spamex", "Literal", [_t.str`max`], {}),
                close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
              })
            })],
            close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
          }),
          close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
        });
      }
      attrs = {
        min,
        max
      };
      yield _t.node("Instruction", "Call", [_t.ref`verb`, _t.ref`open`, _t.ref`argument`, _t.ref`close`], {
        verb: _t.node("Instruction", "Identifier", [_t.str`eat`], {}),
        open: _t.node("Instruction", "Punctuator", [_t.str`(`], {}),
        argument: _t.node("Spamex", "TokenMatcher", [_t.ref`open`, _t.trivia` `, _t.ref`type`, _t.trivia` `, _t.ref`value`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.ref`[attributes]`, _t.trivia` `, _t.trivia` `, _t.ref`close`], {
          open: _t.node("Spamex", "Punctuator", [_t.str`<|`], {}),
          type: _t.node("Spamex", "Identifier", [_t.str`Punctuator`], {}),
          value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
            open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
            value: _t.node("Spamex", "Literal", [_t.str`}`], {}),
            close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
          }),
          attributes: [_t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          }), _t.node("Spamex", "StringAttribute", [_t.ref`key`, _t.ref`mapOperator`, _t.ref`value`], {
            key: _t.node("Spamex", "Literal", [_t.str`path`], {}),
            mapOperator: _t.node("Spamex", "Punctuator", [_t.str`=`], {}),
            value: _t.node("Spamex", "String", [_t.ref`open`, _t.ref`value`, _t.ref`close`], {
              open: _t.node("Spamex", "Punctuator", [_t.str`'`], {}),
              value: _t.node("Spamex", "Literal", [_t.str`close`], {}),
              close: _t.node("Spamex", "Punctuator", [_t.str`'`], {})
            })
          })],
          close: _t.node("Spamex", "Punctuator", [_t.str`|>`], {})
        }),
        close: _t.node("Instruction", "Punctuator", [_t.str`)`], {})
      });
    }
    return {
      attrs
    };
  }
});
