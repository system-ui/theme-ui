exports.onPreInit = (__, options) => {
    let {themeModulePath} = options
    if(themeModulePath) {
        options.themeModulePath = require(themeModulePath)
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
  
    createTypes(`
      type ThemeUiConfig implements Node {
        themeModule: JSON,
        themeModulePath: JSON,
        moduleExportName: String,
      }
    `)
  }
  
  exports.sourceNodes = (
    { actions, createContentDigest },
    { moduleExportName = 'default', themeModule, themeModulePath}
  ) => {      
    const { createNode } = actions
  
    const themeUiConfig = {
        themeModule,
        themeModulePath,
        moduleExportName,
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

