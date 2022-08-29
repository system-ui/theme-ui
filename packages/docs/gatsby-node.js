const presets = require('@theme-ui/presets')
const fs = require('fs')
const path = require('path')

const Preset = require.resolve('./src/templates/preset')

module.exports.createPages = ({ actions }) => {
  actions.createRedirect({
    fromPath: '/custom-pragma',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/sx-prop',
  })

  actions.createRedirect({
    fromPath: '/css',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/sx-prop',
  })

  Object.keys(presets).forEach((preset) => {
    actions.createPage({
      path: `/presets/${preset}`,
      component: Preset,
      context: { preset },
    })
  })
}

module.exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(fs.realpathSync('node_modules/gatsby'), '..'),
        'node_modules',
      ],
    },
  })
}
