import React from 'react'
import Section from './Section'
import Input from './Input'

const Typography = ({ theme, setTheme }) => {
  return (
    <Section heading="Typography">
      <h3>Fonts</h3>
      {Object.keys(theme.fonts || {}).map(key => (
        <Input
          key={key}
          label={key}
          value={theme.fonts[key]}
          onChange={e => {
            setTheme({
              fonts: {
                [key]: e.target.value,
              },
            })
          }}
        />
      ))}
      <h3>Font Sizes</h3>
      {Array.isArray(theme.fontSizes)
        ? theme.fontSizes.map((n, i) => (
            <Input
              key={i}
              label={`theme.fontSizes[${i}]`}
              type="number"
              value={n}
              onChange={e => {
                const n = parseInt(e.target.value)
                setTheme({
                  fontSizes: [
                    ...theme.fontSizes.slice(0, i),
                    n,
                    ...theme.fontSizes.slice(i + 1),
                  ],
                })
              }}
            />
          ))
        : Object.keys(theme.fontSizes).map(key => (
            <Input
              key={key}
              label={`theme.fontSizes.${key}`}
              type="number"
              value={theme.fontSizes[key]}
              onChange={e => {
                const n = parseInt(e.target.value)
                setTheme({
                  fontSizes: {
                    [key]: n,
                  },
                })
              }}
            />
          ))}
    </Section>
  )
}

export default Typography
