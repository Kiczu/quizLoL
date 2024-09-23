declare module "*.svg" {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  declare module "*.png" {
    const value: any;
    export = value;
 }
 declare module '*.webp' {
  const src: string;
  export default src;
}

declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.gif";