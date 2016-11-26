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
  const inlineMethods = proto.inlineMethods;

  /**
   * Add a tokenizer to the `Parser`.
   */
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
