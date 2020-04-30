const prismPresetDictionary = {
  'dracula': '@theme-ui/prism/presets/dracula.json',
  'duotone-dark': '@theme-ui/prism/presets/duotone-dark.json',
  'duotone-light': '@theme-ui/prism/presets/duotone-light.json',
  'github': '@theme-ui/prism/presets/github.json',
  'night-owl-light': '@theme-ui/prism/presets/night-owl-light.json',
  'night-owl': '@theme-ui/prism/presets/night-owl.json',
  'oceanic-next': '@theme-ui/prism/presets/oceanic-next.json',
  'prism-coy': '@theme-ui/prism/presets/prism-coy.json',
  'prism-dark': '@theme-ui/prism/presets/prism-dark.json',
  'prism-funky': '@theme-ui/prism/presets/prism-funky.json',
  'prism-solarizedlight': '@theme-ui/prism/presets/prism-solarizedlight.json',
  'prism-tomorrow': '@theme-ui/prism/presets/prism-tomorrow.json',
  'prism-twilight': '@theme-ui/prism/presets/prism-twilight.json',
  'prism': '@theme-ui/prism/presets/prism.json',
  'shades-or-purple': '@theme-ui/prism/presets/shades-or-purple.json',
  'theme-ui': '@theme-ui/prism/presets/theme-ui.json',
  'ultramin': '@theme-ui/prism/presets/ultramin.json',
  'vs-dark': '@theme-ui/prism/presets/vs-dark.json',
}

exports.onPreInit = (__, options) => {
    let {themeModulePath} = options
    if(themeModulePath) {
        options.themeModulePath = require(themeModulePath)
    }

    if(prismPreset in prismPresetDictionary) {
      prismPreset = prismPresetDictionary[prismPreset]
    }

    if(prismPreset) {
      try {
        options.prismPreset = require(prismPreset)
      } catch {
        reporter.error(`It appears the prism dependency is not installed. Try running \`${generateInstallInstructions()}\n\n${prismPreset}\``)
      }
    }
}

function generateInstallInstructions() {
  const { getConfigStore } = require(`gatsby-core-utils`)

  const packageMangerConfigKey = `cli.packageManager`
  const PACKAGE_MANGER = getConfigStore().get(packageMangerConfigKey) || `yarn`

  const installKeyWord = PACKAGE_MANGER === `yarn` ? "add" : "install"

  return `${PACKAGE_MANGER} ${installKeyWord}`
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
  
    createTypes(`
      type ThemeUiConfig implements Node {
        themeModule: JSON,
        themeModulePath: JSON,
        moduleExportName: String,
        prismPreset: JSON,
      }
    `)
  }
  
  exports.sourceNodes = (
    { actions, createContentDigest },
    { prismPreset, moduleExportName = 'default', themeModule, themeModulePath}
  ) => {      
    const { createNode } = actions
  
    const themeUiConfig = {
        themeModule,
        themeModulePath,
        moduleExportName,
        prismPreset
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

