import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import { ThemeProvider } from 'theme-ui'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
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
} from '../src'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

const theme = {
  boxes: {
    beep: {
      p: 4,
      bg: 'highlight',
    },
  },
  cards: {
    primary: {
      p: 3,
      bg: 'muted',
      borderRadius: 4,
    },
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
    },
  },
  text: {
    heading: {
      fontSize: 5,
    },
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  links: {
    nav: {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
}

describe('Box', () => {
  test('renders', () => {
    const json = renderJSON(<Box p={2}>Hello</Box>)
    expect(json).toMatchSnapshot()
  })

  test('renders with padding props', () => {
    const json = renderJSON(<Box px={2} py={4} />)
    expect(json).toHaveStyleRule('padding-left', '8px')
    expect(json).toHaveStyleRule('padding-right', '8px')
    expect(json).toHaveStyleRule('padding-top', '32px')
    expect(json).toHaveStyleRule('padding-bottom', '32px')
  })

  test('renders with margin props', () => {
    const json = renderJSON(<Box m={3} mb={4} />)
    expect(json).toHaveStyleRule('margin', '16px')
    expect(json).toHaveStyleRule('margin-bottom', '32px')
  })

  test('renders with color props', () => {
    const json = renderJSON(<Box color="tomato" bg="black" />)
    expect(json).toHaveStyleRule('color', 'tomato')
    expect(json).toHaveStyleRule('background-color', 'black')
  })

  test('renders with sx prop', () => {
    const json = renderJSON(
      <Box
        sx={{
          bg: 'tomato',
          borderRadius: 4,
        }}
      />
    )
    expect(json).toHaveStyleRule('background-color', 'tomato')
    expect(json).toHaveStyleRule('border-radius', '4px')
  })

  test('renders with variant prop', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box variant="boxes.beep" />
      </ThemeProvider>
    )
    expect(json).toHaveStyleRule('background-color', 'highlight')
    expect(json).toHaveStyleRule('padding', '32px')
  })

  test('renders with base styles', () => {
    const json = renderJSON(
      <Box
        __css={{
          p: 4,
          color: 'black',
          bg: 'white',
        }}
        bg="cyan"
        sx={{
          color: 'tomato',
        }}
      />
    )
    expect(json).toHaveStyleRule('padding', '32px')
    expect(json).toHaveStyleRule('color', 'tomato')
    expect(json).toHaveStyleRule('background-color', 'cyan')
  })

  test('renders with __themeKey variant', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Box __themeKey="boxes" variant="beep" />
      </ThemeProvider>
    )
    expect(json).toHaveStyleRule('background-color', 'highlight')
    expect(json).toHaveStyleRule('padding', '32px')
  })
})

describe('Button', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Card', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Card />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Flex', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Flex />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Grid', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Grid />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with width prop', () => {
    const json = renderJSON(<Grid width={256} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with responsive width prop', () => {
    const json = renderJSON(<Grid width={[256, 512]} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with columns prop', () => {
    const json = renderJSON(<Grid columns={2} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with responsive columns prop', () => {
    const json = renderJSON(<Grid columns={[2, 3, 4]} />)
    expect(json).toMatchSnapshot()
  })
})

describe('Heading', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Heading />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Image', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Image variant="avatar" />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Link', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Link variant="nav" />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Text', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Text />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Label', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Label />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Input', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Input />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Select', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Select />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })

  test('renders with style props', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Select
          mb={3}
          value='hello'
        />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Textarea', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Textarea />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Radio', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Radio />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Checkbox', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Checkbox />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Slider', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Slider />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Field', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Field />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Progress', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Progress />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Donut', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Donut />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Spinner', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Avatar', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Avatar />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Badge', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Badge />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Close', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Close />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Alert', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Alert />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Divider', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Divider />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Embed', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Embed />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('AspectRatio', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <AspectRatio />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('AspectImage', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <AspectImage />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Container', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Container />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('NavLink', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <NavLink />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('Message', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Message />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('IconButton', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <IconButton />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})

describe('MenuButton', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <MenuButton />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
