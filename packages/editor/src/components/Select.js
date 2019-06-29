/** @jsx jsx */
import { jsx } from 'theme-ui'
import Field from './Field'

const Select = ({ label, options, ...props }) => {
  return (
    <Field label={label} {...props}>
      <select {...props} css={{ width: '100%' }}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  )
}

export default Select
