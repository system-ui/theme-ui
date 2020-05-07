module.exports = ({ path = 'src/recipes' } = {}) => ({
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: path,
        path,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {},
    },
  ],
})
