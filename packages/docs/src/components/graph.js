/** @jsx jsx */
import { jsx, get } from 'theme-ui'
import { useState, useEffect } from 'react'
import merge from 'deepmerge'

const colors = [
  'transparent',
  'primary',
  'secondary',
  'accent',
  // 'highlight',
  // 'muted',
]

const Node = ({ x, y, color }) => {
  const inset = !!(y % 2)
  return (
    <circle
      cx={x * 3 + (inset ? 2.5 : 1)}
      cy={y * 3 + 1}
      r={1}
      fill="currentcolor"
      strokeWidth={1 / 8}
      sx={{
        color: colors[color] || 'transparent',
        transitionProperty: 'stroke, color',
        transitionTimingFunction: 'ease-out',
        transitionDuration: '.4s',
        // stroke: 'currentcolor',
        '&:hover': {
          stroke: t => t.colors.primary,
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
  if (state[y + 1] && state[y + 1][x]) {
    if (inset) {
      angles.push(2)
    } else {
      angles.push(1)
    }
  }
  if (state[y + 1] && state[y + 1][x - 1] && !inset) {
    angles.push(2)
  }

  return (
    <g transform={transform}>
      {angles.map(n => (
        <path
          key={n}
          d={paths[n]}
          fill="none"
          stroke="currentcolor"
          strokeWidth={1 / 4}
          // transform={`rotate(${n})`}
          sx={{
            // transformOrigin: '1 1',
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

const rand = l => Math.floor(Math.random() * (l + 1))
const randomizeColors = state => {
  const color = rand(colors.length - 1)
  return merge(state, {
    [rand(2)]: {
      [rand(9)]: color,
    },
  })
}

export default ({ width = 32, height = 9, scale = 32 }) => {
  const rows = Array.from({ length: height / 3 }).map((n, y) =>
    Array.from({
      length: Math.floor(width / 3 + (y % 2 ? 0 : 1)),
    }).map((o, x) => ({ x, y }))
  )
  const [colors, setColors] = useState({
    0: {
      0: 3,
    },
  })
  const viewBox = `0 0 ${width} ${height}`
  const dimensions = {
    width: width * scale,
    height: height * scale,
  }

  useEffect(() => {
    const tick = () => {
      setColors(randomizeColors)
    }
    const id = setInterval(tick, 100)
    return () => {
      clearInterval(id)
    }
  }, [])

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
      }}>
      <rect width={width} height={height} fill="none" />
      {rows.map(row =>
        row.map(({ x, y }) => (
          <g key={x + y}>
            <Edges x={x} y={y} state={colors} />
            <Node x={x} y={y} color={get(colors, `${y}.${x}`)} />
          </g>
        ))
      )}
    </svg>
  )
}
