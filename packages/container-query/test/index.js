/** @jsx jsx */
import { render, cleanup, act } from '@testing-library/react'
import { useContainerQuery } from '../src'

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
