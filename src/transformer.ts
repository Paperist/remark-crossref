import { UNIST } from 'unist';

import * as visit from 'unist-util-visit';
import CrossReferenceVisitor from './CrossReferenceVisitor';

export default function transformer(tree: UNIST.Node, _vfile: any) {
  visit(tree, 'linkReference', CrossReferenceVisitor);
}
