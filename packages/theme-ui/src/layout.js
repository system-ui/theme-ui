import jsx from './jsx'
import styled from '@emotion/styled'
import {
  width,
  space,
  color,
  flex,
  alignItems,
  justifyContent,
  flexWrap,
  flexDirection
} from 'styled-system'
import css from '@styled-system/css'

export const Box = styled('div')(css({
  boxSizing: 'border-box',
  minWidth: 0,
}),
  width,
  space,
  color,
  flex
)

export const Flex = styled(Box)({
  display: 'flex',
},
  flexWrap,
  alignItems,
  justifyContent,
  flexDirection,
)

// root/page layout
export const Layout = props =>
  jsx(Box, {
    ...props,
    css: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      variant: 'styles.Layout',
    }
  })

export const Header = props =>
  jsx(Box, {
    as: 'header',
    ...props,
    css: {
      display: 'flex',
      variant: 'styles.Header',
    }
  })

export const Main = props =>
  jsx(Box, {
    ...props,
    css: {
      flex: '1 1 auto',
      variant: 'styles.Main',
    }
  })

export const Container = props =>
  jsx(Box, {
    ...props,
    css: {
      width: '100%',
      minWidth: 0,
      maxWidth: 1024,
      mx: 'auto',
      p: 4,
      variant: 'styles.Container',
    }
  })

export const Footer = props =>
  jsx(Box, {
    as: 'footer',
    ...props,
    css: {
      display: 'flex',
      variant: 'styles.Footer',
    }
  })
