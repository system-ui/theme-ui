import React from 'react'
import merge from '../src/merge'

test('deeply merges objects', () => {
  const result = merge(
    {
      beep: 'boop',
      hello: {
        hi: 'howdy',
      },
    },
    {
      bleep: 'bloop',
      hello: {
        ohaiyo: 'osu',
      },
    }
  )
  expect(result).toEqual({
    beep: 'boop',
    bleep: 'bloop',
    hello: {
      hi: 'howdy',
      ohaiyo: 'osu',
    },
  })
})

test('merges multiple objects', () => {
  const result = merge.all(
    {
      beep: 'boop',
    },
    {
      bleep: 'bloop',
    },
    {
      plip: 'plop',
    }
  )
  expect(result).toEqual({
    beep: 'boop',
    bleep: 'bloop',
    plip: 'plop',
  })
})

test('does not attempt to merge React components', () => {
  const h1 = React.forwardRef(props => <h1 {...props} />)
  const result = merge(
    {
      h1: props => <h1 {...props} />,
    },
    {
      h1,
    }
  )
  expect(result).toEqual({ h1 })
})
