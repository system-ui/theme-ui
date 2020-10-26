/** @jsx jsx */
import { jsx, Styled, Grid } from 'theme-ui'
import {
  EditorProvider,
  Theme,
  // ColorPalette,
  // Fonts,
  // FontWeights,
  // LineHeights,
  // FontSizes,
  // Space,
  // Row,
} from '@theme-ui/editor'
import { TypeStyle, FontFamily } from '@theme-ui/style-guide'
import { useReducer } from 'react'
import merge from 'lodash.merge'
import * as presets from '@theme-ui/presets'
import copy from 'copy-to-clipboard'
import stringify from 'stringify-object'
import Button from '../components/button'

const reducer = (state, next) => merge({}, state, next)

export default (props) => {
  const [theme] = useReducer(reducer, { ...presets.base })
  const json = stringify(theme, { indent: '  ' })

  return (
    <div>
      <Styled.h1>Create a Custom Theme</Styled.h1>
      <EditorProvider theme={theme}>
        <b>Colors</b>
        <Theme.Colors size={64} />
        <div
          sx={{
            my: 4,
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
            color: 'text',
            bg: 'background',
          }}>
          <TypeStyle
            fontFamily="heading"
            lineHeight="heading"
            fontWeight="heading"
            fontSize={[5, 6]}>
            Aa <FontFamily name="heading" />
          </TypeStyle>
          <TypeStyle fontSize={3}>
            Aa <FontFamily name="body" />
          </TypeStyle>
        </div>
        <Grid columns={3}>
          <Theme.Fonts />
        </Grid>
        <div sx={{ my: 2 }}>
          <b>Font Sizes</b>
          <Grid columns={9}>
            <Theme.FontSizes />
          </Grid>
        </div>
        <div sx={{ my: 2 }}>
          <div>
            <b>Font Weights</b>
            <Grid columns={3}>
              <Theme.FontWeights />
            </Grid>
          </div>
          <div>
            <b>Line Heights</b>
            <Grid columns={3}>
              <Theme.LineHeights />
            </Grid>
          </div>
        </div>
        <div sx={{ my: 2 }}>
          <b>Space</b>
          <Grid columns={9}>
            <Theme.Space />
          </Grid>
        </div>
        <p>Note: some web fonts may not render unless installed locally.</p>
      </EditorProvider>
      <Button
        onClick={(e) => {
          copy(json)
        }}>
        Copy Theme
      </Button>
      <Styled.pre
        children={json}
        sx={{
          maxHeight: 512,
          overflowY: 'auto',
        }}
      />
    </div>
  )
}
