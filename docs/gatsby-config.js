const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        initialColorMode: 'light',
        theme: require.resolve('./src/components/theme'),
        components: require.resolve('./src/components/mdx-components'),
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
