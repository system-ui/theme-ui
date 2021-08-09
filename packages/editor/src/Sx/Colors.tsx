/** @jsx jsx */
import { jsx, Theme } from 'theme-ui'
import { ThemeColorPicker } from './ThemeColorPicker'

type Color = string
type OnChangeArg = { color: Color } | { bg: Color }

export interface ColorsProps {
  value?: {
    color?: string
    bg?: string
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
            onChange({ color: color as string })
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
            onChange({ bg: bg as string })
          }}
        />
        <div sx={{ fontWeight: 'bold', ml: 2 }}>Background Color</div>
      </div>
    </div>
  )
}
