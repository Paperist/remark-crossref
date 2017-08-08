# @paperist/remark-crossref

[![LICENSE][license-badge]][license]
[![NPM][npm-badge]][npm]
[![standard-readme compliant][standard-readme-badge]][standard-readme]

[npm]: https://www.npmjs.com/package/@paperist/remark-crossref
[license]: https://3846masa.mit-license.org
[standard-readme]: https://github.com/RichardLitt/standard-readme

[npm-badge]: https://img.shields.io/npm/v/@paperist/remark-crossref.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURcwAAOeIiP////G7u/ri4tIZGdpFReJsbPC3t075sZwAAAAvSURBVCjPY2CgDWAThIMEsACjEhwIUCZg0dGCIqASwMAxMgXAgSzOwMAOC2TqAwBvzR4JxLaP0gAAAABJRU5ErkJggg==
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA%2BgAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAVUExURSBTICJcIiNgIiZoJTuhNyt3Kf///%2BCqxSgAAAAGdFJOUwpclbn%2B4Fj6/H8AAAABYktHRAZhZrh9AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4AkEEjEV7MDQQwAAAGBJREFUCNc1TUEKgDAMi07vE/Q%2BRD8g%2B4BbvAvi/79iMjDQJm1CC6BbDzRsZI3incIpYeYFhCaYnLiyPYnYkwWZFWoFHrSuttCmmbwXh0eJQYVON4JthZTxCzzAmyb8%2BAAKXBRyN6RyZQAAAABJRU5ErkJggg==
[standard-readme-badge]: https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square

> [wooorm/remark] plugin for corss-references inspired by [pandoc-crossref]

[wooorm/remark]: https://github.com/wooorm/remark
[pandoc-crossref]: https://github.com/lierdakil/pandoc-crossref

## Table of Contents

- [Install](#install)
- [Usage](#usage)
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
# Heading {#sec:heading}

See sec.[@sec:heading].
`;

const processor = unified().use(parser).use(crossref);
const ast = processor.parse(markdown);

processor.run(ast).then(ast => {
  console.dir(ast, { depth: null });
});

```

## Contribute

PRs accepted.

## License


![3846masa] MIT (c) 3846masa

[3846masa]: https://www.gravatar.com/avatar/cfeae69aae4f4fc102960f01d35d2d86?s=50
