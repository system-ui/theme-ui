import React from 'react'
import { render } from 'react-dom'
import { Editor } from '@theme-ui/editor'

const Chrome = () => {
  const panelColorMode =
    window.chrome.devtools.panels.themeName === 'dark' ? 'dark' : 'light'

  return <Editor panelColorMode={panelColorMode} />
}

render(<Chrome />, document.getElementById('root'))

// Notes
// callback for when element selection changes
// chrome.devtools.panels.elements.onSelectionChanged.addListener(updateSelection)
