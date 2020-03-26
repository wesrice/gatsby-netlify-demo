/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import cheerio from 'cheerio';
import crypto from 'crypto';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';

const elements = [
  '#gatsby-announcer',
  '#gatsby-focus-wrapper',
];

const cssFileNameBase = 'gatsby-inline';

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const $ = cheerio.load(renderToString(bodyComponent));
  const cssRules = [];

  elements.forEach(element => {
    const $element = $(element);
    const styleRules = $element.attr('style');
    cssRules.push(`${element} { ${styleRules} }`);
    $element.removeAttr('style');
  });

  const css = cssRules.join("\n");

  const filenameHash = crypto
    .createHash('sha256')
    .digest('hex')
    .slice(0, 20);

  const cssFileName = `${cssFileNameBase}.${filenameHash}.css`;

  const integrityHash = crypto
    .createHash('sha512')
    .update(css)
    .digest('base64');

  fs.writeFileSync(`public/${cssFileName}`, css, 'utf-8');

  setHeadComponents(
    <link
      href={`/${cssFileName}`}
      integrity={integrityHash}
      rel="stylesheet"
      type="text/css"
    />
  );

  replaceBodyHTMLString($('body').html());
};
