/** @jsx jsx */
import { jsx } from './index'
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
import { css } from './index'

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
  <Box
    {...props}
    css={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  />

export const Header = props =>
  <Box
    as='header'
    {...props}
    css={{
      display: 'flex',
    }}
  />

export const Main = props =>
  <Box
    {...props}
    css={{
      flex: '1 1 auto',
    }}
  />

export const Container = props =>
  <Box
    {...props}
    css={{
      width: '100%',
      minWidth: 0,
      maxWidth: 1024,
      mx: 'auto',
      p: 4,
    }}
  />

export const Footer = props =>
  <Box
    as='footer'
    {...props}
    css={{
      display: 'flex',
    }}
  />

// todo
// export const Sidebar
