exports.onPreInit = (__, options) => {
  let { preset } = options

  if (typeof preset === 'string') {
    try {
      options.preset = require(preset)
    } catch {
      reporter.warn(
        `It appears your theme dependency is not installed. Only local styles will appear.`
      )
    }
  }
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
