/** @jsx jsx */
import { jsx } from 'theme-ui'
import Downshift from 'downshift'
import Chevron from './Chevron'
import Label from './Label'

export const Combobox = ({
  options = [],
  label,
  name,
  onChange,
  value,
  defaultValue,
  preview,
  ...props
}) => {
  const hasPreview = typeof preview === 'function'
  return (
    <Downshift
      {...props}
      initialInputValue={defaultValue}
      inputValue={value}
      onInputValueChange={onChange}
      children={({
        getRootProps,
        getLabelProps,
        getInputProps,
        getMenuProps,
        getItemProps,
        getToggleButtonProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        inputValue,
      }) => (
        <div
          {...getRootProps({
            sx: {
              position: 'relative',
              zIndex: isOpen ? 2 : 0,
            },
          })}>
          <Label {...getLabelProps()}>{label}</Label>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            {hasPreview && (
              <div
                sx={{
                  textAlign: 'center',
                  width: 32,
                  mr: -32,
                }}>
                {preview(value)}
              </div>
            )}
            <input
              {...getInputProps()}
              sx={{
                appearance: 'none',
                fontFamily: 'inherit',
                fontSize: 16,
                width: '100%',
                height: 32,
                p: 0,
                pl: hasPreview ? 40 : 2,
                m: 0,
                border: '1px solid',
                borderColor: 'gray',
                color: 'inherit',
                bg: 'transparent',
                ':focus': {
                  borderColor: 'primary',
                  outline: '1px solid',
                },
              }}
            />
            <button
              {...getToggleButtonProps({
                sx: {
                  width: 32,
                  height: 32,
                  ml: -32,
                  p: 2,
                  appearance: 'none',
                  color: 'inherit',
                  bg: 'transparent',
                  border: '1px solid transparent',
                  backgroundClip: 'padding-box',
                  ':focus': {
                    outline: 'none',
                    color: 'primary',
                    bg: 'highlight',
                  },
                },
              })}>
              <Chevron size={16} />
            </button>
          </div>
          {isOpen && (
            <ul
              {...getMenuProps({
                sx: {
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '100%',
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                  mt: '-1px',
                  maxHeight: 512,
                  overflowY: 'auto',
                  bg: 'background',
                  border: '1px solid',
                  borderColor: 'gray',
                  boxShadow: '0 0 2px rgba(0,0,0,.25)',
                },
              })}>
              {options.map((opt, index) => (
                <li
                  {...getItemProps({
                    key: opt,
                    index,
                    item: opt,
                    sx: {
                      display: 'flex',
                      alignItems: 'center',
                      height: 32,
                      bg: highlightedIndex === index ? 'highlight' : null,
                    },
                  })}>
                  {hasPreview && (
                    <div sx={{ width: 32, textAlign: 'center' }}>
                      {preview(opt)}
                    </div>
                  )}
                  <div sx={{ px: 2 }}>{opt}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    />
  )
}

export default Combobox
