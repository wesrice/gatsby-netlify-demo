const { IS_PROD } = process.env;

module.exports = {
  siteMetadata: {
    siteUrl: IS_PROD ? 'https://fc118-website.firebaseapp.com' : 'http://localhost:8000',
    title: 'Demo Site',
    description: 'Statically generated website using GatsbyJS, Netlify and Firebase.',
    author: '@MaxMind',
    cmsUrl: IS_PROD ? 'https://fc118-cms.firebaseapp.com/' : 'http://localhost:8001',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
        includePaths: ["src/styles"],
      },
    },
    'gatsby-plugin-csp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        },
        jsx: true,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `cms`,
        path: `${__dirname}/../cms/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `./content/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          content: require.resolve("./src/templates/page.tsx"),
        },
        remarkPlugins: [
          {
            resolve: 'remark-lint',
            // options: {
            //   maxWidth: 590,
            // },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Montserrat',
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`]
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-sri',
    'gatsby-plugin-catch-links',
  ],
}
