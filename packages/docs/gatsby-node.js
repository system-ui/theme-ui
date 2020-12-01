const presets = require('@theme-ui/presets')

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

  Object.keys(presets).forEach(preset => {
    actions.createPage({
      path: `/presets/${preset}`,
      component: Preset,
      context: { preset },
    })
  })
}
