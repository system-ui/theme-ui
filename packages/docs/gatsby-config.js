const remarkPlugins = [require('remark-slug')]

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
    {
      resolve: 'gatsby-theme-code-recipes',
      options: {
        path: 'src/recipes',
        basePath: '/recipes',
      },
    },
  ],
  flags: {
    DEV_SSR: true,
  },
}
