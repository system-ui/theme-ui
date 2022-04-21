/**
 * @jest-environment node
 */
/**@jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import { useResponsiveValue, useBreakpointIndex } from '../src'

test("falls back to user's default index", () => {
  const Component = (props) => {
    const value = useResponsiveValue(['a', 'b'], { defaultIndex: 1 })
    const index = useBreakpointIndex({ defaultIndex: 2 })
    return (
      <Fragment>
        {value} {index}
      </Fragment>
    )
  }

  const root = ReactDOMServer.renderToStaticMarkup(<Component />)

  expect(root).toEqual('b 2')
})

test('defaults to first breakpoint without user input', () => {
  let value
  let index
  const Component = (props) => {
    value = useResponsiveValue(['a', 'b'])
    index = useBreakpointIndex()
    return null
  }

  ReactDOMServer.renderToStaticMarkup(<Component />)
  expect(value).toEqual('a')
  expect(index).toEqual(0)
})

test('requires default index be in range', () => {
  const Component = (props) => {
    const value = useResponsiveValue(['a', 'b'], { defaultIndex: 4 })
    const index = useBreakpointIndex({ defaultIndex: 4 })
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

test('requires default index be a number', () => {
  const Component = ({ index }) => {
    const value = useResponsiveValue(['a', 'b'], { defaultIndex: index })
    const themeIndex = useBreakpointIndex({ defaultIndex: index })
    return null
  }

  const createRender = (defaultIndex) => () =>
    ReactDOMServer.renderToStaticMarkup(<Component index={defaultIndex} />)

  expect(createRender(() => 2)).toThrowError(TypeError)
  expect(createRender('2')).toThrowError(TypeError)
  expect(createRender({ index: 2 })).toThrowError(TypeError)
})
