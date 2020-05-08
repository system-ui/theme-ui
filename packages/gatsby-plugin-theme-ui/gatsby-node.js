const prismPresetDictionary = require(`./utils/preset-dictionary`)

exports.onPreInit = ({ reporter }, options) => {
  let { preset, prismPreset } = options

  if (typeof preset === 'string') {
    try {
      options.preset = require(preset)
    } catch {
      reporter.warn(
        `It appears your theme dependency is not installed. Only local styles will appear.`
      )
    }
  }

  if (prismPreset in prismPresetDictionary) {
    prismPreset = prismPresetDictionary[prismPreset]
  }

  if (prismPreset) {
    try {
      options.prismPreset = require(prismPreset)
    } catch {
      reporter.warn(`It appears the prism dependency is not installed.`)
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
      type ThemeUiConfig implements Node {
        preset: JSON,
        prismPreset: JSON,
      }
    `)
}

exports.sourceNodes = (
  { actions, createContentDigest },
  { preset = {}, prismPreset = {} }
) => {
  const { createNode } = actions

  const themeUiConfig = {
    preset,
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
