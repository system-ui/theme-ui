const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  __experimentalThemes: [
    'gatsby-theme-ui',
  ],
  plugins: [
    // 'gatsby-plugin-theme-ui',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-mdx',
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
