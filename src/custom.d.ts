declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare global {
  interface window {
    mozIndexedDB: any;
    webkitIndexedDB: any;
    msIndexedDB: any;
  }
}
