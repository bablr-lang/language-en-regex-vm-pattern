import { buildTag } from 'bablr';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-regex-vm-pattern';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { expect } from 'expect';
import { printPrettyCSTML } from '@bablr/agast-helpers/tree';

let enhancers = undefined;

// enhancers = debugEnhancers;

const json = (...args) =>
  printPrettyCSTML(buildTag(language, 'Pattern', undefined, enhancers)(...args));

describe('@bablr/language-regex-vm-pattern', () => {
  it('`/2/`', () => {
    expect(json`/2/`).toEqual(dedent`\
      <!0:cstml bablr-language='https://bablr.org/languages/core/bablr-regex-pattern'>
      <>
        <Pattern>
          open: <*Punctuator '/' balanced='/' balancedSpan='Pattern' />
          alternatives[]:
          <Alternative>
            elements[]:
            <*+Character>
              '2'
            </>
          </>
          separators: null
          close: <*Punctuator '/' balancer />
          flags:
          <Flags>
            global: null
            ignoreCase: null
            multiline: null
            dotAll: null
            unicode: null
            sticky: null
          </>
        </>
      </>`);
  });
});
