/**
 * @jest-environment node
 */
/**@jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
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

test('requires a default index for SSR', () => {
  const Component = props => {
    const value = useResponsiveValue(['a', 'b'])
    const index = useBreakpointIndex()
    return null
  }

  expect(() => ReactDOMServer.renderToStaticMarkup(<Component />)).toThrowError(
    TypeError
  )
})

test('requires default index be in range', () => {
  const Component = props => {
    const value = useResponsiveValue(['a', 'b'], 4)
    const index = useBreakpointIndex(4)
    return null
  }
  const Example = () =>
    ReactDOMServer.renderToStaticMarkup(
      <ThemeProvider
        theme={{
          breakpoints: ['30em', '45em', '55em'],
        }}>
        <Component />
      </ThemeProvider>
    )
  expect(Example).toThrowError(RangeError)
})
