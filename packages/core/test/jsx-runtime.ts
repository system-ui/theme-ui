/**
 * @jest-environment jsdom
 */

import { screen, render } from '@testing-library/react'
import { matchers } from '@emotion/jest'

import { jsx, jsxs } from '../src/jsx-runtime'

expect.extend(matchers)

describe('automatic JSX runtime in @theme-ui/core package', () => {
  test('jsx and jsxs', () => {
    render(
      jsxs('div', {
        'data-testid': 'bg-hotpink',
        sx: {
          bg: 'hotpink',
        },
        children: [
          'Hello ',
          jsx('b', {
            'data-testid': 'mx-20',
            sx: {
              mx: 20,
            },
            children: 'world',
          }),
        ],
      })
    )

    expect(screen.getByTestId('bg-hotpink')).toHaveStyleRule(
      'background-color',
      'hotpink'
    )
    expect(screen.getByTestId('mx-20')).toHaveStyleRule('margin-left', '20px')
    expect(screen.getByTestId('mx-20')).toHaveStyleRule('margin-right', '20px')
  })
})
