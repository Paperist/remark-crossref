import * as unist from 'unist';
import visit from 'unist-util-visit';

import CrossReferenceVisitor from './CrossReferenceVisitor';

export default function transformer(tree: unist.Node, _vfile: any) {
  visit(tree, 'linkReference', CrossReferenceVisitor);
}
