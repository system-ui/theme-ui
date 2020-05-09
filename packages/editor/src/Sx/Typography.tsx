/** @jsx jsx */
import { jsx, Theme } from 'theme-ui'
import { Fragment } from 'react'
import { Field } from '@theme-ui/components'
import Combobox from '../Combobox'

type OnChangeArg =
  | { fontFamily: string }
  | { fontSize: number }
  | { fontWeight: string }
  | { lineHeight: string }
type TypographyProps = {
  tag?: string
  value?: {
    fontFamily?: string
    fontSize?: string | number
    fontWeight?: string
    lineHeight?: string
  }
  theme?: Theme
  onChange: (arg: OnChangeArg) => void
}

export const SxTypography = ({
  tag,
  value: { fontFamily, fontSize, fontWeight, lineHeight } = {},
  theme: {
    fonts = {},
    fontSizes = [],
    fontWeights = {},
    lineHeights = {},
  } = {},
  onChange,
}: TypographyProps) => {
  const prefixName = (name: string) => (tag ? `styles.${tag}.${name}` : name)

  return (
    <Fragment>
      <Combobox
        name={prefixName('fontFamily')}
        label="Font Family"
        value={fontFamily || ''}
        onChange={fontFamily => {
          onChange({ fontFamily })
        }}
        options={['inherit', ...Object.keys(fonts)]}
      />
      <div
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
        <Field
          // FIXME: Field type is comming from external package @types/theme-ui__components, Field is missing value prop in there
          name={prefixName('fontSize')}
          label="Font Size"
          value={fontSize || ''}
          type="number"
          onChange={e => {
            const fontSize = Number(e.target.value)
            onChange({ fontSize })
          }}
        />
        <Combobox
          name={prefixName('fontWeight')}
          label="Font Weight"
          value={fontWeight || ''}
          onChange={fontWeight => {
            onChange({ fontWeight })
          }}
          options={['inherit', ...Object.keys(fontWeights)]}
        />
        <Combobox
          name={prefixName('lineHeight')}
          label="Line Height"
          value={lineHeight || ''}
          onChange={lineHeight => {
            onChange({ lineHeight })
          }}
          options={['inherit', ...Object.keys(lineHeights)]}
        />
      </div>
    </Fragment>
  )
}

export default SxTypography
