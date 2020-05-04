const prismPresetDictionary = require(`./utils/preset-dictionary`)

exports.onPreInit = ({ reporter }, options) => {
  if (prismPreset in prismPresetDictionary) {
    prismPreset = prismPresetDictionary[prismPreset]
  }

  if (prismPreset) {
    try {
      options.prismPreset = require(prismPreset)
    } catch {
      reporter.error(
        `It appears the prism dependency is not installed. Try running \`${generateInstallInstructions()}\n\n${prismPreset}\``
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
        prismPreset: JSON,
      }
    `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { prismPreset = {} }
) => {
  const { createNode } = actions

  const themeUiConfig = {
    prismPreset,
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
