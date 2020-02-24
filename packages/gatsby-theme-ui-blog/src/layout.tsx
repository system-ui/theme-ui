import React from 'react'
import Head, { HeadProps } from './head'

const Layout: React.FC<HeadProps> = props => (
  <>
    <Head {...props} />
    {props.children}
  </>
)

export default Layout
