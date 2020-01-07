import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import { Sx } from '../src'

afterEach(cleanup)

const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  colors: {
    primary: 'tomato',
  },
}

const style = {
  fontFamily: 'body',
  fontSize: 4,
  fontWeight: 'bold',
  color: 'primary',
}

describe('Sx.Typography', () => {
  test('edits sx.fontFamily', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Typography
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const input = await waitForElement(() => tree.findByLabelText('Font Family'))
    fireEvent.change(input, {
      target: {
        value: 'Georgia',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ fontFamily: 'Georgia' })
  })

  test('edits sx.fontSize', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Typography
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const input = await waitForElement(() => tree.findByLabelText('Font Size'))
    fireEvent.change(input, {
      target: {
        value: '2',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ fontSize: 2 })
  })

  test('edits sx.fontWeight', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Typography
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const input = await waitForElement(() => tree.findByLabelText('Font Weight'))
    fireEvent.change(input, {
      target: {
        value: '500',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ fontWeight: '500' })
  })

  test('edits sx.lineHeight', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Typography
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const input = await waitForElement(() => tree.findByLabelText('Line Height'))
    fireEvent.change(input, {
      target: {
        value: '1.625',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ lineHeight: '1.625' })
  })
})

describe('Sx.Margin', () => {
  test('edits sx.ml', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Margin
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const input = await waitForElement(() => tree.findByLabelText('Margin Left'))
    fireEvent.change(input, {
      target: {
        value: '2',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ ml: 2 })
  })

  test('edits sx.mx', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Margin
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const checkbox = await waitForElement(() => tree.findByLabelText('Lock x-axis'))
    const input = await waitForElement(() => tree.findByLabelText('Margin Left'))
    fireEvent.click(checkbox)
    fireEvent.change(input, {
      target: {
        value: '3',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ mx: 3 })
  })
})
