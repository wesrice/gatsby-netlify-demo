/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const { renderToString } = require('react-dom/server');

exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
}) => {
  HTMLString = renderToString(bodyComponent);
  HTMLString = HTMLString.replace(' style="outline:none"', '');
  replaceBodyHTMLString(HTMLString);
}
