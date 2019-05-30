const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  plugins: [
    'gatsby-plugin-catch-links',
    '@theme-ui/gatsby-plugin-color-modes',
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
