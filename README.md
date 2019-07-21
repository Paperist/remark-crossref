# @paperist/remark-crossref

[![LICENSE][license-badge]][license]
[![NPM][npm-badge]][npm]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/@paperist/remark-crossref
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme
[npm-badge]: https://flat.badgen.net/npm/v/@paperist/remark-crossref
[license-badge]: https://flat.badgen.net/badge/license/MIT/blue
[standard-readme-badge]: https://flat.badgen.net/badge/standard-readme/OK/green

> [wooorm/remark] plugin for corss-references inspired by [pandoc-crossref]

[wooorm/remark]: https://github.com/wooorm/remark
[pandoc-crossref]: https://github.com/lierdakil/pandoc-crossref

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [AST](#ast)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm i remark @paperist/remark-crossref
```

## Usage

```js
const unified = require('unified');
const parser = require('remark-parse');
const crossref = require('@paperist/remark-crossref');

const markdown = `
# Heading {#sec:first}

See sec.[@sec:first].
`;

const processor = unified()
  .use(parser)
  .use(crossref);
const ast = processor.parse(markdown);

processor.run(ast).then((ast) => {
  console.dir(ast, { depth: null });
});
```

## AST

See also [mdast], [unist].

[mdast]: https://github.com/syntax-tree/mdast
[unist]: https://github.com/syntax-tree/unist

### `CrossReferenceLabel`

`CrossReferenceLabel` extends [`Literal`][unist-literal].

```typescript
interface CrossReferenceLabel extends Literal {
  type: 'crossReferenceLabel';
  label: string;
  options: { [key: string]: any };
}
```

For example, the following markdown:

```md
# Heading {#sec:first}
```

Yields:

```json
{
  "type": "heading",
  "depth": 1,
  "children": [
    {
      "type": "text",
      "value": "Heading "
    },
    {
      "type": "crossReferenceLabel",
      "value": "{#sec:first}",
      "label": "sec:first",
      "options": {}
    }
  ]
}
```

### `CrossReference`

`CrossReference` extends [`Literal`][unist-literal].

```typescript
interface CrossReference extends Literal {
  type: 'crossReference';
  identifiers: string[];
}
```

For example, the following markdown:

```md
See sec.[@sec:first;@sec:second]
```

Yields:

```json
{
  "type": "paragraph",
  "children": [
    {
      "type": "text",
      "value": "See sec."
    },
    {
      "type": "crossReference",
      "value": "[@sec:first;@sec:second]",
      "identifiers": ["sec:first", "sec:second"]
    }
  ]
}
```

[unist-literal]: https://github.com/syntax-tree/unist#literal

## Contribute

PRs accepted.

## License

[MIT (c) 3846masa](https://3846masa.mit-license.org)
