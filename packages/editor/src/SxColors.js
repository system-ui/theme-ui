/** @jsx jsx */
import { jsx } from 'theme-ui'
import ThemeColorPicker from './ThemeColorPicker'

export const SxColors = ({
  value: {
    color,
    bg,
  } = {},
  theme: {
    colors = {},
  } = {},
  onChange,
}) => {
  return (
    <div
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

export default SxColors
