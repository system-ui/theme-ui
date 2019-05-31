const remarkPlugins = [
  require('remark-slug'),
]

module.exports = {
  __experimentalThemes: [
    'test-theme',
  ],
  plugins: [
    'gatsby-plugin-theme-ui',
    /*
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        initialColorMode: 'light',
        theme: require.resolve('./src/components/theme'),
        components: require.resolve('./src/components/mdx-components'),
      }
    },
    */
    'gatsby-plugin-catch-links',
    /*
    {
      resolve: '@theme-ui/gatsby-plugin-color-modes',
      options: {
        initialColorMode: 'light',
      }
    },
    */
    '@theme-ui/gatsby-plugin-color-modes',
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
