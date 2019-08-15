import React from 'react'
import { Styled, useThemeUI } from 'theme-ui'
import {
  FontFamily,
  HeadingStyle,
  TypeScale,
  TypeStyle,
} from '@theme-ui/style-guide'

export default props => {
  const { theme } = useThemeUI()
  const { fonts, fontWeights, lineHeights } = theme

  return (
    <section id="typography">
      <Styled.h2>Typography</Styled.h2>
      {fonts && (
        <div>
          <Styled.h3>Font Families</Styled.h3>
          {Object.keys(fonts).map(name => (
            <TypeStyle key={name} fontFamily={name}>
              {name}: {fonts[name]}
            </TypeStyle>
          ))}
        </div>
      )}
      {fontWeights && (
        <div>
          <Styled.h3>Font Weights</Styled.h3>
          {Object.keys(fontWeights).map(name => (
            <TypeStyle key={name} fontSize={2} fontWeight={name}>
              {name}: {fontWeights[name]}
            </TypeStyle>
          ))}
        </div>
      )}
      {lineHeights && (
        <div>
          <Styled.h3>Line Heights</Styled.h3>
          {Object.keys(lineHeights).map(name => (
            <TypeStyle key={name} fontSize={2} lineHeight={name}>
              {name}: {lineHeights[name]}
            </TypeStyle>
          ))}
        </div>
      )}
      <Styled.h3>Font Sizes</Styled.h3>
      <TypeScale />
    </section>
  )
}
