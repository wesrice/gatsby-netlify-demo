/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import path from 'path';

export const resolvableExtensions = () => ['.md', '.ts', '.tsx'];

export const onCreateWebpackConfig = ({ cache, stage, loaders, actions, ...other }, pluginOptions) => {
  if (stage === 'develop') {
    const test = pluginOptions.test || /\.tsx?$/;
    const exclude = pluginOptions.exclude || /(node_modules|cache|public)/;

    actions.setWebpackConfig({
      module: {
        rules: [
          {
            exclude: exclude,
            test: test,
            use: [
              {
                loader: 'tslint-loader',
              },
            ],
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: path.resolve(__dirname, './node_modules/react'),
        '@mdx-js/react': path.resolve(__dirname, './node_modules/@mdx-js/react'),
      },
    },
  });
};

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fileAbsolutePath
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

  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }, index) => {
    createPage({
      component: node.fileAbsolutePath,
      context: {
        id: node.id,
      },
      path: `${node.parent.relativeDirectory}/${node.parent.name}`,
    });
  });
};
