const checkForThemeUI = () => {
  return new Promise((resolve, reject) => {
    window.chrome.devtools.inspectedWindow.eval(
      `window.__THEME_UI__.theme`,
      (result, err) => (err ? resolve(false) : resolve(true))
    )
  })
}

checkForThemeUI()
  .then((hasThemeUI) => {
    if (!hasThemeUI) return
    chrome.devtools.panels.elements.createSidebarPane('Theme UI', sidebar => {
      sidebar.setPage('panel.html')
    })
  })

