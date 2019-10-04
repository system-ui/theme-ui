/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, useThemeUI } from 'theme-ui'
import ky from 'ky'
import {
  Editor,
  Row,
  ColorPalette,
  Fonts,
  FontWeights,
  LineHeights,
  FontSizes,
  Space,
  ColorMode,
} from '@theme-ui/editor'

const Subhead = props => (
  <h2
    {...props}
    sx={{
      fontSize: 16,
      mb: 0,
    }}
  />
)

export default props => {
  const context = useThemeUI()
  const [status, setStatus] = useState()

  const save = async e => {
    e.preventDefault()
    setStatus('saving')
    const theme = JSON.stringify(context.theme, null, 2)
    const res = await ky.post('/___theme', {
      json: {
        theme,
      },
    })
    if (!res.ok) setStatus('error')
    else setStatus(null)
    // const text = await res.text()
  }

  return (
    <div>
      <header>
        <h1>Edit theme</h1>
        <button onClick={save}>Save</button>
        <pre>{status}</pre>
      </header>
      <div>
        <Editor>
          <ColorPalette size={96} />
          <ColorMode />
          <Subhead>Fonts</Subhead>
          <Fonts />
          <Subhead>Font Sizes</Subhead>
          <Row>
            <FontSizes />
          </Row>
          <Subhead>Font Weights</Subhead>
          <Row>
            <FontWeights />
          </Row>
          <Subhead>Line Heights</Subhead>
          <Row>
            <LineHeights />
          </Row>
          <Subhead>Space</Subhead>
          <Row>
            <Space />
          </Row>
        </Editor>
      </div>
    </div>
  )
}
