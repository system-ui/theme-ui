import { Theme } from '../src'
import { makeColorsScale, makeStyles, makeTheme } from '../src/utils'
import { AssertTrue, expecter, IsExact } from '@theme-ui/test-utils'

const symbolPretendingToBeTheme = Symbol() as Theme

describe(makeTheme, () => {
  it('returns input unchanged', () => {
    const actual = makeTheme(symbolPretendingToBeTheme)
    expect(actual).toEqual(symbolPretendingToBeTheme)
  })

  it('preserves type of the argument', () => {
    const theme = makeTheme({
      colors: {
        primary: 'tomato',
      },
    })

    type _ = AssertTrue<
      IsExact<typeof theme, { colors: { primary: 'tomato' } }>
    >
  })

  it('is exposed from entrypoint /utils and validates Theme type', () => {
    expecter('import { makeTheme } from "@theme-ui/css/utils"')(
      'const t = makeTheme("banana")'
    ).toFail(/Type '"banana"' has no properties in common with type 'Theme'./)
  })
})

describe(makeStyles, () => {
  it('returns input unchanged', () => {
    const actual = makeTheme(symbolPretendingToBeTheme)
    expect(actual).toEqual(symbolPretendingToBeTheme)
  })

  it('preserves type of the argument', () => {
    const styles = makeStyles({
      code: {},
    })

    type _ = AssertTrue<IsExact<typeof styles, { code: {} }>>
  })
})

describe(makeColorsScale, () => {
  it('returns input unchanged', () => {
    const actual = makeTheme(symbolPretendingToBeTheme)
    expect(actual).toEqual(symbolPretendingToBeTheme)
  })

  it('preserves type of the argument', () => {
    const colors = makeColorsScale({
      blue: {
        light: '#e6f7ff',
      },
    })

    type _ = AssertTrue<IsExact<typeof colors, { blue: { light: '#e6f7ff' } }>>
  })
})
