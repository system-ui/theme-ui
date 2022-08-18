import { parseProps } from '../src/parseProps'

describe('parseProps', () => {
  test('does not touch props if not relevant', () => {
    expect(parseProps(null)).toBeNull()

    const props1 = {}
    expect(parseProps(props1)).toBe(props1)

    const props2 = { foo: 'bar', baz: 'qux' }
    expect(parseProps(props2)).toBe(props2)
  })

  test('parses sx prop', () => {
    const propsSxEmpty = parseProps({
      foo: 'bar',
      sx: {},
    })
    expect(propsSxEmpty).toEqual({
      foo: 'bar',
      css: expect.any(Function),
    })
    expect(propsSxEmpty.css({})).toEqual([{}, undefined])

    const propsSxMx = parseProps({
      foo: 'bar',
      sx: {
        mx: 'TEST_MX_NO_THEME',
      },
    })
    expect(propsSxMx).toEqual({
      foo: 'bar',
      css: expect.any(Function),
    })
    expect(propsSxMx.css({})).toEqual([
      {
        marginLeft: 'TEST_MX_NO_THEME',
        marginRight: 'TEST_MX_NO_THEME',
      },
      undefined,
    ])
    expect(
      propsSxMx.css({
        space: {
          TEST_MX_NO_THEME: 'TEST_MARGIN_WITH_THEME',
        },
      })
    ).toEqual([
      {
        marginLeft: 'TEST_MARGIN_WITH_THEME',
        marginRight: 'TEST_MARGIN_WITH_THEME',
      },
      undefined,
    ])
  })

  test('parses css prop', () => {
    const propsCssEmpty = parseProps({
      foo: 'bar',
      css: {},
    })
    expect(propsCssEmpty).toEqual({
      foo: 'bar',
      css: expect.any(Function),
    })
    expect(propsCssEmpty.css({})).toEqual([{}, {}])

    const propsCssMargin = parseProps({
      foo: 'bar',
      css: {
        margin: 'TEST_MARGIN_NO_THEME',
      },
    })
    expect(propsCssMargin).toEqual({
      foo: 'bar',
      css: expect.any(Function),
    })
    expect(propsCssMargin.css({})).toEqual([
      {},
      {
        margin: 'TEST_MARGIN_NO_THEME',
      },
    ])
    expect(
      propsCssMargin.css({
        space: {
          TEST_MARGIN_NO_THEME: 'TEST_MARGIN_WITH_THEME',
        },
      })
    ).toEqual([
      {},
      {
        margin: 'TEST_MARGIN_NO_THEME',
      },
    ])

    const propsCssFunction = parseProps({
      foo: 'bar',
      css: (theme: any) => ({
        margin: theme.TEST_THEME_KEY,
        padding: 'TEST_CSS_FUNCTION',
      }),
    })
    expect(propsCssFunction).toEqual({
      foo: 'bar',
      css: expect.any(Function),
    })
    expect(
      propsCssFunction.css({
        TEST_THEME_KEY: 'TEST_THEME_VALUE',
      })
    ).toEqual([
      {},
      {
        margin: 'TEST_THEME_VALUE',
        padding: 'TEST_CSS_FUNCTION',
      },
    ])
  })

  test('parses sx and css props together', () => {
    const props = parseProps({
      foo: 'bar',
      sx: {
        bg: 'hotpink',
      },
      css: {
        padding: '20px',
      },
    })
    expect(props).toEqual({
      foo: 'bar',
      css: expect.any(Function),
    })
    expect(props.css({})).toEqual([
      {
        backgroundColor: 'hotpink',
      },
      {
        padding: '20px',
      },
    ])
    expect(
      props.css({
        colors: {
          hotpink: 'coolpink',
        },
      })
    ).toEqual([
      {
        backgroundColor: 'coolpink',
      },
      {
        padding: '20px',
      },
    ])
  })
})
