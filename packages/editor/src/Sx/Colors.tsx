/** @jsx jsx */
import { ColorState } from 'react-color'
import { jsx, Theme } from 'theme-ui'
import ThemeColorPicker from './ThemeColorPicker'

type Color = string | ColorState
type OnChangeArg = { color: Color } | { bg: Color }

export interface ColorsProps {
  value?: {
    color?: string | number
    bg?: string | number
  }
  theme?: Theme
  onChange: (arg: OnChangeArg) => void
}

export const Colors = ({
  value: { color, bg } = {},
  theme,
  onChange,
}: ColorsProps) => {
  return (
    <div
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(2, 1fr)',
        my: 3,
      }}>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <ThemeColorPicker
          theme={theme}
          value={color || ''}
          onChange={(color) => {
            onChange({ color })
          }}
        />
        <div sx={{ fontWeight: 'bold', ml: 2 }}>Color</div>
      </div>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <ThemeColorPicker
          theme={theme}
          value={bg || ''}
          onChange={(bg) => {
            onChange({ bg })
          }}
        />
        <div sx={{ fontWeight: 'bold', ml: 2 }}>Background Color</div>
      </div>
    </div>
  )
}

export default Colors
