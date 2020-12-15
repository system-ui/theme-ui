import { css, Theme } from '../src'

const theme: Theme = {
  buttons: {
    'call-to-action': {
      fontWeight: 900,
      bg: 'hotpink',
      color: 'white',
    },
  },
}

// What's the usecase? Is this documented?
describe('temporary test', () => {
  it('is this even documented?', () => {
    expect(
      JSON.stringify(
        css({
          variant: ((theme: Theme) => {
            const bestButtonVariant = Object.keys(
              theme.buttons!
            )[0 /* Math.random()? */]

            return `buttons.${bestButtonVariant}`
          }) as any,
        })(theme),
        null,
        2
      )
    ).toMatchInlineSnapshot(`
      "{
        \\"fontWeight\\": 900,
        \\"backgroundColor\\": \\"hotpink\\",
        \\"color\\": \\"white\\"
      }"
    `)
  })
})
