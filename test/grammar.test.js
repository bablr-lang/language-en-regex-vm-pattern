import { buildTag } from 'bablr';
import { dedent } from '@qnighy/dedent';
import language from '@bablr/language-en-regex-vm-pattern';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { buildIdentifier } from '@bablr/helpers/builders';
import { m } from '@bablr/helpers/grammar';

const buildRegexTag = (type) => {
  const matcher = m`<$${type} />`;
  return buildTag(language, matcher, undefined);
};

const print = (tree) => {
  return printPrettyCSTML(tree);
};

describe('@bablr/language-en-regex-vm-pattern', () => {
  describe('Pattern', () => {
    const regex = buildRegexTag('Pattern');

    it('`//`', () => {
      expect(print(regex`//`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/2/`', () => {
      expect(print(regex`/2/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '2' />
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/21/`', () => {
      expect(print(regex`/21/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '2' />
              elements[]+$: <*Character '1' />
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/1|2/`', () => {
      expect(print(regex`/1|2/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '1' />
            </>
            #separatorTokens: <* '|' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '2' />
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/2+/`', () => {
      expect(print(regex`/2+/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '2' />
              ^^^
              <$Quantifier { min: 1, max: +Infinity }>
                element+$: <//>
                sigilToken*: <*Keyword '+' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/[-]/`', () => {
      expect(print(regex`/[-]/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$CharacterClass { negate: false }>
                openToken*: <* '[' />
                elements[]+$: <*Character '-' />
                closeToken*: <* ']' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/[--]/`', () => {
      expect(print(regex`/[--]/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$CharacterClass { negate: false }>
                openToken*: <* '[' />
                elements[]+$: <*Character '-' />
                elements[]+$: <*Character '-' />
                closeToken*: <* ']' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/[---]/`', () => {
      expect(print(regex`/[---]/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$CharacterClass { negate: false }>
                openToken*: <* '[' />
                elements[]+$: <*Character '-' />
                ^^^
                <$CharacterClassRange>
                  min+$: <//>
                  sigilToken*: <* '-' />
                  max+$: <*Character '-' />
                </>
                closeToken*: <* ']' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`//i`', () => {
      expect(print(regex`//i`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$:
            <$Flags { global: false, ignoreCase: true, multiline: false, dotAll: false, unicode: false, sticky: false }>
              tokens[]*: <*Keyword 'i' />
            </>
          </>
        </>\n`);
    });

    it('`//mi`', () => {
      expect(print(regex`//mi`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$:
            <$Flags { global: false, ignoreCase: true, multiline: true, dotAll: false, unicode: false, sticky: false }>
              tokens[]*: <*Keyword 'm' />
              tokens[]*: <*Keyword 'i' />
            </>
          </>
        </>\n`);
    });

    it('`/\\W/`', () => {
      expect(print(regex`/\W/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$WordCharacterSet { negate: true }>
                escapeToken*: <* '${'\\\\'}' />
                value*: <*Keyword 'W' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/\\g/`', () => {
      expect(print(regex`/\g/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$Gap>
                escapeToken*: <* '${'\\\\'}' />
                value*: <*Keyword 'g' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/\\</`', () => {
      expect(print(regex`/\</`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <*Character>
                @:
                <EscapeSequence { cooked: '<' }>
                  sigilToken*: <* '${'\\\\'}' />
                  code*: <*Keyword '<' />
                </>
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>\n`);
    });

    it('`/[ \\t]+/`', () => {
      expect(print(regex`/[ \t]+/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$CharacterClass { negate: false }>
                openToken*: <* '[' />
                elements[]+$: <*Character ' ' />
                elements[]+$:
                <*Character>
                  @:
                  <EscapeSequence { cooked: '${'\\t'}' }>
                    sigilToken*: <* '${'\\\\'}' />
                    code*: <*Keyword 't' />
                  </>
                </>
                closeToken*: <* ']' />
              </>
              ^^^
              <$Quantifier { min: 1, max: +Infinity }>
                element+$: <//>
                sigilToken*: <*Keyword '+' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>
      `);
    });

    it('`/[\\u{1}-\\u{10}]/`', () => {
      expect(print(regex`/[\u{1}-\u{10ffff}]/`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$CharacterClass { negate: false }>
                openToken*: <* '[' />
                elements[]+$:
                <*Character>
                  @:
                  <EscapeSequence { cooked: '${'\\'}u0001' }>
                    sigilToken*: <* '${'\\\\'}' />
                    code*:
                    <EscapeCode>
                      type*: <*Keyword 'u' />
                      openToken*: <* '{' />
                      value: <*UnsignedHexInteger '1' />
                      closeToken*: <* '}' />
                    </>
                  </>
                </>
                ^^^
                <$CharacterClassRange>
                  min+$: <//>
                  sigilToken*: <* '-' />
                  max+$:
                  <*Character>
                    @:
                    <EscapeSequence { cooked: '􏿿' }>
                      sigilToken*: <* '${'\\\\'}' />
                      code*:
                      <EscapeCode>
                        type*: <*Keyword 'u' />
                        openToken*: <* '{' />
                        value: <*UnsignedHexInteger '10ffff' />
                        closeToken*: <* '}' />
                      </>
                    </>
                  </>
                </>
                closeToken*: <* ']' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { global: false, ignoreCase: false, multiline: false, dotAll: false, unicode: false, sticky: false } />
          </>
        </>
      `);
    });

    it('`//<gåp>`', () => {
      const flags = buildRegexTag('Flags')`i`;
      expect(print(regex`//${flags}`)).toEqual(dedent`\
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$:
            <$Flags { global: false, ignoreCase: true, multiline: false, dotAll: false, unicode: false, sticky: false }>
              tokens[]*: <*Keyword 'i' />
            </>
          </>
        </>\n`);
    });
  });
});
