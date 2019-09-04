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
import { TypeStyle, FontFamily } from '@theme-ui/style-guide'
import { useReducer } from 'react'
import merge from 'lodash.merge'
import * as presets from '@theme-ui/presets'

const reducer = (state, next) => merge({}, state, next)

export default props => {
  const [ theme, setTheme ] = useReducer(reducer, {...presets.base})

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
        <ThemeProvider theme={context.theme}>
          <div
            sx={{
              my: 4,
              color: 'text',
              bg: 'background',
            }}>
            <TypeStyle
              fontFamily='heading'
              lineHeight='heading'
              fontWeight='heading'
              fontSize={[ 5, 6 ]}>
              Aa <FontFamily name='heading' />
            </TypeStyle>
            <TypeStyle fontSize={3}>
              Aa <FontFamily name='body' />
            </TypeStyle>
          </div>
        </ThemeProvider>
        <Fonts />
        <div sx={{ my: 3 }}>
          <b>Font Sizes</b>
          <Row>
            <FontSizes />
          </Row>
        </div>
        <Row sx={{ my: 3 }}>
          <div>
            <b>Font Weights</b>
            <Row>
              <FontWeights />
            </Row>
          </div>
          <div>
            <b>Line Heights</b>
            <Row>
              <LineHeights />
            </Row>
          </div>
        </Row>
        <p>
          Note: some web fonts may not render unless installed locally.
        </p>
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
