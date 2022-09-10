/**
 * @jsxImportSource react
 * @jest-environment jsdom
 */
import { render } from '@theme-ui/test-utils'
import { ThemeProvider } from '@theme-ui/core'
import { matchers } from '@emotion/jest'

import { Themed } from '../src'

expect.extend(matchers)

describe(Themed.div.name, () => {
  it('accepts .sx prop', async () => {
    const tree = render(
      <ThemeProvider theme={{ colors: { primary: 'blue' } }}>
        <Themed.div sx={{ color: 'primary' }}>blue text</Themed.div>
      </ThemeProvider>
    )

    const div = await tree.findByText('blue text')
    const style = global.getComputedStyle(div)

    expect(style.color).toBe('blue')
  })
})

describe(`${Themed.td.name} and ${Themed.th.name}`, () => {
  it('maps "align" prop to "text-align" style', async () => {
    const tree = render(
      <Themed.table>
        <thead>
          <Themed.tr>
            <Themed.th align="left">Left</Themed.th>
            <Themed.th align="center">Center</Themed.th>
            <Themed.th align="right">Right</Themed.th>
          </Themed.tr>
        </thead>
        <tbody>
          <Themed.tr>
            <Themed.td align="left">TextLeft</Themed.td>
            <Themed.td align="center">TextCenter</Themed.td>
            <Themed.td align="right">TextRight</Themed.td>
          </Themed.tr>
        </tbody>
      </Themed.table>
    )

    expect(tree.getByText('Left')).toHaveStyleRule('text-align', 'left')
    expect(tree.getByText('Center')).toHaveStyleRule('text-align', 'center')
    expect(tree.getByText('Right')).toHaveStyleRule('text-align', 'right')
    expect(tree.getByText('TextLeft')).toHaveStyleRule('text-align', 'left')
    expect(tree.getByText('TextCenter')).toHaveStyleRule('text-align', 'center')
    expect(tree.getByText('TextRight')).toHaveStyleRule('text-align', 'right')
  })
})
