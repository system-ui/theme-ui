/**
 * @jest-environment jsdom
 */

import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'reakit/Provider'
import mockConsole from 'jest-mock-console'

import { ColorPicker } from '../src'

const { act } = renderer

afterEach(cleanup)

if ((global as any).document) {
  document.createRange = () =>
    ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    } as unknown as Range)
}

test('renders with styles', () => {
  // ignore react-color dependency-related warning
  const restore = mockConsole()
  const json = renderer.create(<ColorPicker color="#f00" />).toJSON()
  expect(json).toMatchSnapshot()
  restore()
})

test('snapshot renders as a popover', () => {
  // ignore react-color dependency-related warning
  const restore = mockConsole()
  const json = renderer
    .create(
      <Provider>
        <ColorPicker color="#f00">
          <button>Edit color</button>
        </ColorPicker>
      </Provider>
    )
    .toJSON()
  expect(json).toMatchSnapshot()
  restore()
})

test('inputs fire onChange', () => {
  let next
  let tree
  const onChange = jest.fn((e) => (next = e))
  act(() => {
    tree = render(
      <ColorPicker color="#f00" onChange={onChange} size={512}>
        <button>Edit color</button>
      </ColorPicker>
    )
  })
  const button = tree.getByText('Edit color')
  act(() => {
    fireEvent.click(button)
  })
  const hueInput = tree.getByPlaceholderText('hue')
  act(() => {
    fireEvent.change(hueInput, {
      target: {
        value: '20',
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hsl.h).toBe(20)
  const saturationInput = tree.getByPlaceholderText('saturation')
  act(() => {
    fireEvent.change(saturationInput, {
      target: {
        value: '90',
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hsl.s).toBeCloseTo(0.9, 8)
  const lightnessInput = tree.getByPlaceholderText('lightness')
  act(() => {
    fireEvent.change(lightnessInput, {
      target: {
        value: 80,
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hsl.l).toBeCloseTo(0.8, 8)
})

/*
test('renders with children', () => {
  const tree = render(
    <ColorPicker color="#f00">
      <button>Edit color</button>
    </ColorPicker>
  )
  const button = tree.getByText('Edit color')
  expect(button).toBeTruthy()
})

test('renders as a popover', () => {
  let tree
  act(() => {
    tree = render(
      <ColorPicker color="#f00">
        <button>Edit color</button>
      </ColorPicker>
    )
  })
  const button = tree.getByText('Edit color')
  act(() => {
    fireEvent.click(button)
  })
  const popover = tree.getByLabelText('Edit color')
  expect(popover).toBeTruthy()
})

test('inputs fire onChange', () => {
  let next
  let tree
  const onChange = jest.fn(e => (next = e))
  act(() => {
    tree = render(
      <ColorPicker color="#f00" onChange={onChange}>
        <button>Edit color</button>
      </ColorPicker>
    )
  })
  const button = tree.getByText('Edit color')
  act(() => {
    fireEvent.click(button)
  })
  const input = tree.getByPlaceholderText('hex')
  act(() => {
    fireEvent.change(input, {
      target: {
        value: '#0ff',
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hex).toBe('#00ffff')
})

test('hue inputs fire onChange', () => {
  let next
  let tree
  const onChange = jest.fn(e => (next = e))
  act(() => {
    tree = render(
      <ColorPicker color="#f00" onChange={onChange}>
        <button>Edit color</button>
      </ColorPicker>
    )
  })
  const button = tree.getByText('Edit color')
  act(() => {
    fireEvent.click(button)
  })
  const input = tree.getByPlaceholderText('hue')
  act(() => {
    fireEvent.change(input, {
      target: {
        value: '280',
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hsl.h).toBe(280)
})

test('saturation inputs fire onChange', () => {
  let next
  let tree
  const onChange = jest.fn(e => (next = e))
  act(() => {
    tree = render(
      <ColorPicker color="#f00" onChange={onChange}>
        <button>Edit color</button>
      </ColorPicker>
    )
  })
  const button = tree.getByText('Edit color')
  act(() => {
    fireEvent.click(button)
  })
  const input = tree.getByPlaceholderText('saturation')
  act(() => {
    fireEvent.change(input, {
      target: {
        value: '0',
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hsl.s).toBe(0)
})

test('lightness inputs fire onChange', () => {
  let next
  let tree
  const onChange = jest.fn(e => (next = e))
  act(() => {
    tree = render(
      <ColorPicker color="#f00" onChange={onChange}>
        <button>Edit color</button>
      </ColorPicker>
    )
  })
  const button = tree.getByText('Edit color')
  act(() => {
    fireEvent.click(button)
  })
  const input = tree.getByPlaceholderText('lightness')
  act(() => {
    fireEvent.change(input, {
      target: {
        value: '0',
      },
    })
  })
  expect(onChange).toHaveBeenCalled()
  expect(next.hsl.l).toBe(0)
})
*/
