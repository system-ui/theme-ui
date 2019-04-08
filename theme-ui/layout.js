import React from 'react'
import { css } from './index'

// todo
export const Box = props =>
  <div
    {...props}
    css={(theme) => css({
      boxSizing: 'border-box',
      minWidth: 0,
    })({ theme, ...props })}
  />

// root/page layout
export const Layout = props =>
  <div
    {...props}
    css={css({
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    })}
  />

export const Header = props =>
  <header
    {...props}
    css={css({
      display: 'flex',
    })}
  />

export const Main = props =>
  <div
    {...props}
    css={css({
      flex: '1 1 auto',
    })}
  />

export const Container = props =>
  <div
    {...props}
    css={css({
      width: '100%',
      minWidth: 0,
      maxWidth: 1024,
      m: 'auto',
      p: 4,
    })}
  />

export const Footer = props =>
  <footer
    {...props}
    css={css({
      display: 'flex',
    })}
  />

// todo
// export const Sidebar
