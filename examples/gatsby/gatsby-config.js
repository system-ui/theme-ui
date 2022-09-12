/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  jsxRuntime: 'automatic',
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
  ],
}
