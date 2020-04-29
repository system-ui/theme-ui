exports.onPreInit = (__, options) => {
    let {themeModulePath} = options
    if(themeModulePath) {
        options.themeModulePath = require(themeModulePath)
    }
    if(prismPreset) {
      options.prismPreset = require(`@theme-ui/prism/presets/${prismPreset}.json`)
    }
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

