/**
 * @jest-environment node
 */
/**@jsx jsx */
import { jsx } from 'theme-ui'
import { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useResponsiveValue, useBreakpointIndex } from '../src'

test('falls back to default index', () => {
  const Component = props => {
    const value = useResponsiveValue(['a', 'b'], 1)
    const index = useBreakpointIndex(2)
    return (
      <Fragment>
        {value} {index}
      </Fragment>
    )
  }

  const root = ReactDOMServer.renderToStaticMarkup(<Component />)

  expect(root).toEqual('b 2')
})
