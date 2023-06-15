// @ts-check

import Layout from './components/layout'

export { default as Banner } from './components/banner'
export { default as Tiles } from './components/tiles'
export { default as Cards } from './components/cards'
export { default as Note } from './components/note'

/**
 * @param {import("gatsby").WrapPageElementBrowserArgs} props
 */
export const WrapPageElement = ({ element, props }) => (
  <Layout {...props} children={element} />
)

/**
 * @see https://docsearch.algolia.com/
 * @param {import("gatsby").RenderBodyArgs} args
 */
export const setDocSearchComponents = ({
  setHeadComponents,
  setPostBodyComponents,
}) => {
  setHeadComponents([
    <link
      key="algolia-css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
    />,
  ])
  setPostBodyComponents([
    <script
      key="algolia-cdn"
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
    />,
  ])
}
