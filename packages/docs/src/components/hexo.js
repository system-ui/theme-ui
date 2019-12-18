/** @jsx jsx */
import { jsx, useThemeUI, get } from 'theme-ui'
import { useState } from 'react'
import merge from 'deepmerge'

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
  top: [
    'M 1 0',
    'L 2 1',
    'L 1 2',
    'L 0 1',
    'z',
  ].join(' '),
  left: [
    'M 0 1',
    'L 1 2',
    'L 1 4',
    'L 0 3',
    'z',
  ].join(' '),
  right: [
    'M 1 2',
    'L 2 1',
    'L 2 3',
    'L 1 4',
    'z',
  ].join(' '),
}
const Tile = ({
  type,
  x,
  y,
  ...props
}) => {
  const inset = !!(y % 2)
  const transform = `translate(${x * 2 + (inset ? 1 : 0)} ${y * 3})`
  const d = paths[type]
  const color = colorNames[props.color] || 'transparent'
  return (
    <path
      {...props}
      sx={{
        color,
        transitionProperty: 'stroke',
        transitionTimingFunction: 'ease-out',
        transitionDuration: '.4s',
        stroke: 'transparent',
        '&:hover': {
          stroke: t => t.colors.primary,
        }
      }}
      fill='currentcolor'
      transform={transform}
      d={d}
    />
  )
}

export default ({
  width = 32,
  height = 10,
  ratio = 4/3 * HEX,
  scale = 32,
  ...props
}) => {
  const { theme } = useThemeUI()
  const viewBox = [
    0,
    0,
    width / ratio,
    height
  ].join(' ')
  const rect = {
    width: width * scale,
    height: height * scale,
  }

  const defaultRows = Array.from({ length: height / 3 })
    .map((n, y) =>
      Array.from({ length: width / 3 }).map((o, x) => ({x, y}))
    )
  const [rows, setRows] = useState(defaultRows)
  const [colors, setColors] = useState({})

  const handleClick = ({ type, x, y }) => e => {
    console.log({ type, x, y })
    const i = get(colors, `${y}.${x}.${type}`, 0)
    const n = (i + 1) % colorNames.length
    setColors(state => merge(state, {
      [y]: {
        [x]: {
          [type]: n,
        }
      }
    }))
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox}
      preserveAspectRatio='none'
      {...rect}
      sx={{
        maxWidth: '100%',
        height: 'auto',
        overflow: 'visible',
        userSelect: 'none',
      }}>
      <g
        strokeWidth={2/scale}>
        {rows.map(row => (
          row.map(({ x, y }) =>
            <g key={x+y}>
              <Tile type='top' x={x} y={y}
                onClick={handleClick({ x, y, type: 'top' })}
                color={get(colors, `${y}.${x}.top`)}
              />
              <Tile type='left' x={x} y={y}
                onClick={handleClick({ x, y, type: 'left' })}
                color={get(colors, `${y}.${x}.left`)}
              />
              <Tile type='right' x={x} y={y}
                onClick={handleClick({ x, y, type: 'right' })}
                color={get(colors, `${y}.${x}.right`)}
              />
            </g>
          )
        ))}
      </g>
    </svg>
  )
}
