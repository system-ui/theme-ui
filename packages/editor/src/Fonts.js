// fonts input
/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui'
import Downshift from 'downshift'
// import leven from 'leven'

const defaultFonts = [
  'system-ui, sans-serif',
  '"Helvetica Neue", Helvetica, Arial, sans-serif',
  '"Avenir Next", Helvetica, Arial, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Roboto, sans-serif',
  '"Open Sans", sans-serif',
  'Menlo, monospace',
  '"Roboto Condensed", sans-serif',
  '"Roboto Mono", monospace',
]

export const FontField = ({
  fonts = defaultFonts,
  label = 'Font Family',
  name,
  onChange,
  value,
  defaultValue,
  ...props
}) => (
  <Downshift
    {...props}
    initialInputValue={defaultValue}
    inputValue={value}
    onInputValueChange={onChange}
    children={({
      getLabelProps,
      getInputProps,
      getMenuProps,
      getItemProps,
      isOpen,
      highlightedIndex,
      selectedItem,
      inputValue,
    }) => (
      <div>
        <label {...getLabelProps()}>{label}</label>
        <input {...getInputProps()} />
        <ul {...getMenuProps()}>
          {isOpen &&
            fonts.map((font, index) => (
              <li
                {...getItemProps({
                  key: font,
                  index,
                  item: font,
                  style: {
                    backgroundColor: highlightedIndex === index ? 'cyan' : null,
                  },
                })}>
                {font}
              </li>
            ))}
        </ul>
      </div>
    )}
  />
)

export default props => {
  const context = useThemeUI()
  const { fonts = {} } = context.theme

  const onChange = key => val => {
    context.setTheme({
      fonts: {
        [key]: val,
      },
    })
  }

  return (
    <div>
      {Object.keys(fonts).map(key => (
        <FontField
          key={key}
          label={key}
          value={fonts[key]}
          onChange={onChange(key)}
        />
      ))}
    </div>
  )
}
