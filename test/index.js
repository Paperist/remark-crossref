const unified = require('unified');
const parse = require('remark-parse');
const crossref = require('../index');
const latex = require('../../remark-latex');

const markdown = `
# Title {#sec:section}

![Example](https://example.com) {#fig:image}

|Header|Header|
|:-----|:----:|
|Hoge  | Hoge |

: Table {#tbl:table}

This is test[@fig:image].

This is test[@Rello:2016:MBE:2858036.2858204;@Bernard:2003:CET:965943.965946].

- list
  - list
- list
`;

// const ast = unified().use(parse).use(crossref).parse(markdown);
// console.log(JSON.stringify(ast, null, 2));

// unified().use(parse).use(crossref).use(latex).process(markdown, (err, result) => {
//   if (err) {
//     console.error(err);
//   }
//   console.log(result.contents);
// });

const remark = require('remark');

remark()
.use(crossref)
.use(latex)
.process(markdown, (err, vfile) => {
  if (err) {
    console.error(err);
  }
  console.log(vfile.contents);
});
