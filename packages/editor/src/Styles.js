/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEditor } from './context'
import Combobox from './Combobox'
import Field from './Field'
import { defaultSpace } from './defaults'
import ThemeColorPicker from './ThemeColorPicker'
//
// import ColorPicker from './ColorPicker'

// todo
// - [ ] typography
// - [ ] color
// - [ ] margin
// - [ ] responsive arrays

export default ({ tag = 'root' }) => {
  const context = useEditor()
  // console.log(context)
  const {
    styles = {},
    colors = {},
    fonts = {},
    fontSizes = [],
    lineHeights = {},
    fontWeights = {},
    space = defaultSpace,
  } = context.theme

  const style = styles[tag] || {}

  const setStyle = next => {
    context.setTheme({
      styles: {
        [tag]: {
          ...style,
          ...next,
        },
      },
    })
  }

  return (
    <div>
      <b>{tag}</b>
      <Combobox
        name={`styles.${tag}.fontFamily`}
        label="Font Family"
        value={style.fontFamily || ''}
        onChange={fontFamily => {
          setStyle({ fontFamily })
        }}
        options={['inherit', ...Object.keys(fonts)]}
      />
      <Field
        name={`styles.${tag}.fontSize`}
        label="Font Size"
        value={style.fontSize || ''}
        type="number"
        onChange={val => {
          const fontSize = Number(val)
          setStyle({ fontSize })
        }}
      />
      <Combobox
        name={`styles.${tag}.fontWeight`}
        label="Font Weight"
        value={style.fontWeight || ''}
        onChange={fontWeight => {
          setStyle({ fontWeight })
        }}
        options={['inherit', ...Object.keys(fontWeights)]}
      />
      <Combobox
        name={`styles.${tag}.lineHeight`}
        label="Line Height"
        value={style.lineHeight || ''}
        onChange={lineHeight => {
          setStyle({ lineHeight })
        }}
        options={['inherit', ...Object.keys(lineHeights)]}
      />
      <div>
        Color
        <ThemeColorPicker
          value={style.color || ''}
          onChange={color => {
            console.log({ color })
            setStyle({ color })
          }}>
          <div>Color</div>
        </ThemeColorPicker>
      </div>
    </div>
  )
}
