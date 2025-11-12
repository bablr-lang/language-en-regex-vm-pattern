import { buildTag } from 'bablr';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import language from '@bablr/language-en-regex-vm-pattern';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { buildIdentifier } from '@bablr/helpers/builders';

let enhancers = {};

// enhancers = debugEnhancers;

const buildRegexTag = (type) => {
  const matcher = spam`<$${buildIdentifier(type)} />`;
  return buildTag(language, matcher, undefined, { enhancers });
};

const print = (tree) => {
  return printPrettyCSTML(tree);
};

describe('@bablr/language-en-regex-vm-pattern', () => {
  describe('Pattern', () => {
    const regex = buildRegexTag('Pattern');

    it('`//`', () => {
      expect(print(regex`//`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]: <$Alternative />
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/2/`', () => {
      expect(print(regex`/2/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+: <*Character '2' />
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/21/`', () => {
      expect(print(regex`/21/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+: <*Character '2' />
            elements[]+: <*Character '1' />
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/1|2/`', () => {
      expect(print(regex`/1|2/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+: <*Character '1' />
          </>
          #separatorTokens[]: <* '|' />
          alternatives[]:
          <$Alternative>
            elements[]+: <*Character '2' />
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/2+/`', () => {
      expect(print(regex`/2+/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+: <*Character '2' />
            ^^^
            <$Quantifier { min: 1, max: +Infinity }>
              element+: <//>
              sigilToken*: <*Keyword '+' />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/[-]/`', () => {
      expect(print(regex`/[-]/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$CharacterClass { negate: false }>
              openToken*: <* '[' { balancedSpan: 'CharacterClass', balanced: ']' } />
              negateToken*: null
              elements[]+: <*Character '-' />
              closeToken*: <* ']' { balancer: true } />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/[--]/`', () => {
      expect(print(regex`/[--]/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$CharacterClass { negate: false }>
              openToken*: <* '[' { balancedSpan: 'CharacterClass', balanced: ']' } />
              negateToken*: null
              elements[]+: <*Character '-' />
              elements[]+: <*Character '-' />
              closeToken*: <* ']' { balancer: true } />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/[---]/`', () => {
      expect(print(regex`/[---]/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$CharacterClass { negate: false }>
              openToken*: <* '[' { balancedSpan: 'CharacterClass', balanced: ']' } />
              negateToken*: null
              elements[]+: <*Character '-' />
              ^^^
              <$CharacterClassRange>
                min+: <//>
                sigilToken*: <* '-' />
                max+: <*Character '-' />
              </>
              closeToken*: <* ']' { balancer: true } />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`//i`', () => {
      expect(print(regex`//i`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]: <$Alternative />
          closeToken*: <* '/' { balancer: true } />
          flags:
          <$Flags { global: false, ignoreCase: true, multiline: false, dotAll: false, unicode: false, sticky: false }>
            tokens[]*: <*Keyword 'i' />
          </>
        </>\n`);
    });

    it('`//mi`', () => {
      expect(print(regex`//mi`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]: <$Alternative />
          closeToken*: <* '/' { balancer: true } />
          flags:
          <$Flags { global: false, ignoreCase: true, multiline: true, dotAll: false, unicode: false, sticky: false }>
            tokens[]*: <*Keyword 'm' />
            tokens[]*: <*Keyword 'i' />
          </>
        </>\n`);
    });

    it('`/\\W/`', () => {
      expect(print(regex`/\W/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$WordCharacterSet { negate: true }>
              escapeToken*: <* '${'\\\\'}' />
              value*: <*Keyword 'W' />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/\\g/`', () => {
      expect(print(regex`/\g/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$Gap>
              escapeToken*: <* '${'\\\\'}' />
              value*: <*Keyword 'g' />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/\\</`', () => {
      expect(print(regex`/\</`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <*Character>
              @:
              <EscapeSequence { cooked: '<' }>
                escape*: <* '${'\\\\'}' { openSpan: 'Escape' } />
                code*: <*Keyword '<' { closeSpan: 'Escape' } />
              </>
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>\n`);
    });

    it('`/[ \\t]+/`', () => {
      expect(print(regex`/[ \t]+/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$CharacterClass { negate: false }>
              openToken*: <* '[' { balancedSpan: 'CharacterClass', balanced: ']' } />
              negateToken*: null
              elements[]+: <*Character ' ' />
              elements[]+:
              <*Character>
                @:
                <EscapeSequence { cooked: '${'\\t'}' }>
                  escape*: <* '${'\\\\'}' { openSpan: 'Escape' } />
                  code*: <*Keyword 't' { closeSpan: 'Escape' } />
                </>
              </>
              closeToken*: <* ']' { balancer: true } />
            </>
            ^^^
            <$Quantifier { min: 1, max: +Infinity }>
              element+: <//>
              sigilToken*: <*Keyword '+' />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>
      `);
    });

    it('`/[\\u{1}-\\u{10}]/`', () => {
      expect(print(regex`/[\u{1}-\u{10ffff}]/`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]:
          <$Alternative>
            elements[]+:
            <$CharacterClass { negate: false }>
              openToken*: <* '[' { balancedSpan: 'CharacterClass', balanced: ']' } />
              negateToken*: null
              elements[]+:
              <*Character>
                @:
                <EscapeSequence { cooked: '${'\\'}u0001' }>
                  escape*: <* '${'\\\\'}' { openSpan: 'Escape' } />
                  code*:
                  <EscapeCode { closeSpan: 'Escape' }>
                    type*: <*Keyword 'u' />
                    openToken*: <* '{' />
                    value: <*UnsignedHexInteger '1' />
                    closeToken*: <* '}' />
                  </>
                </>
              </>
              ^^^
              <$CharacterClassRange>
                min+: <//>
                sigilToken*: <* '-' />
                max+:
                <*Character>
                  @:
                  <EscapeSequence { cooked: '􏿿' }>
                    escape*: <* '${'\\\\'}' { openSpan: 'Escape' } />
                    code*:
                    <EscapeCode { closeSpan: 'Escape' }>
                      type*: <*Keyword 'u' />
                      openToken*: <* '{' />
                      value: <*UnsignedHexInteger '10ffff' />
                      closeToken*: <* '}' />
                    </>
                  </>
                </>
              </>
              closeToken*: <* ']' { balancer: true } />
            </>
          </>
          closeToken*: <* '/' { balancer: true } />
          flags: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
        </>
      `);
    });

    it('`//<gåp>`', () => {
      const flags = buildRegexTag('Flags')`i`;
      expect(print(regex`//${flags}`)).toEqual(dedent`\
        <$Pattern>
          openToken*: <* '/' { balanced: '/', balancedSpan: 'Pattern' } />
          alternatives[]: <$Alternative />
          closeToken*: <* '/' { balancer: true } />
          flags:
          <$Flags { global: false, ignoreCase: true, multiline: false, dotAll: false, unicode: false, sticky: false }>
            tokens[]*: <*Keyword 'i' />
          </>
        </>\n`);
    });
  });
});
