/**
 * Static
 */
const C_NEWLINE = '\n';
const C_SPACE = '\x20';
const C_TAB = '\t';

/**
 * Tokenise a cross-ref label.
 *
 * @example
 *   tokenizeTableCaption(eat, 'Table: Caption {#tbl:table}');
 */
function tokenizeTableCaption (
  this: any,
  eat: any,
  value: string,
  silent: boolean = false,
) {
  const length = value.length;
  let firstLine = '';
  let idx = 0;

  for ( ; idx < length; idx++) {
    const char = value.charAt(idx);
    firstLine += char;
    if (char === C_NEWLINE) {
      break;
    }
  }

  for (idx++; idx < length; idx++) {
    const char = value.charAt(idx);
    if (char === C_SPACE || char === C_TAB) {
      continue;
    }
    if (char === C_NEWLINE) {
      break;
    }
    return;
  }

  const isMatched = new RegExp(/^(?:\s*table)?\s*:.*$/, 'im').test(firstLine);
  if (!isMatched) {
    return;
  }

  if (silent) {
    return true;
  }

  return eat(firstLine)({
    children: this.tokenizeInline(firstLine, eat.now()),
    type: 'tableCaption',
  });
}

/**
 * Tokenise a cross-ref label.
 *
 * @example
 *   tokenizeCrossReferenceLabel(eat, '{#fig:image}');
 */
function tokenizeCrossReferenceLabel (
  this: any,
  eat: any,
  value: string,
  silent: boolean = false,
) {
  const matches = new RegExp(/^(\s*{#(.*?)})/).exec(value);

  if (!matches) {
    return;
  }
  if (silent) {
    return true;
  }

  const matchStr = matches[1];
  const label = matches[2];

  return eat(matchStr)({
    type: 'crossReferenceLabel',
    label,
    value: matchStr,
  });
}

/**
 * Find a possible cross-ref label.
 *
 * @example
 *   locateCrossReferenceLabel('![](){#fig:image}'); // 5
 *
 */
function locateCrossReferenceLabel (
  value: string,
  fromIndex: number,
) {
  const idx = value.substr(fromIndex).search(/\s*{#/);
  if (idx === -1) {
    return idx;
  }
  return idx + fromIndex;
}

/**
 * Tokenise a cross-ref.
 *
 * @example
 *   tokenizeCrossReference(eat, '[@fig:image]');
 */
function tokenizeCrossReference (
  this: any,
  eat: any,
  value: string,
  silent: boolean = false,
) {
  const matches = new RegExp(/^(\[(@.*?)\])/).exec(value);

  if (!matches) {
    return;
  }
  if (silent) {
    return true;
  }

  const matchStr = matches[1];
  const identifier = matches[2];

  return eat(matchStr)({
    type: 'crossReference',
    identifier,
    value: matchStr,
  });
}

/**
 * Find a possible cross-ref.
 *
 * @example
 *   locateCrossReference('![]()[@fig:image]'); // 5
 *
 */
function locateCrossReference (
  value: string,
  fromIndex: number,
) {
  return value.indexOf('[@', fromIndex);
}

/**
 * Attacher.
 */
function attacher(remark: any) {
  const proto = remark.Parser.prototype;
  const blockMethods = proto.blockMethods;
  const inlineMethods = proto.inlineMethods;

  /**
   * Add a tokenizer to the `Parser`.
   */
  proto.blockTokenizers.tableCaption =
    Object.assign(tokenizeTableCaption, { locator: locateCrossReferenceLabel });
  blockMethods.splice(inlineMethods.indexOf('paragraph'), 0, 'tableCaption');

  proto.inlineTokenizers.crossReferenceLabel =
    Object.assign(tokenizeCrossReferenceLabel, { locator: locateCrossReferenceLabel });
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'crossReferenceLabel');

  proto.inlineTokenizers.crossReference =
    Object.assign(tokenizeCrossReference, { locator: locateCrossReference });
  inlineMethods.splice(inlineMethods.indexOf('link'), 0, 'crossReference');
}

/**
 * Expose.
 */

export default attacher;
