import { UNIST } from 'unist';

declare module 'mdast' {
  export namespace MDAST {
    interface CrossReferenceLabel extends UNIST.Text {
      type: 'crossReferenceLabel';
      label: string;
      options: { [key: string]: any };
    }

    interface CrossReference extends UNIST.Text {
      type: 'crossReference';
      identifiers: string[];
    }
  }
}
