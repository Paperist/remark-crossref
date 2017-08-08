import * as qs from 'querystring';
import { MDAST } from 'mdast';
import * as RemarkParse from 'remark-parse';

import { parse, ParseResult } from './peg/crossReferenceLabel';

const CrossReferenceLabelLocator: RemarkParse.Locator = (value, fromIndex) => {
  return value.indexOf('{#', fromIndex);
};

const CrossReferenceLabelTokenizerFunction: RemarkParse.TokenizerFunction = (
  eat,
  value,
  silent
) => {
  let result: ParseResult;
  try {
    result = parse(value);
  } catch (err) {
    return silent ? false : undefined;
  }

  if (silent) {
    return true;
  }

  const label = result.label;
  const options = qs.parse(result.options!, ',', '=', {
    decodeURIComponent: (str: string) => str.replace(/\\(.)/g, '$1').trim(),
    maxKeys: 0,
  });

  const optionsStr = qs.stringify(options, ',', '=', {
    encodeURIComponent: (str: string) => str.replace(/,/g, '\\,'),
  });
  const fallbackStr = `{#${label}${optionsStr ? '\x20' + optionsStr : ''}}`;

  const matchStr = value.substring(
    result.location.start.offset,
    result.location.end.offset
  );

  const node: MDAST.CrossReferenceLabel = {
    label,
    options,
    type: 'crossReferenceLabel',
    value: fallbackStr,
  };

  return eat(matchStr)(node);
};

const CrossReferenceLabelTokenizer: RemarkParse.Tokenizer = Object.assign(
  CrossReferenceLabelTokenizerFunction,
  {
    locator: CrossReferenceLabelLocator,
    notInBlock: true,
    notInList: true,
    notInLink: true,
  }
);

export default CrossReferenceLabelTokenizer;
