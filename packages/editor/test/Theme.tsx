import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act,
} from '@testing-library/react'
import { useThemeUI, ThemeUIContextValue, __ThemeUIContext } from 'theme-ui'
import { EditorProvider, Theme } from '../src'

afterEach(cleanup)

if ((global as any).document) {
  document.createRange = () =>
    (({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    } as unknown) as Range)
}

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  fontSizes: [12, 14, 16, 20, 24, 32],
  space: [0, 4, 8, 16, 32],
}

test('edits theme.colors', async () => {
  let context: ThemeUIContextValue
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.Colors />
      <GetContext />
    </EditorProvider>
  )
  const swatch = tree.getByText('text')
  fireEvent.click(swatch)
  const [input] = await waitForElement(() =>
    tree.getAllByPlaceholderText('hex')
  )
  fireEvent.change(input, {
    target: {
      value: '#ff0000',
    },
  })
  expect(context!.theme!.colors!.text).toBe('#ff0000')
})

test('edits theme.colors within a color mode', async () => {
  let context: ThemeUIContextValue
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <__ThemeUIContext.Provider
      value={{
        colorMode: 'dark',
        theme: {},
        __EMOTION_VERSION__: undefined as any,
      }}>
      <EditorProvider theme={theme}>
        <Theme.Colors />
        <GetContext />
      </EditorProvider>
    </__ThemeUIContext.Provider>
  )
  const swatch = tree.getByText('text')
  fireEvent.click(swatch)
  const [input] = await waitForElement(() =>
    tree.getAllByPlaceholderText('hex')
  )
  act(() => {
    fireEvent.change(input, {
      target: {
        value: '#ff0000',
      },
    })
  })
  expect(context!.theme!.colors!.modes!.dark.text).toBe('#ff0000')
})

test('edits theme.fontSizes', async () => {
  let context: ThemeUIContextValue
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.FontSizes />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('0'))
  fireEvent.change(input, {
    target: {
      value: '11',
    },
  })
  expect(context!.theme!.fontSizes![0]).toBe(11)
})

test('supports non-array theme.fontSizes objects', async () => {
  let context: any
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider
      theme={{
        fontSizes: {
          small: 12,
          normal: 16,
          large: 24,
        },
      }}>
      <Theme.FontSizes />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('small'))
  fireEvent.change(input, {
    target: {
      value: '11',
    },
  })
  expect(context!.theme!.fontSizes!.small!).toBe(11)
})

test('renders without a theme', () => {
  let context: ThemeUIContextValue
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider>
      <Theme.Fonts />
      <Theme.FontSizes />
      <Theme.FontWeights />
      <Theme.LineHeights />
      <Theme.Space />
      <GetContext />
    </EditorProvider>
  )
  expect(context!.theme).toEqual({})
})

test('edits theme.fontWeights', async () => {
  let context: any
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.FontWeights />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('body'))
  fireEvent.change(input, {
    target: {
      value: '500',
    },
  })
  expect(context.theme.fontWeights.body).toBe('500')
})

test('edits theme.lineHeights', async () => {
  let context: any
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.LineHeights />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('body'))
  fireEvent.change(input, {
    target: {
      value: '1.625',
    },
  })
  expect(context.theme.lineHeights.body).toBe(1.625)
})

test('edits theme.fonts', async () => {
  let context: any
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.Fonts />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('body'))
  fireEvent.change(input, {
    target: {
      value: 'Georgia',
    },
  })
  expect(context.theme.fonts.body).toBe('Georgia')
  expect(context.theme.fonts.heading).toBe('Georgia, serif')
})

test('edits theme.space', async () => {
  let context: any
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider theme={theme}>
      <Theme.Space />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('0'))
  fireEvent.change(input, {
    target: {
      value: '2',
    },
  })
  expect(context!.theme.space[0]).toBe(2)
  expect(context!.theme.space[1]).toBe(4)
})

test('supports non-array theme.space objects', async () => {
  let context: any
  const GetContext = () => {
    context = useThemeUI()
    return null
  }
  const tree = render(
    <EditorProvider
      theme={{
        space: {
          small: 4,
          normal: 8,
          large: 16,
        },
      }}>
      <Theme.Space />
      <GetContext />
    </EditorProvider>
  )
  const input = await waitForElement(() => tree.getByLabelText('small'))
  fireEvent.change(input, {
    target: {
      value: '3',
    },
  })
  expect(context!.theme.space.small).toBe(3)
})
