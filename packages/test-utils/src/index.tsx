import * as React from 'react'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import * as tsSnippet from 'ts-snippet'
import { Theme, ThemeProvider } from 'theme-ui'

export * from '@testing-library/react'

export type {
  Assert,
  AssertFalse,
  AssertTrue,
  Has,
  IsAny,
  IsExact,
  IsNever,
  IsNullable,
  IsUnknown,
  NotHas,
} from 'conditional-type-checks'

export const renderHook = <T,>(
  useHook: () => T,
  options: { theme?: Theme } = {}
): {
  unmount: () => void
  rerender: (
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  ) => void
  readonly result: NonNullable<T>
} => {
  let value: T | undefined = undefined

  const Component = () => {
    value = useHook()
    return null
  }

  const { theme } = options
  const { unmount, rerender } = render(<Component />, {
    wrapper: theme && ((props) => <ThemeProvider theme={theme} {...props} />),
  })

  return {
    unmount,
    rerender,
    get result() {
      return value!
    },
  }
}

export const renderJSON = (
  el: Parameters<typeof renderer.create>[0]
): renderer.ReactTestRendererJSON | null => {
  const json = renderer.create(el).toJSON()
  if (Array.isArray(json)) {
    return json[0]
  }

  return json
}

/**
 * @param setupCode imports, common code
 * @example
 * const expectSnippet = expecter(`
 *  import { add } from './made-up/add'
 * `);
 *
 * expectSnippet(`
 *   const x = add(10, 20)
 * `).toInfer('x', 'number')
 */
export const expecter = (
  setupCode: string,
  options: { jsx?: boolean } = {}
) => {
  options = { jsx: true, ...options }

  const fileName = 'snippet.tsx'

  return (code: string) => {
    const compiler = new tsSnippet.Compiler({
      // same settings as our root tsconfig
      resolveJsonModule: true,
      esModuleInterop: true,
      moduleResolution: 'node',
      strict: true,
      jsx: 'react',
      isolatedModules: true,

      // for better error message snapshots
      noErrorTruncation: true,

      types: ['node'],
    })

    const snippets = tsSnippet.snippet(
      {
        [fileName]: `
        ${
          options.jsx
            ? `
            /** @jsx jsx **/
            import { jsx } from './packages/theme-ui'
          `
            : ''
        }
        ${setupCode}
        ${code}
      `,
      },
      compiler
    )

    return snippets.expect(fileName)
  }
}
