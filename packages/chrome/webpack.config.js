const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public', 'bundle'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
}
