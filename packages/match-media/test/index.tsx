/**
 * @jest-environment jsdom
 */

import { Theme } from 'theme-ui'
import { cleanup, act, renderHook } from '@theme-ui/test-utils'
import { useResponsiveValue, useBreakpointIndex } from '../src'

const mockMediaQueries = (matches: string[]) =>
  jest.fn().mockImplementation((query) => ({
    matches: matches.includes(query),
  }))

afterEach(cleanup)

describe('renders correct initial values and uses default breakpoints', () => {
  test('no breakpoints matched', () => {
    window.matchMedia = mockMediaQueries([])

    const { result } = renderHook(() => useResponsiveValue(['a', 'b', 'c']))

    expect(result).toEqual('a')
  })

  test('all breakpoints matched', () => {
    window.matchMedia = mockMediaQueries([
      'screen and (min-width: 40em)',
      'screen and (min-width: 52em)',
      'screen and (min-width: 64em)',
    ])

    const { result } = renderHook(() =>
      useResponsiveValue(['a', 'b', 'c', 'd'])
    )

    expect(result).toEqual('d')
  })

  test('uses the last value provided', () => {
    window.matchMedia = mockMediaQueries([
      'screen and (min-width: 40em)',
      'screen and (min-width: 52em)',
    ])

    const {
      result: { value, index },
    } = renderHook(() => {
      return {
        value: useResponsiveValue(['a', 'b']),
        index: useBreakpointIndex(),
      }
    })

    expect(value).toEqual('b')
    expect(index).toEqual(2)
  })
})

describe('reads breakpoints from theme', () => {
  test('simple breakpoints', () => {
    window.matchMedia = mockMediaQueries([
      'screen and (min-width: 30em)',
      'screen and (min-width: 45em)',
    ])

    const { result } = renderHook(
      () => {
        return {
          value: useResponsiveValue(['a', 'b']),
          index: useBreakpointIndex(),
        }
      },
      {
        theme: {
          breakpoints: ['30em', '45em', '55em'],
        },
      }
    )

    expect(result).toEqual({ value: 'b', index: 2 })
  })

  test('breakpoints containing media queries', () => {
    const matchMedia = (window.matchMedia = mockMediaQueries([
      'screen and (min-width: 300px)',
      'screen and (min-width: 500px) and (max-width: 899px)',
    ]))

    const theme: Theme = {
      breakpoints: [
        '300px',
        '@media screen and (min-width: 500px) and (max-width: 899px)',
        '@media screen and (min-width: 900px)',
      ],
    }

    const { result } = renderHook(
      () => {
        return {
          value: useResponsiveValue(['a', 'b', 'c', 'd']),
          index: useBreakpointIndex(),
        }
      },
      { theme }
    )

    expect(matchMedia).toHaveBeenCalledWith('screen and (min-width: 300px)')
    expect(matchMedia).toHaveBeenCalledWith(
      'screen and (min-width: 500px) and (max-width: 899px)'
    )
    expect(matchMedia).toHaveBeenCalledWith('screen and (min-width: 900px)')

    expect(result).toEqual({ value: 'c', index: 2 })
  })
})

test('responds to resize event', () => {
  window.matchMedia = mockMediaQueries([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
    'screen and (min-width: 64em)',
  ])

  let onResize: () => void
  window.addEventListener = jest.fn().mockImplementation((event, cb) => {
    if (event === 'resize') onResize = cb
  })

  const rendered = renderHook(() => useResponsiveValue(['a', 'b', 'c', 'd']))

  expect(rendered.result).toEqual('d')

  window.matchMedia = mockMediaQueries([
    'screen and (min-width: 40em)',
    'screen and (min-width: 52em)',
  ])
  act(() => onResize())
  expect(rendered.result).toEqual('c')

  window.matchMedia = mockMediaQueries(['screen and (min-width: 40em)'])
  act(() => onResize())
  expect(rendered.result).toEqual('b')

  window.matchMedia = mockMediaQueries([])
  act(() => onResize())
  expect(rendered.result).toEqual('a')
})
