import React from 'react'
import { Themed } from '@theme-ui/mdx'
import { ColorPalette } from '@theme-ui/style-guide'

export default function ColorsDemo() {
  return (
    <section id="colors">
      <Themed.h2>Colors</Themed.h2>
      <ColorPalette omit={[]} />
    </section>
  )
}
