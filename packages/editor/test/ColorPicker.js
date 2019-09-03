import React from 'react'
import renderer from 'react-test-renderer'
import { render, act, fireEvent, cleanup } from '@testing-library/react'
import { ColorPicker } from '../src'

afterEach(cleanup)

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  })
}

test('renders with styles', () => {
  const json = renderer.create(<ColorPicker color="#f00" />).toJSON()
  expect(json).toMatchSnapshot()
})

/*

// Reakit Popover is not idempotent
test.skip('snapshot renders as a popover', () => {
  const json = renderer
    .create(
      <ColorPicker color="#f00">
        <button>Edit color</button>
      </ColorPicker>
    )
    .toJSON()
  expect(json).toMatchSnapshot()
})

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
