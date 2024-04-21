import { runTests } from '@bablr/test-runner';
import { buildSpamMatcher } from '@bablr/agast-vm-helpers/builders';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-regex-vm-pattern';

const buildMatcher = (type) => buildSpamMatcher(null, type);

export const testCases = [
  {
    matcher: buildMatcher('Pattern'),
    sourceText: '/2/',
    parsed: dedent`\
      <>
        <Pattern>
          open:
          <*Punctuator balanced='/' lexicalSpan='Pattern'>
            '/'
          </>
          alternatives[]:
          <Alternative>
            elements[]:
            <*Character>
              '2'
            </>
          </>
          separators:
          null
          close:
          <*Punctuator balancer>
            '/'
          </>
          flags:
          null
        </>
      </>`,
  },
];

runTests(language, testCases);
