import { runTests } from '@bablr/test-runner';
import { spam } from '@bablr/boot';
import { dedent } from '@qnighy/dedent';
import * as language from '@bablr/language-regex-vm-pattern';

export const testCases = [
  {
    matcher: spam`<Pattern>`,
    sourceText: '//',
    parsed: dedent`\
      <>
      </>`,
  },
];

runTests(language, testCases);
