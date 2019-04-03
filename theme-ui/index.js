import React from 'react'
import { ComponentProvider } from 'emotion-mdx'
import css from '@styled-system/css'

export { css } from '@styled-system/css'
export { Context, Styled } from 'emotion-mdx'

export const ThemeProvider = props =>
  <ComponentProvider
    {...props}
    transform={css}
  />

