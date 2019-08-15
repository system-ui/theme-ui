import React from 'react'
import { Styled, useThemeUI } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'

export default () => {
  const { theme } = useThemeUI()
  const { colors = {} } = theme

  return (
    <section id="colors">
      <Styled.h2>Colors</Styled.h2>
      <ColorPalette omit={[]} />
    </section>
  )
}
