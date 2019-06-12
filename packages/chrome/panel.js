console.log('beep')
const div = document.getElementById('root')
div.innerHTML = 'BEEP'

let context

if (chrome.devtools.panels.themeName === 'dark') {
  console.log('dark devtools')
  document.body.style = '--text:white;--background:black;'
}

chrome.devtools.inspectedWindow.eval(
  'window.__THEME_UI__.theme',
  {
    useContentScriptContextOptional: true,
  },
  function (context, e) {
    if (e) {
      console.log('theme-ui err', e)
      return
    }
    console.log('theme-ui context', context)
    const pre = document.createElement('pre')
    pre.innerHTML = JSON.stringify(context, null, 2)
    div.appendChild(pre)
  }
)
