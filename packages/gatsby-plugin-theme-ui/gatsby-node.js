exports.onPreInit = (__, options) => {
    let {themeModulePath} = options
    
    if(themeModulePath) {
      try {
        options.themeModulePath = require(themeModulePath)
      } catch {
        reporter.error(`It appears your theme dependency is not installed. Try running \`${generateInstallInstructions()} ${themeModulePath}\``)
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
      }
    `)
  }
  
  exports.sourceNodes = (
    { actions, createContentDigest },
    { themeModule, themeModulePath}
  ) => {      
    const { createNode } = actions
  
    const themeUiConfig = {
        themeModule,
        themeModulePath,
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

