/**
 * @jest-environment jsdom
 */

import { renderJSON } from '@theme-ui/test-utils'
import { ThemeUIProvider } from '@theme-ui/theme-provider'

import { Grid } from '..'

import { theme } from './__test-utils__'

describe('Grid', () => {
  test('renders', () => {
    const json = renderJSON(
      <ThemeUIProvider theme={theme}>
        <Grid />
        <Grid width="1fr" repeat="fit" />
      </ThemeUIProvider>
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

  test('renders with repeat and width props', () => {
    const json = renderJSON(<Grid repeat="fill" width={256} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with repeat and responsive width props', () => {
    const json = renderJSON(<Grid repeat="fill" width={[256, 512]} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with columns prop', () => {
    const json = renderJSON(<Grid columns={2} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with mixed columns prop', () => {
    const json = renderJSON(<Grid columns="1fr 2fr" />)
    expect(json).toMatchSnapshot()
  })

  test('renders with responsive columns prop', () => {
    const json = renderJSON(<Grid columns={[2, 3, 4]} />)
    expect(json).toMatchSnapshot()
  })

  test('renders with mixed columns prop', () => {
    const json = renderJSON(<Grid columns={[null, '1fr 2fr']} />)
    expect(json).toMatchSnapshot()
  })
})
