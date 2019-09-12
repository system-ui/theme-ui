import React from 'react'
import { Styled } from 'theme-ui'
import { ColorPalette } from '@theme-ui/style-guide'

export default () => {
  return (
    <section id="colors">
      <Styled.h2>Colors</Styled.h2>
      <ColorPalette omit={[]} />
    </section>
  )
}
