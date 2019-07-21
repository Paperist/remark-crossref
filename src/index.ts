import './definitions';
import RemarkParse from 'remark-parse';

import CrossReferenceLabelTokenizer from './CrossReferenceLabelTokenizer';
import transformer from './transformer';

function attacher(this: RemarkParse.Parse) {
  const Parser = this.Parser;
  const inlineTokenizers = Parser.prototype.inlineTokenizers;
  const inlineMethods = Parser.prototype.inlineMethods;

  inlineTokenizers['crossReferenceLabel'] = CrossReferenceLabelTokenizer;
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'crossReferenceLabel');
  return transformer;
}

export = attacher;
