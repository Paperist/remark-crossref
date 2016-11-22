# remark-crossref

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> [wooorm/remark] plugin for corss-references inspired of [pandoc-crossref]

[wooorm/remark]: https://github.com/wooorm/remark
[pandoc-crossref]: https://github.com/lierdakil/pandoc-crossref

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

**TBD**

```
npm i remark remark-crossref remark-latex
```

## Usage

```js
const remark = require('remark');
const crossref = require('remark-crossref');
const latex = require('remark-latex');

remark()
.use(crossref)
.use(latex)
.process(markdown, (err, vfile) => {
  if (err) {
    console.error(err);
  }
  console.log(vfile);
});
```

## Contribute

PRs accepted.

## License

MIT © 3846masa
