/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

const resolvableExtensions = () => [`.ts`, `.tsx`]

function onCreateWebpackConfig({ stage, actions }, pluginOptions) {

  const test = pluginOptions.test || /\.tsx?$/;
  const exclude = pluginOptions.exclude || /(node_modules|cache|public)/;

  if (stage === "develop") {
    actions.setWebpackConfig({
      module: {
        rules: [{
          test: test,
          exclude: exclude,
          use: [{
            loader: 'tslint-loader'
          }]
        }]
      }
    });
  }
}

exports.resolvableExtensions = resolvableExtensions;
exports.onCreateWebpackConfig = onCreateWebpackConfig;

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              title
              seo {
                description
                keywords
              }
            }
            id
            tableOfContents
            parent {
              id
              ... on File {
                id
                name
                relativeDirectory
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allMdx.edges
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: `${node.parent.relativeDirectory}/${node.parent.name}`,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/page.tsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;
//   if (node.internal.type === 'MarkdownRemark') {
//     const slug = createFilePath({ node, getNode });
//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug,
//     });
//   }
// };

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//   const result = await graphql(`
//     query {
//       allMarkdownRemark {
//         edges {
//           node {
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `);

//   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//     createPage({
//       path: node.fields.slug,
//       component: path.resolve('./src/templates/page.tsx'),
//       context: {
//         slug: node.fields.slug,
//       },
//     });
//   });
// };
