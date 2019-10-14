import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import { ThemeProvider } from 'theme-ui'
import { Box } from '../src'

expect.extend(matchers)

const renderJSON = el => renderer.create(el).toJSON()

test('renders', () => {
  const json = renderJSON(<Box p={2}>Hello</Box>)
  expect(json).toMatchSnapshot()
})

test.todo('renders with padding props')
test.todo('renders with margin props')
test.todo('renders with color props')
test.todo('renders with sx prop')
test.todo('renders with variant prop')
