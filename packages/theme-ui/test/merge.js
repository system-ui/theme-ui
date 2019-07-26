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
  const h1 = React.forwardRef((props, ref) => <h1 ref={ref} {...props} />)
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

test('primitive types override arrays', () => {
  const result = merge(
    {
      fontSize: [3, 4, 5],
    },
    {
      fontSize: 4,
    }
  )
  expect(result).toEqual({
    fontSize: 4,
  })
})

test('arrays override arrays', () => {
  const result = merge(
    {
      fontSize: [3, 4, 5],
    },
    {
      fontSize: [6, 7],
    }
  )
  expect(result).toEqual({
    fontSize: [6, 7],
  })
})

test('arrays override primitive types', () => {
  const result = merge(
    {
      fontSize: 5,
    },
    {
      fontSize: [6, 7],
    }
  )
  expect(result).toEqual({
    fontSize: [6, 7],
  })
})
