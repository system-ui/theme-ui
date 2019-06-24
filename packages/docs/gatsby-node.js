module.exports.createPages = ({ actions }) => {
  actions.createRedirect({
    fromPath: '/custom-pragma',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/sx-prop',
  })

  actions.createRedirect({
    fromPath: '/css',
    isPermanent: true,
    redirectInBrowser: true,
    toPath: '/sx-prop',
  })
}
