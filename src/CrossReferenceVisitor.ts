import { UNIST } from 'unist';
import { MDAST } from 'mdast';

import * as Visit from 'unist-util-visit';
import { parse, ParseResult } from './peg/crossReference';

declare module 'mdast' {
  export namespace MDAST {
    interface CrossReference extends UNIST.Text {
      type: 'crossReference';
      identifiers: string[];
    }
  }
}

const CrossReferenceVisitor: Visit.Visitor = (
  node: MDAST.LinkReference,
  index,
  parent
) => {
  if (index == null || parent == null) {
    return true;
  }
  if (node.referenceType !== 'shortcut') {
    return true;
  }

  // Parse identifier
  let identifiers: ParseResult;
  try {
    identifiers = parse(node.identifier);
  } catch (_err) {
    // It is not a crossReference.
    return true;
  }

  // Replace LinkReference to CrossReference
  const crossRefNode: MDAST.CrossReference = {
    identifiers,
    type: 'crossReference',
    value: `[${node.identifier}]`,
    position: node.position,
  };
  parent.children.splice(index, 1, crossRefNode);

  return true;
};

export default CrossReferenceVisitor;
