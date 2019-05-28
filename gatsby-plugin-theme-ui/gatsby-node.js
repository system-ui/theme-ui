const path = require('path')

exports.onCreateWebpackConfig = ({ actions, loaders }, opts) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.dirname(require.resolve('gatsby-plugin-theme-ui')) },
        {
          test: /gatsby-plugin-theme-ui\/theme-loader/,
          use: [
            loaders.js(),
            {
              loader: require.resolve('./theme-loader'),
              options: {
                ...opts,
              }
            }
          ]
        }
      ]
    }
  })
}
