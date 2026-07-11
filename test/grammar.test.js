import { buildTag } from 'bablr';
import { dedent } from '@qnighy/dedent';
import language from '@bablr/language-en-regex-vm-pattern';
import { expect } from 'expect';
import { printCSTML } from '@bablr/helpers/tree';
import { m } from '@bablr/helpers/grammar';

const buildRegexTag = (type) => {
  const matcher = m`<$${type} />`;
  return buildTag(language, matcher, undefined);
};

const print = (tree) => {
  return printCSTML(tree);
};

describe('@bablr/language-en-regex-vm-pattern', () => {
  describe('Pattern', () => {
    const regex = buildRegexTag('Pattern');

    it('`//`', () => {
      expect(print(regex`//`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/2/`', () => {
      expect(print(regex`/2/`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '2' />
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/21/`', () => {
      expect(print(regex`/21/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/1|2/`', () => {
      expect(print(regex`/1|2/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/2+/`', () => {
      expect(print(regex`/2+/`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character '2' />
              ^^^
              <$Quantifier { max: +Infinity, min: 1 }>
                element+$: <//>
                sigilToken*: <*Keyword '+' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/[-]/`', () => {
      expect(print(regex`/[-]/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/[--]/`', () => {
      expect(print(regex`/[--]/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/[---]/`', () => {
      expect(print(regex`/[---]/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`//i`', () => {
      expect(print(regex`//i`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$:
            <$Flags { dotAll: false, global: false, ignoreCase: true, multiline: false, sticky: false, unicode: false }>
              tokens[]*: <*Keyword 'i' />
            </>
          </>
        </>
      `);
    });

    it('`//mi`', () => {
      expect(print(regex`//mi`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$:
            <$Flags { dotAll: false, global: false, ignoreCase: true, multiline: true, sticky: false, unicode: false }>
              tokens[]*: <*Keyword 'm' />
              tokens[]*: <*Keyword 'i' />
            </>
          </>
        </>
      `);
    });

    it('`/\\W/`', () => {
      expect(print(regex`/\W/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/\\g/`', () => {
      expect(print(regex`/\g/`)).toEqual(dedent`
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
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/\\</`', () => {
      expect(print(regex`/\</`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$: <*Character @'<' @@'\\\\<' />
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/[ \\t]+/`', () => {
      expect(print(regex`/[ \t]+/`)).toEqual(dedent`
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
                elements[]+$: <*Character @'\\t' @@'\\\\t' />
                closeToken*: <* ']' />
              </>
              ^^^
              <$Quantifier { max: +Infinity, min: 1 }>
                element+$: <//>
                sigilToken*: <*Keyword '+' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`/[\\u{1}-\\u{10ffff}]/`', () => {
      expect(print(regex`/[\u{1}-\u{10ffff}]/`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$:
            <$Alternative>
              elements[]+$:
              <$CharacterClass { negate: false }>
                openToken*: <* '[' />
                elements[]+$: <*Character @'\\u0001' @@'\\\\u{1}' />
                ^^^
                <$CharacterClassRange>
                  min+$: <//>
                  sigilToken*: <* '-' />
                  max+$: <*Character @'\u{10ffff}' @@'\\\\u{10ffff}' />
                </>
                closeToken*: <* ']' />
              </>
            </>
            closeToken*: <* '/' />
            flags$: <$Flags { dotAll: false, global: false, ignoreCase: false, multiline: false, sticky: false, unicode: false } />
          </>
        </>
      `);
    });

    it('`//<gåp>`', () => {
      const flags = buildRegexTag('Flags')`i`;
      expect(print(regex`//${flags}`)).toEqual(dedent`
        <$_>
          _:
          <$Pattern>
            openToken*: <* '/' />
            alternatives[]$: <$Alternative />
            closeToken*: <* '/' />
            flags$:
            <$Flags { dotAll: false, global: false, ignoreCase: true, multiline: false, sticky: false, unicode: false }>
              tokens[]*: <*Keyword 'i' />
            </>
          </>
        </>
      `);
    });
  });
});
