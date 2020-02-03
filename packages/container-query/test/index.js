/** @jsx jsx */
import { render, cleanup, act } from '@testing-library/react'
import { useContainerQuery, getBreakpointIndex } from '../src'

const { jsx } = jest.requireActual('theme-ui')

afterEach(cleanup)

const mockUseThemeUI = jest.fn().mockImplementation(() => ({}))

jest.mock('theme-ui', () => ({
  useThemeUI: () => mockUseThemeUI(),
}))

describe('useContainerQuery', () => {
  window.getComputedStyle = jest.fn().mockImplementation(prop => prop)

  let handler

  window.ResizeObserver = class {
    constructor(_handler) {
      handler = _handler
    }
    observe() {}
    unobserve() {}
  }

  const Component = () => {
    const [ref, index] = useContainerQuery(['480px', '640px'])
    const bg = ['red', 'blue', 'green']

    return (
      <div ref={ref} style={{ backgroundColor: bg[index] }}>
        Color is <span>{bg[index]}</span>
      </div>
    )
  }

  test('match the smallest breakpoint', () => {
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 320,
          },
        },
      ])
    })

    expect(tree.getByText('red')).toBeTruthy()
  })

  test('match exactly a breakpoint value', () => {
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 480,
          },
        },
      ])
    })

    expect(tree.getByText('red')).toBeTruthy()
  })

  test('match a breakpoint in the middle', () => {
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 520,
          },
        },
      ])
    })

    expect(tree.getByText('blue')).toBeTruthy()
  })

  test('match the biggest breakpoint', () => {
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 1024,
          },
        },
      ])
    })

    expect(tree.getByText('green')).toBeTruthy()
  })

  test('with no breakpoints', () => {
    const Component = () => {
      const [ref, index] = useContainerQuery()
      const bg = ['red', 'blue', 'green']

      return (
        <div ref={ref} style={{ backgroundColor: bg[index] }}>
          Color is <span>{bg[index]}</span>
        </div>
      )
    }
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 320,
          },
        },
      ])
    })

    expect(tree.getByText('red')).toBeTruthy()
  })

  test('with theme breakpoints', () => {
    mockUseThemeUI.mockImplementation(() => ({
      theme: {
        breakpoints: ['480px', '640px'],
      },
    }))

    const Component = () => {
      const [ref, index] = useContainerQuery()
      const bg = ['red', 'blue', 'green']

      return (
        <div ref={ref} style={{ backgroundColor: bg[index] }}>
          Color is <span>{bg[index]}</span>
        </div>
      )
    }
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 540,
          },
        },
      ])
    })

    expect(tree.getByText('blue')).toBeTruthy()
  })

  test('use a default breakpoint index if ref is not used', () => {
    const Component = () => {
      const [_, index] = useContainerQuery()
      const bg = ['red', 'blue', 'green']

      return (
        <div style={{ backgroundColor: bg[index] }}>
          Color is <span>{bg[index]}</span>
        </div>
      )
    }
    let tree = render(<Component />)

    act(() => {
      handler([
        {
          contentRect: {
            width: 320,
          },
        },
      ])
    })

    expect(tree.getByText('red')).toBeTruthy()
  })
})

describe('getBreakpointIndex', () => {
  test('width is less than the min breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 320)).toEqual(0)
  })

  test('width is equal to the min breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 480)).toEqual(0)
  })

  test('width is in the range, on the left side', () => {
    expect(getBreakpointIndex([480, 640, 1024], 520)).toEqual(1)
  })

  test('width is bigger than the max breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 1280)).toEqual(3)
  })

  test('width is equal to the max breakpoint', () => {
    expect(getBreakpointIndex([480, 640, 1024], 1024)).toEqual(2)
  })

  test('width is in the range, on the right side', () => {
    expect(getBreakpointIndex([480, 640, 1024], 960)).toEqual(2)
  })

  test('array is empty', () => {
    expect(getBreakpointIndex([], 960)).toEqual(0)
  })
})
