/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

 // tslint:disable-next-line:no-implicit-dependencies
import 'normalize.css';
import "./src/styles/global.scss";

import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import * as components from './src/components';

export const wrapRootElement = ({ element }) => (
  <MDXProvider
    components={components}
  >
    {element}
  </MDXProvider>
);

export const onRouteUpdate = ({ hash }) => {
  if (hash) {
    setTimeout(() => {
      document.querySelector(hash).scrollIntoView();
    }, 0);
  }
};
