/**
 * @jest-environment jsdom
 * @jsx jsx
 */

import { render, cleanup, act } from '@testing-library/react'
import { jsx, ThemeProvider } from 'theme-ui'
import { useResponsiveValue, useBreakpointIndex } from '../src'

const mockMediaQueries = (matches) =>
  jest.fn().mockImplementation((query) => ({
    matches: matches.includes(query),
  }))

afterEach(cleanup)

describe('renders correct initial values and uses default breakpoints', () => {
  test('no breakpoints matched', () => {
    window.matchMedia = mockMediaQueries([])

    let value
    const Component = (props) => {
      value = useResponsiveValue(['a', 'b', 'c'])
      return null
    }

    render(<Component />)
    expect(value).toEqual('a')
  })

  test('all breakpoints matched', () => {
    window.matchMedia = mockMediaQueries([
      'screen and (min-width: 40em)',
      'screen and (min-width: 52em)',
      'screen and (min-width: 64em)',
    ])

    let value
    const Component = (props) => {
      value = useResponsiveValue(['a', 'b', 'c', 'd'])
      return null
    }

    render(<Component />)
    expect(value).toEqual('d')
  })

  test('uses the last value provided', () => {
    window.matchMedia = mockMediaQueries([
      'screen and (min-width: 40em)',
      'screen and (min-width: 52em)',
    ])

    let value
    let index
    const Component = (props) => {
      value = useResponsiveValue(['a', 'b'])
      index = useBreakpointIndex()
      return null
    }

    render(<Component />)
    expect(value).toEqual('b')
    expect(index).toEqual(2)
  })
})

test('reads breakpoints from theme', () => {
  window.matchMedia = mockMediaQueries([
    'screen and (min-width: 30em)',
    'screen and (min-width: 45em)',
  ])

  let value
  let index
  const Component = (props) => {
    value = useResponsiveValue(['a', 'b'])
    index = useBreakpointIndex()
    return null
  }

  render(
    <ThemeProvider
      theme={{
        breakpoints: ['30em', '45em', '55em'],
      }}
    >
      <Component />
    </ThemeProvider>
  )
  expect(value).toEqual('b')
  expect(index).toEqual(2)
})

test('responds to resize event', () => {
  window.matchMedia = mockMediaQueries([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ])

  let resizeCb
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') resizeCb = cb
  })

  let value
  const Component = (props) => {
    value = useResponsiveValue(['a', 'b', 'c', 'd'])
    return null
  }

  render(<Component />)

  expect(value).toEqual('d')

  window.matchMedia = mockMediaQueries([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ])
  act(() => resizeCb())
  expect(value).toEqual('c')

  window.matchMedia = mockMediaQueries(['screen and (min-width: 40em)'])
  act(() => resizeCb())
  expect(value).toEqual('b')

  window.matchMedia = mockMediaQueries([])
  act(() => resizeCb())
  expect(value).toEqual('a')
})
