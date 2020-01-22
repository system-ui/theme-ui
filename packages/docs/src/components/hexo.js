/** @jsx jsx */
import { jsx, useThemeUI, get } from 'theme-ui'
import { useState, useEffect } from 'react'
import merge from 'deepmerge'

const initialColorState = {
  '0': {
    '0': {
      top: 4,
      right: 4,
    },
    '2': {
      right: 1,
    },
    '3': {
      left: 0,
    },
    '4': {
      left: 1,
      top: 1,
    },
    '6': {
      left: 3,
    },
    '7': {
      left: 4,
      top: 4,
    },
    '8': {
      right: 1,
      left: 1,
    },
    '9': {
      right: 1,
      left: 0,
    },
  },
  '1': {
    '0': {
      left: 1,
      top: 4,
    },
    '1': {
      top: 2,
      right: 2,
    },
    '2': {
      top: 1,
    },
    '3': {
      left: 1,
      top: 0,
    },
    '4': {
      right: 1,
    },
    '5': {
      top: 3,
      left: 0,
      right: 0,
    },
    '6': {
      left: 1,
    },
    '7': {
      left: 1,
      top: 0,
      right: 1,
    },
    '8': {
      left: 2,
      top: 1,
      right: 0,
    },
    '9': {
      top: 1,
      right: 1,
      left: 2,
    },
  },
  '2': {
    '0': {
      top: 1,
    },
    '1': {
      left: 1,
      top: 1,
    },
    '3': {
      top: 1,
    },
    '4': {
      left: 1,
      top: 1,
    },
    '5': {
      top: 1,
    },
    '6': {
      top: 1,
    },
    '7': {
      left: 4,
      right: 4,
    },
    '8': {
      top: 1,
    },
    '9': {
      top: 2,
    },
  },
}

const HEX = 2 / Math.sqrt(3)
const colorNames = [
  'transparent',
  'primary',
  'secondary',
  'accent',
  'highlight',
  'muted',
]

const paths = {
  top: ['M 1 0', 'L 2 1', 'L 1 2', 'L 0 1', 'z'].join(' '),
  left: ['M 0 1', 'L 1 2', 'L 1 4', 'L 0 3', 'z'].join(' '),
  right: ['M 1 2', 'L 2 1', 'L 2 3', 'L 1 4', 'z'].join(' '),
}
const Tile = ({ type, x, y, ...props }) => {
  const inset = !!(y % 2)
  const transform = `translate(${x * 2 + (inset ? 1 : 0)} ${y * 3})`
  const d = paths[type]
  const color = colorNames[props.color] || 'transparent'
  return (
    <path
      {...props}
      sx={{
        color,
        transitionProperty: 'stroke, color',
        transitionTimingFunction: 'ease-out',
        transitionDuration: '.4s',
        stroke: 'currentcolor',
        '&:hover': {
          stroke: t => t.colors.primary,
        },
      }}
      fill="currentcolor"
      transform={transform}
      d={d}
    />
  )
}

const rand = l => Math.floor(Math.random() * (l + 1))
const sides = ['top', 'left', 'right']

const randomizeColors = colors => {
  // width/height hard-coded
  const side = sides[rand(2)]
  const color = rand(colorNames.length - 1)
  const row = rand(2)
  const column = rand(8)
  return merge(colors, {
    [row]: {
      [column]: {
        [side]: color,
      },
    },
  })
}

export default ({
  width = 32,
  height = 10,
  ratio = (4 / 3) * HEX,
  scale = 32,
  ...props
}) => {
  const { theme } = useThemeUI()
  const viewBox = [0, 0, width / ratio, height].join(' ')
  const rect = {
    width: width * scale,
    height: height * scale,
  }

  const defaultRows = Array.from({ length: height / 3 }).map((n, y) =>
    Array.from({ length: width / 3 }).map((o, x) => ({ x, y }))
  )
  const [rows, setRows] = useState(defaultRows)
  const [shift, setShift] = useState(false)
  const [colors, setColors] = useState(initialColorState)

  useEffect(() => {
    const handleKeyDown = e => {
      setShift(e.shiftKey)
    }
    const handleKeyUp = e => {
      setShift(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      setColors(randomizeColors)
    }
    const id = setInterval(tick, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  const handleClick = ({ type, x, y }) => e => {
    const i = get(colors, `${y}.${x}.${type}`, 0)
    const n = shift ? 0 : (i + 1) % colorNames.length
    setColors(state =>
      merge(state, {
        [y]: {
          [x]: {
            [type]: n,
          },
        },
      })
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      preserveAspectRatio="none"
      {...rect}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        overflow: 'visible',
        userSelect: 'none',
      }}>
      <g strokeWidth={1 / scale}>
        {rows.map(row =>
          row.map(({ x, y }) => (
            <g key={x + y}>
              <Tile
                type="top"
                x={x}
                y={y}
                onClick={handleClick({ x, y, type: 'top' })}
                color={get(colors, `${y}.${x}.top`)}
              />
              <Tile
                type="left"
                x={x}
                y={y}
                onClick={handleClick({ x, y, type: 'left' })}
                color={get(colors, `${y}.${x}.left`)}
              />
              <Tile
                type="right"
                x={x}
                y={y}
                onClick={handleClick({ x, y, type: 'right' })}
                color={get(colors, `${y}.${x}.right`)}
              />
            </g>
          ))
        )}
      </g>
    </svg>
  )
}
