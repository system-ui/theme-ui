exports.createPages = ({ actions }, opts = {}) => {
  const { basePath = '/style-guide' } = opts

  actions.createPage({
    path: basePath,
    component: require.resolve('./src/template.js'),
    context: {},
  })
}
