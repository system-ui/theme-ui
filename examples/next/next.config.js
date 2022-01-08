const path = require('path')

const withMDX = require('@next/mdx')()

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  webpack(config) {
    // This is just for the sake of example app.
    // yarn link doesn't play well with React hooks.
    // https://github.com/facebook/react/issues/14257
    Object.assign(config.resolve.alias, {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    })

    return config
  },
})
