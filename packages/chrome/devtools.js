const checkForThemeUi = () => {
  return new Promise((resolve, reject) => {
    window.chrome.devtools.inspectedWindow.eval(
      `window.__THEME_UI__.theme`,
      (result, err) => (err ? reject(err) : resolve(result))
    )
  })
}

chrome.devtools.panels.elements.createSidebarPane('Theme UI', sidebar => {
  checkForThemeUi()
    .then(() => {
      sidebar.setPage('panel.html')
    })
    .catch(() => {
      sidebar.setPage('disabled.html')
    })
})
