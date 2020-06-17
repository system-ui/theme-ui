import { expecter } from 'ts-snippet'
import { css } from '../src'

const expectSnippet = expecter(
  (code) => `
  import { css } from './packages/css/src'
  
  ${code}
`,
  { strict: true }
)

test('shows friendly error only on bad property', () => {
  expectSnippet(`
    css({
      bg: 'salmon',
      widows: 'foo',
      '> form': {
        color: 'blue',
        widows: 'bar',
        // unknown CSS property is accepted
        windows: 'baz',
      },
    })
  `).toFail(
    /Error snippet\.ts \(7,7\): Type '"foo"' is not assignable to type [\s\S]+'./
  )
})

test('shows friendly error on nested object', () => {
  expectSnippet(`
    css({
      bg: 'salmon',
      '> form': {
        color: 'blue',
        widows: 'bar',
      },
    })
  `).toFail(
    new RegExp(
      `Error snippet\\.ts \\(7,7\\): Type '{ color: string; widows: "bar"; }'` +
        ` is not assignable to type '[\\s\\S]+'.\\n\\s+` +
        `Types of property 'widows' are incompatible.\\n\\s+` +
        `Type '"bar"' is not assignable to type [\\s\\S]+`
    )
  )
})

test('accepts unknown CSS property without error', () => {
  expect(css({ '> form': { windows: 'baz' } })({})).toStrictEqual({
    '> form': { windows: 'baz' },
  })
})
