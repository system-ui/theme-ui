/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import styled from '@emotion/styled'
import css, { get } from '@styled-system/css'
import shouldForwardProp from '@styled-system/should-forward-prop'

// API
// - as
// - variant
// - sx
// - __base.key
// - system props??
// - margin/padding
// - color props
//
// - should this use emotion/styled?
//
// theme variants
// - text
// - text.heading
// - buttons
// - buttons.primary
// - buttons.secondary
// - cards
// - cards.primary
// - links
// - links.nav
// - forms
// - forms.label
// - forms.field
// - forms.input
// - forms.select
// - forms.textarea
// - forms.radio
// - forms.checkbox
// - forms.slider

// const styleProps = ({ }) =>

export const Box = React.forwardRef(
  ({ sx, __base = {}, variant, ...props }, ref) => {
    const style = css(
      get(theme, __base.type + '.' + variant, get(theme, variant))
    )
    return (
      <div
        ref={ref}
        {...props}
        sx={{
          ...sx,
        }}
      />
    )
  }
)
