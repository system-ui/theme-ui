/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Label from './Label'

const Input = props => (
  <input
    {...props}
    sx={{
      appearance: 'none',
      color: 'inherit',
      bg: 'transparent',
      border: '1px solid',
      borderRadius: 2,
      display: 'block',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      p: 1,
      width: '100%',
    }}
  />
)

const Typography = ({ theme, setTheme }) => (
  <section>
    <h2>Typography</h2>
    <h3>Fonts</h3>
    {Object.keys(theme.fonts || {}).map(key => (
      <div
        key={key}
        sx={{
          mb: 2,
        }}>
        <Label htmlFor={key}>{key}</Label>
        <Input
          id={key}
          name={key}
          value={theme.fonts[key]}
          onChange={e => {
            setTheme({
              fonts: {
                [key]: e.target.value,
              },
            })
          }}
        />
      </div>
    ))}
    <h3>Font Sizes</h3>
    {Array.isArray(theme.fontSizes)
      ? theme.fontSizes.map((n, i) => (
          <div key={i} sx={{ mb: 2 }}>
            <Label htmlFor={`fontsize-${i}`}>Font Size {i}</Label>
            <Input
              key={i}
              id={`fontsize-${i}`}
              name={`fontsize-${i}`}
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
          </div>
        ))
      : Object.keys(theme.fontSizes).map(key => (
          <div key={key} sx={{ mb: 2 }}>
            <Label htmlFor={`fontSizes.${key}`}>fontSizes.{key}</Label>
            <Input
              id={`fontSizes.${key}`}
              name={`fontSizes.${key}`}
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
          </div>
        ))}
  </section>
)

export default Typography
