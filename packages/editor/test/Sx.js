import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import { Sx } from '../src'

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

const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  colors: {
    primary: '#07c',
    secondary: '#0c7',
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

describe('Sx.Padding', () => {
  test('edits sx.pl', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Padding
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const input = await waitForElement(() => tree.findByLabelText('Padding Left'))
    fireEvent.change(input, {
      target: {
        value: '4',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ pl: 4 })
  })

  test('edits sx.px', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Padding
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const checkbox = await waitForElement(() => tree.findByLabelText('Lock x-axis'))
    const input = await waitForElement(() => tree.findByLabelText('Padding Right'))
    fireEvent.click(checkbox)
    fireEvent.change(input, {
      target: {
        value: '3',
      }
    })
    expect(onChange).toHaveBeenCalledWith({ px: 3 })
  })
})

describe('Sx.Colors', () => {
  test('edits sx.color', async () => {
    const onChange = jest.fn()
    const tree = render(
      <Sx.Colors
        theme={theme}
        value={style}
        onChange={onChange}
      />
    )
    const [ button ] = await waitForElement(() => tree.findAllByRole('button'))
    fireEvent.click(button)
    const dialog = await waitForElement(() => tree.findByRole('dialog'))
    // not ideal labeling - only works with hex?
    const [ swatch ] = await waitForElement(() => tree.findAllByTitle('#0c7'))
    fireEvent.click(swatch)
    expect(onChange).toHaveBeenCalledWith({ color: 'secondary' })
  })

  test.skip('edits sx.bg', async () => {
  })
})
