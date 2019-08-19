const config = options => ({
  plugins: [
    {
      resolve: 'gatsby-theme-blog-core',
      options,
    },
    'gatsby-theme-ui-layout',
    'gatsby-plugin-theme-ui',
  ],
})
const isLocal = __dirname === process.cwd()
module.exports = isLocal ? config({}) : config
