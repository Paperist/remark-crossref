import * as mdast from 'mdast';

declare module 'mdast' {
  export interface CrossReferenceLabel extends mdast.Literal {
    type: 'crossReferenceLabel';
    label: string;
    options: { [key: string]: any };
  }

  export interface CrossReference extends mdast.Literal {
    type: 'crossReference';
    identifiers: string[];
  }
}
