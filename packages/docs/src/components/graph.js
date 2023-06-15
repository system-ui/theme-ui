import { get, useThemeUI } from 'theme-ui'
import { useState, useEffect } from 'react'
import merge from 'deepmerge'
import Logo from './logo'

const colors = ['background', 'primary', 'secondary', 'accent']

const initialState = {
  0: {
    0: 0,
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 0,
    6: 0,
    7: 1,
    8: 3,
    9: 2,
  },
  1: {
    0: 1,
    1: 1,
    2: 1,
    3: 0,
    4: 1,
    5: 1,
    6: 1,
    7: 3,
    8: 3,
    9: 2,
  },
  2: {
    0: 0,
    1: 1,
    2: 0,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 3,
    8: 0,
    9: 2,
  },
}

const Node = ({ x, y, color = 0, ...props }) => {
  const inset = !!(y % 2)

  // adjust for logo position
  const isLogo = y === 2 && x === 0

  return (
    <circle
      {...props}
      cx={x * 3 + (inset ? 2.5 : 1)}
      cy={y * 3 + 1}
      r={1}
      fill="currentcolor"
      strokeWidth={1 / 8}
      sx={{
        color: isLogo ? 'background' : colors[color] || 'background',
        transitionProperty: 'stroke, color',
        transitionTimingFunction: 'ease-out',
        transitionDuration: '.4s',
        '&:hover': {
          stroke: (t) => t.colors.highlight,
        },
      }}
    />
  )
}

const Edges = ({ x, y, state }) => {
  const inset = !!(y % 2)
  const transform = `translate(${x * 3 + (inset ? 1 : 0)} ${y * 3})`
  const angles = []
  const active = state[y] && state[y][x]
  if (!active) return false
  const start = `M ${inset ? 1.5 : 1} 1`
  const paths = [`${start} h3`, `${start} l1.5 3`, `${start} l-1.5 3`]

  if (state[y][x + 1]) {
    angles.push(0)
  }
  if (inset) {
    if (state[y + 1] && state[y + 1][x]) {
      angles.push(2)
    }
    if (state[y + 1] && state[y + 1][x + 1]) {
      angles.push(1)
    }
  } else {
    if (state[y + 1] && state[y + 1][x]) {
      angles.push(1)
    }
    if (state[y + 1] && state[y + 1][x - 1]) {
      angles.push(2)
    }
  }

  return (
    <g transform={transform}>
      {angles.map((n) => (
        <path
          key={n}
          d={paths[n]}
          fill="none"
          stroke="currentcolor"
          strokeWidth={1 / 4}
          sx={{
            color: colors[active],
            transitionProperty: 'stroke, color',
            transitionTimingFunction: 'ease-out',
            transitionDuration: '.4s',
          }}
        />
      ))}
    </g>
  )
}

const rand = (l) => Math.floor(Math.random() * (l + 1))
const randomizeColors = (state) => {
  const color = rand(colors.length - 1)
  return merge(state, {
    [rand(2)]: {
      [rand(9)]: color,
    },
  })
}

const Graph = ({ width = 32, height = 9, scale = 32 }) => {
  const { theme } = useThemeUI()
  const rows = Array.from({ length: height / 3 }).map((n, y) =>
    Array.from({
      length: Math.floor(width / 3 + (y % 2 ? 0 : 1)),
    }).map((o, x) => ({ x, y }))
  )
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const tick = () => {
      setState(randomizeColors)
    }
    const id = setInterval(tick, 600)
    return () => {
      clearInterval(id)
    }
  }, [])

  const handleClick =
    ({ x, y }) =>
    (e) => {
      const i = get(state, [y, x].join('.'), 0)
      const n = (i + 1) % colors.length
      setState((s) =>
        merge(s, {
          [y]: {
            [x]: n,
          },
        })
      )
    }

  const logo = {}
  logo.key = get(colors, get(state, '2.0'))
  if (logo.key !== 'background') {
    logo.color = get(theme.colors, logo.key)
  } else {
    logo.color = get(theme.colors, 'text')
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      sx={{
        maxWidth: '100%',
        width: '100%',
        height: 'auto',
        overflow: 'visible',
        userSelect: 'none',
      }}
    >
      <rect width={width} height={height} fill="none" />
      {rows.map((row) =>
        row.map(({ x, y }) => (
          <g key={x + y}>
            <Edges x={x} y={y} state={state} />
            <Node
              x={x}
              y={y}
              color={get(state, [y, x].join('.'), 0)}
              onClick={handleClick({ x, y })}
            />
          </g>
        ))
      )}
      <g transform="translate(0 6)">
        <Logo size={2} color={logo.color} />
      </g>
    </svg>
  )
}

export default Graph
