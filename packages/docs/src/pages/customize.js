/** @jsx jsx */
import { jsx, Styled, ThemeProvider } from 'theme-ui'
import {
  Editor,
  ColorPalette,
  Fonts,
  FontWeights,
  LineHeights,
  FontSizes,
  Space,
  Row,
} from '@theme-ui/editor'
import { TypeStyle } from '@theme-ui/style-guide'
import { useReducer } from 'react'
import merge from 'lodash.merge'
import * as presets from '@theme-ui/presets'

const reducer = (state, next) => merge({}, state, next)

export default props => {
  const [ theme, setTheme ] = useReducer(reducer, {...presets.base})

  console.log(theme.colors)
  const context = {
    theme,
    setTheme,
  }

  return (
    <div>
      <Styled.h1>
        Create a Custom Theme
      </Styled.h1>
      <Editor
        fontSize={12}
        context={context}>
        <b>Colors</b>
        <ColorPalette
          size={64}
        />
        <div
          sx={{
            display: 'flex',
          }}>
          <div
            sx={{
            }}>
            <TypeStyle />
          </div>
          <div>
            <Fonts />
            <b>Font Sizes</b>
            <Row>
              <FontSizes />
            </Row>
            <b>Font Weights</b>
            <Row>
              <FontWeights />
            </Row>
            <b>Line Heights</b>
            <Row>
              <LineHeights />
            </Row>
            <p>
              Note: some web fonts may not render unless installed locally.
            </p>
          </div>
        </div>
      </Editor>
      <Styled.h3>
        JSON
      </Styled.h3>
      <Styled.pre
        children={JSON.stringify(theme, null, 2)}
        sx={{
          maxHeight: 512,
          overflowY: 'auto',
        }}
      />
    </div>
  )
}
