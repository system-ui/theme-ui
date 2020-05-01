exports.onPreInit = (__, options) => {
  let { themePreset } = options

  if (typeof themePreset === 'string') {
    try {
      options.themePreset = require(themePreset)
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
        themePreset: JSON,
      }
    `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { themePreset = {} }
) => {
  const { createNode } = actions

  const themeUiConfig = {
    themePreset,
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
