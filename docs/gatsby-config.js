const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  __experimentalThemes: [
    // 'gatsby-theme-ui',
  ],
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        theme: require.resolve('./src/components/theme')
      }
    },
    'gatsby-plugin-catch-links',
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
