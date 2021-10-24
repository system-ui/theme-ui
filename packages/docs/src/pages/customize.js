/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx, Themed, Grid, useThemeUI } from 'theme-ui'
import { EditorProvider, Theme } from '@theme-ui/editor'
import { TypeStyle, FontFamily } from '@theme-ui/style-guide'
import React from 'react'
import merge from 'lodash.merge'
import * as presets from '@theme-ui/presets'
import copy from 'copy-to-clipboard'
import stringify from 'stringify-object'
import Button from '../components/button'

const reducer = (state, next) => merge({}, state, next)

const ThemeOutput = () => {
  const context = useThemeUI()

  const output = stringify(context.theme, { indent: '  ' })

  return (
    <div>
      <Button
        onClick={(e) => {
          copy(output)
        }}>
        Copy Theme
      </Button>
      <Themed.pre
        children={output}
        sx={{
          maxHeight: 512,
          overflowY: 'auto',
        }}
      />
    </div>
  )
}

export default function CustomizePage(props) {
  const theme = { ...presets.base }

  return (
    <>
      <Themed.h1>Create a Custom Theme</Themed.h1>
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
        <ThemeOutput />
      </EditorProvider>
    </>
  )
}
