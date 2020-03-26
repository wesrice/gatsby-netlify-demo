// declare module '*.scss' {
//   const style: {[className: string]: string};
//   const content: {[className: string]: style} | style;
//   export = content;
// }

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

