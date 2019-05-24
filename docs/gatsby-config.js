const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  __experimentalThemes: [],
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        colorMode: 'light',
        theme: require.resolve('./src/components/theme')
      }
    },
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
