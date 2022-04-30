const remarkSlug = require('remark-slug')
const remarkPlugins = [remarkSlug]

module.exports = {
  siteMetadata: {
    siteUrl: 'https://theme-ui.com',
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins,
      },
    },
    {
      resolve: 'gatsby-theme-style-guide',
      options: {
        basePath: '/style-guide-demo',
      },
    },
  ],
  flags: {
    PARALLEL_SOURCING: true,
    FAST_DEV: true,
    DEV_SSR: true,
    DEV_WEBPACK_CACHE: true,
  },
}
