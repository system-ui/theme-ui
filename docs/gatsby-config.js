const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: '@theme-ui/gatsby-plugin-color-modes',
      options: {
        initialColorMode: 'light',
      }
    },
    {
      resolve: 'gatsby-mdx',
      options: {
        extensions: [ '.mdx', '.md' ],
        remarkPlugins,
        gatsbyRemarkPlugins: [
          'gatsby-remark-prismjs',
        ]
      }
    },
  ]
}
