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
        // theme: require.resolve('./src/components/theme')
        theme: './src/components/theme.js'
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
    /*
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [
          'gatsby-plugin-theme-ui',
        ]
      }
    }
    */
  ]
}
