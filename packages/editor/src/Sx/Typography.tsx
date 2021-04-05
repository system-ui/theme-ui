/** @jsx jsx */
import { jsx, Theme } from 'theme-ui'
import { Fragment } from 'react'
import { Field } from '@theme-ui/components'
import Combobox from '../Combobox'

type TypographyPropsValue = {
  fontFamily?: string
  fontSize?: string | number
  fontWeight?: string | number
  lineHeight?: string | number
}

type OnChangeArg = {
  [P in keyof TypographyPropsValue]: {
    [K in P]: Exclude<TypographyPropsValue[P], undefined>
  }
}[keyof TypographyPropsValue]

export interface TypographyProps {
  tag?: string
  value?: TypographyPropsValue
  theme?: Theme
  onChange: (arg: OnChangeArg) => void
}

export const Typography = ({
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
        onChange={(fontFamily) => {
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
          name={prefixName('fontSize')}
          label="Font Size"
          value={fontSize || ''}
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const fontSize = Number(e.target.value)
            onChange({ fontSize })
          }}
        />
        <Combobox
          name={prefixName('fontWeight')}
          label="Font Weight"
          value={fontWeight || ''}
          onChange={(fontWeight) => {
            onChange({ fontWeight })
          }}
          options={['inherit', ...Object.keys(fontWeights)]}
        />
        <Combobox
          name={prefixName('lineHeight')}
          label="Line Height"
          value={lineHeight || ''}
          onChange={(lineHeight) => {
            onChange({ lineHeight })
          }}
          options={['inherit', ...Object.keys(lineHeights)]}
        />
      </div>
    </Fragment>
  )
}
