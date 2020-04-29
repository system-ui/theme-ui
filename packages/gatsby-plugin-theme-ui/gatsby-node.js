exports.onPreInit = (__, options) => {
    let {themeModulePath, typographyTheme} = options
    if(themeModulePath) {
        options.themeModulePath = require(themeModulePath)
    }
    if(typographyTheme) {
      options.typographyTheme = require(typographyTheme)
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
  
    createTypes(`
      type ThemeUiConfig implements Node {
        themeModule: JSON,
        themeModulePath: JSON,
        moduleExportName: String,
        typographyTheme: JSON,
      }
    `)
  }
  
  exports.sourceNodes = (
    { actions, createContentDigest },
    { moduleExportName = 'default', themeModule, themeModulePath, typographyTheme }
  ) => {      
    const { createNode } = actions
  
    const themeUiConfig = {
        themeModule,
        themeModulePath,
        moduleExportName,
        typographyTheme
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

