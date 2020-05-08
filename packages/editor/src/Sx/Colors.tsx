/** @jsx jsx */
import { ColorResult } from 'react-color'
import { jsx, Theme } from 'theme-ui'
import ThemeColorPicker from './ThemeColorPicker'

type Color = string | ColorResult
type OnChangeArg = { color: Color } | { bg: Color }

type ColorsProps = {
  value: {
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
      // FIXME: All following keys trigger error "Type 'string' is not assignable to type 'SystemStyleObject'.ts(2322)", something seems to be wrong with the SystemStyleObject type.
      sx={{
        display: 'grid',
        gridGap: 2,
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
          onChange={color => {
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
          onChange={bg => {
            onChange({ bg })
          }}
        />
        <div sx={{ fontWeight: 'bold', ml: 2 }}>Background Color</div>
      </div>
    </div>
  )
}

export default Colors
