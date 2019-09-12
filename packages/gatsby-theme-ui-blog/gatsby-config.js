module.exports = options => ({
  plugins: [
    {
      resolve: 'gatsby-theme-blog-core',
      options,
    },
    'gatsby-theme-ui-layout',
    'gatsby-plugin-theme-ui',
  ],
})
