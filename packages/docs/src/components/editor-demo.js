// @ts-check

import React from 'react'
import { Box } from 'theme-ui'
import { EditorProvider, Theme } from '@theme-ui/editor'

export function EditorPackageDemo() {
  return (
    <EditorProvider>
      <Box
        sx={{
          p: 4,
          mb: 3,
          color: 'text',
          bg: 'background',
        }}>
        Demo Box
      </Box>
      <Theme.Colors />
      <Theme.Fonts />
      <b>Font Weights</b>
      <Theme.FontWeights />
      <b>Line Heights</b>
      <Theme.LineHeights />
    </EditorProvider>
  )
}
