import { Theme, __internalGetUseRootStyles } from '../src'

const booleans = [true, false]

describe(__internalGetUseRootStyles, () => {
  it('works without first argument', () => {
    expect(__internalGetUseRootStyles(undefined)).toStrictEqual({
      scope: 'body',
      rootStyles: undefined,
    })
  })

  it.each(booleans)(
    'when theme.useRootStyles is set %p, scope is html',
    (value) => {
      const theme: Theme = {
        useRootStyles: value,
      }

      expect(__internalGetUseRootStyles(theme)).toStrictEqual({
        scope: 'html',
        rootStyles: value,
      })
    }
  )

  it.each(booleans)(
    'when useBodyStyles is set to %p, scope is body',
    (value) => {
      const theme: Theme = {
        useBodyStyles: value,
        useRootStyles: null,
      }

      expect(__internalGetUseRootStyles(theme)).toStrictEqual({
        scope: 'body',
        rootStyles: value,
      })
    }
  )
})
