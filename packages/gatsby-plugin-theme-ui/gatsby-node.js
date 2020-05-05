exports.onPreInit = (__, options) => {
  let { preset } = options

  if (typeof preset === 'string') {
    try {
      options.preset = require(preset)
    } catch {
      reporter.error(
        `It appears your theme dependency is not installed. Try running \`${generateInstallInstructions()} ${themeModule}\``
      )
    }
  }
}

function generateInstallInstructions() {
  const { getConfigStore } = require(`gatsby-core-utils`)

  const packageMangerConfigKey = `cli.packageManager`
  const PACKAGE_MANGER = getConfigStore().get(packageMangerConfigKey) || `yarn`

  const installKeyWord = PACKAGE_MANGER === `yarn` ? 'add' : 'install'

  return `${PACKAGE_MANGER} ${installKeyWord}`
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
      type ThemeUiConfig implements Node {
        preset: JSON,
      }
    `)
}

exports.sourceNodes = ({ actions, createContentDigest }, { preset = {} }) => {
  const { createNode } = actions

  const themeUiConfig = {
    preset,
  }

  createNode({
    ...themeUiConfig,
    id: `gatsby-plugin-theme-ui-config`,
    parent: null,
    children: [],
    internal: {
      type: `ThemeUiConfig`,
      contentDigest: createContentDigest(themeUiConfig),
      content: JSON.stringify(themeUiConfig),
      description: `Options for gatsby-plugin-theme-ui`,
    },
  })
}
