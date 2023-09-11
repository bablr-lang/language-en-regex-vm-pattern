# @bablr/miniparser-language-nonbacktracking-js-regex

This grammar defines a subset of regex that is safe to use in a nonbacktracking regex engine, in particular [@bablr/regex](https://github.com/bablr-lang/regex).

## The language

The language is the same as [Javascript Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) except for these deifferences:

- Expressions always use "unicode mode" escaping rules. Only valid escapes are syntactically legal.

- Expressions do not support lookbehind (`/(?<=abc)/` and `/(?<!abc)/`).

- Expressions do not (and will not) support backreferences (`/(.)\0/`).

- Expressions do not support lookahead (yet) (`/(?=abc)/` and `/(?!abc)/`). See [#11](https://github.com/iter-tools/regex/issues/11).

- Expressions do not support named capture groups (`/(?<name>)/`) (yet).
