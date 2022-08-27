// @ts-check

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  jsxRuntime: 'automatic',
  jsxImportSource: 'theme-ui',
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Work+Sans', 'Quattrocento+Sans:400,400i,700'],
      },
    },
  ],
}
