/**
 * @jest-environment jsdom
 * @jsxImportSource react
 */
// @ts-check

import { jest } from '@jest/globals'
import { useMDXComponents, MDXProvider } from '@mdx-js/react-v2'
import { render } from '@theme-ui/test-utils'
import { matchers } from '@emotion/jest'

import { defaultMdxComponents, useThemedStylesWithMdx } from '../src'

import { evalMdx } from './__test-utils__/evalMdx.mjs'

expect.extend(matchers)

describe('defaultMdxComponents with MDX v2', () => {
  describe(`${defaultMdxComponents.th.name} and ${defaultMdxComponents.td.name}`, () => {
    it('has correct text-align style in tables', async () => {
      // Markdown :--, :--: and --: are mapped to `align` prop on the component.

      const markdown = `\
| Left              | Center              | Right              |
| :---------------- | :-----------------: | -----------------: |
| Left-aligned text | Center-aligned text | Right-aligned text |
`

      const MarkdownTable = await evalMdx(markdown)

      const thSpy = jest.spyOn(defaultMdxComponents, 'th')
      const tdSpy = jest.spyOn(defaultMdxComponents, 'td')

      function MyProvider({ children }) {
        const components = useThemedStylesWithMdx(useMDXComponents())

        return <MDXProvider components={components}>{children}</MDXProvider>
      }

      const tree = render(
        <MyProvider>
          <MarkdownTable />
        </MyProvider>
      )

      const thProps = thSpy.mock.calls.map((call) => call[0].align)
      expect(thProps).toEqual(['left', 'center', 'right'])

      const tdProps = tdSpy.mock.calls.map((call) => call[0].align)
      expect(tdProps).toEqual(['left', 'center', 'right'])

      expect(tree.getByText('Left')).toHaveStyleRule('text-align', 'left')
      expect(tree.getByText('Center')).toHaveStyleRule('text-align', 'center')
      expect(tree.getByText('Right')).toHaveStyleRule('text-align', 'right')
      expect(tree.getByText('Left-aligned text')).toHaveStyleRule(
        'text-align',
        'left'
      )
      expect(tree.getByText('Center-aligned text')).toHaveStyleRule(
        'text-align',
        'center'
      )
      expect(tree.getByText('Right-aligned text')).toHaveStyleRule(
        'text-align',
        'right'
      )
    })
  })
})
