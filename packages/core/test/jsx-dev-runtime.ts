/**
 * @jest-environment jsdom
 */

import { screen, render } from '@testing-library/react'
import { matchers } from '@emotion/jest'

import { jsxDEV } from '../src/jsx-dev-runtime'

expect.extend(matchers)

describe('automatic JSX dev runtime in @theme-ui/core package', () => {
  test('jsxDEV', () => {
    const self = {}

    render(
      jsxDEV(
        'div',
        {
          'data-testid': 'bg-hotpink',
          sx: {
            bg: 'hotpink',
          },
          children: [
            'Hello ',
            jsxDEV(
              'b',
              {
                'data-testid': 'mx-20',
                sx: {
                  mx: 20,
                },
                children: 'world',
              },
              undefined,
              false,
              {
                filename: 'packages/core/src/jsx-dev-runtime.ts',
                lineNumber: 20,
                columnNumber: 13,
              },
              self
            ),
          ],
        },
        undefined,
        true,
        {
          filename: 'packages/core/src/jsx-dev-runtime.ts',
          lineNumber: 11,
          columnNumber: 7,
        },
        self
      )
    )

    expect(screen.getByTestId('bg-hotpink')).toHaveStyleRule(
      'background-color',
      'hotpink'
    )
    expect(screen.getByTestId('mx-20')).toHaveStyleRule('margin-left', '20px')
    expect(screen.getByTestId('mx-20')).toHaveStyleRule('margin-right', '20px')
  })
})
