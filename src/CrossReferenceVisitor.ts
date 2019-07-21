import * as mdast from 'mdast';

import * as Visit from 'unist-util-visit';
import { parse, ParseResult } from './peg/crossReference';

type LinkReference = mdast.LinkReference & mdast.Reference & mdast.Association;

const CrossReferenceVisitor: Visit.Visitor<LinkReference> = (node, index, parent) => {
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
  const crossRefNode: mdast.CrossReference = {
    identifiers,
    type: 'crossReference',
    value: `[${node.identifier}]`,
    position: node.position,
  };
  parent.children.splice(index, 1, crossRefNode);

  return true;
};

export default CrossReferenceVisitor;
