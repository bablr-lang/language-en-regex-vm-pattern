import { buildTag } from 'bablr';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-regex-vm-pattern';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/agast-helpers/tree';

let enhancers = undefined;

// enhancers = debugEnhancers;

describe('@bablr/language-regex-vm-pattern', () => {
  describe('Pattern', () => {
    const regex = (...args) =>
      printPrettyCSTML(buildTag(language, 'Pattern', undefined, enhancers)(...args));

    it('`//`', () => {
      expect(regex`//`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]: null
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/2/`', () => {
      expect(regex`/2/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <*+Character>
                '2'
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/21/`', () => {
      expect(regex`/21/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <*+Character>
                '2'
              </>
              elements[]:
              <*+Character>
                '1'
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/1|2/`', () => {
      expect(regex`/1|2/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <*+Character>
                '1'
              </>
            </>
            separators[]: <~*Punctuator '|' />
            alternatives[]:
            <Alternative>
              elements[]:
              <*+Character>
                '2'
              </>
            </>
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/2+/`', () => {
      expect(regex`/2+/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <Quantifier min=1 max=+Infinity>
                element:
                <*+Character>
                  '2'
                </>
                sigilToken: <~*Keyword '+' />
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/[-]/`', () => {
      expect(regex`/[-]/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <+CharacterClass !negate>
                openToken: <~*Punctuator '[' balancedSpan='CharacterClass' balanced=']' />
                negateToken: null
                elements[]:
                <*+Character>
                  '-'
                </>
                closeToken: <~*Punctuator ']' balancer />
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/[--]/`', () => {
      expect(regex`/[--]/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <+CharacterClass !negate>
                openToken: <~*Punctuator '[' balancedSpan='CharacterClass' balanced=']' />
                negateToken: null
                elements[]:
                <*+Character>
                  '-'
                </>
                elements[]:
                <*+Character>
                  '-'
                </>
                closeToken: <~*Punctuator ']' balancer />
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/[---]/`', () => {
      expect(regex`/[---]/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <+CharacterClass !negate>
                openToken: <~*Punctuator '[' balancedSpan='CharacterClass' balanced=']' />
                negateToken: null
                elements[]:
                <+CharacterClassRange>
                  min:
                  <*+Character>
                    '-'
                  </>
                  sigilToken: <~*Punctuator '-' />
                  max:
                  <*+Character>
                    '-'
                  </>
                </>
                closeToken: <~*Punctuator ']' balancer />
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`//i`', () => {
      expect(regex`//i`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]: null
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global ignoreCase !multiline !dotAll !unicode !sticky>
              tokens[]:
              <*Keyword>
                'i'
              </>
            </>
          </>
        </>\n`);
    });

    it('`//mi`', () => {
      expect(regex`//mi`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]: null
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global ignoreCase multiline !dotAll !unicode !sticky>
              tokens[]:
              <*Keyword>
                'm'
              </>
              tokens[]:
              <*Keyword>
                'i'
              </>
            </>
          </>
        </>\n`);
    });

    it('`/\\W/`', () => {
      expect(regex`/\W/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <+WordCharacterSet negate>
                escapeToken: <~*Punctuator '${'\\\\'}' />
                value: <~*Keyword 'W' />
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`/\\g/`', () => {
      expect(regex`/\g/`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]:
              <+Gap>
                escapeToken: <~*Punctuator '${'\\\\'}' />
                value: <~*Keyword 'g' />
              </>
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global !ignoreCase !multiline !dotAll !unicode !sticky>
            </>
          </>
        </>\n`);
    });

    it('`//<gap>`', () => {
      const flags = buildTag(language, 'Flags', undefined, enhancers)`i`;
      expect(regex`//${flags}`).toEqual(dedent`\
        <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
        <>
          <Pattern>
            openToken: <~*Punctuator '/' balanced='/' balancedSpan='Pattern' />
            alternatives[]:
            <Alternative>
              elements[]: null
            </>
            separators[]: null
            closeToken: <~*Punctuator '/' balancer />
            flags:
            <Flags !global ignoreCase !multiline !dotAll !unicode !sticky>
              tokens[]:
              <*Keyword>
                'i'
              </>
            </>
          </>
        </>\n`);
    });
  });
});
