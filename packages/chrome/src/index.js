import React from 'react'
import { render } from 'react-dom'
import { Editor } from '@theme-ui/editor'

render(<Editor />, document.getElementById('root'))

// Notes
// callback for when element selection changes
// chrome.devtools.panels.elements.onSelectionChanged.addListener(updateSelection)
