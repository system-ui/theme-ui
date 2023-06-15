/**
 * @jest-environment jsdom
 */

import React from 'react'
import { renderJSON } from '@theme-ui/test-utils'
import { ThemeUIProvider } from '@theme-ui/theme-provider'
import {
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Paragraph,
  Text,
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Field,
  Progress,
  Donut,
  Spinner,
  Avatar,
  Badge,
  Close,
  Alert,
  Divider,
  Embed,
  AspectRatio,
  AspectImage,
  Container,
  NavLink,
  Message,
  IconButton,
  MenuButton,
  Switch,
} from '..'

import { theme } from './__test-utils__'

describe('Card', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Card />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Flex', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Flex />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Heading', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Heading />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Image', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Image variant="avatar" />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Link', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Link variant="nav" />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Paragraph', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Paragraph />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with variant prop', () => {
    const variant = 'block'
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Paragraph variant={variant}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Paragraph>
      </ThemeUIProvider>
    )
    const style = theme.text[variant]
    expect(json).toHaveStyleRule('text-align', style.textAlign)
    expect(json).toHaveStyleRule('text-align-last', style.textAlignLast)
    expect(json).toHaveStyleRule('text-justify', style.textJustify)
  })

  test('renders with sx prop', () => {
    const margin = '8px'
    const json = renderJSON(
      <Paragraph
        sx={{
          margin,
        }}
      />
    )
    expect(json).toHaveStyleRule('margin', margin)
  })

  test('renders with space prop overrides', () => {
    const margin = '8px'
    const json = renderJSON(<Paragraph m={margin} />)
    expect(json).toHaveStyleRule('margin', margin)
  })

  test('renders with theme override', () => {
    const margin = '8px'
    const json = renderJSON(
      <ThemeUIProvider theme={{ text: { paragraph: { margin } } }}>
        <Paragraph />
      </ThemeUIProvider>
    )
    expect(json).toHaveStyleRule('margin', margin)
  })

  test('renders with theme variant', () => {
    const margin = '8px'
    const json = renderJSON(
      <ThemeUIProvider theme={{ text: { override: { margin } } }}>
        <Paragraph variant="override" />
      </ThemeUIProvider>
    )
    expect(json).toHaveStyleRule('margin', margin)
  })
})

describe('Text', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Text />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Label', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Label />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Input', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Input />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Select', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Select />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with style props', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Select mb={3} value="hello" />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with custom icon', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Select
          arrow={
            <svg>
              <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
            </svg>
          }
        />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with background-color', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={{ colors: { background: 'blueviolet' } }}>
        <Select />
      </ThemeUIProvider>
    )!

    expect(json.children?.[0]).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-background)'
    )
  })
})

describe('Textarea', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Textarea />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Radio', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Radio />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Checkbox', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Checkbox />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Slider', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Slider />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Field', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Field />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
  test('renders with id prop', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Field id="test-field" />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Progress', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Progress />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Donut', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Donut title="Donut" value={0} />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Spinner', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Spinner />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Avatar', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Avatar />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Badge', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Badge />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Close', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Close />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Alert', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Alert />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Divider', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Divider />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Embed', () => {
  test('renders with box system props', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Embed mx="auto" py={4} />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with title', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Embed title="Embed" />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('AspectRatio', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <AspectRatio />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('AspectImage', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <AspectImage />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Container', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Container />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('NavLink', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <NavLink />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Message', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Message />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('IconButton', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <IconButton />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('MenuButton', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <MenuButton />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Switch', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Switch />
      </ThemeUIProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
