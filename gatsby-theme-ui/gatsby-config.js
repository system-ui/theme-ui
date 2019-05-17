const pkg = require('./package.json')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [ pkg.name ]
      }
    }
  ]
}
