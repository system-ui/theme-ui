const presets = require('@theme-ui/presets')
const fs = require('fs')
const path = require('path')
const { rehypeMetaAsAttributes } = require('./src/rehype-meta-props.cjs')

const Preset = require.resolve('./src/templates/preset')

const LOG_CONFIG = !!process.env.LOG_CONFIG

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

module.exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        path.resolve(fs.realpathSync('node_modules/gatsby'), '..'),
        'node_modules',
      ],
    },
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-gatsby'],
              },
            },
            {
              loader: '@mdx-js/loader',
              /** @type {import('@mdx-js/loader').Options} */
              options: {
                providerImportSource: '@mdx-js/react',
                remarkPlugins: [
                  require('remark-slug'),
                  require('remark-gfm-1'),
                ],
                rehypePlugins: [rehypeMetaAsAttributes],
              },
            },
          ],
        },
      ],
    },
  })

  if (LOG_CONFIG) {
    console.log(getConfig())
  }
}
