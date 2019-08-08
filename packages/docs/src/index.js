/** @jsx jsx */
import { jsx } from 'theme-ui'
import Layout from './components/layout'

export const wrapPageElement = ({ element, props }) => (
  <Layout
    {...props}
    fullwidth={props.location.pathname === '/'}
    children={element}
  />
)

export { default as Banner } from './components/banner'
export { default as Tiles } from './components/tiles'
