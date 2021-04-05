import React from 'react'
import { Flex, Themed, useThemeUI } from 'theme-ui'
import { TypeScale, TypeStyle } from '@theme-ui/style-guide'

const Row = (props) => (
  <Flex
    {...props}
    sx={{
      alignItems: 'baseline',
      flexWrap: 'wrap',
      mx: -3,
      '& > div': {
        px: 3,
      },
    }}
  />
)

export default (props) => {
  const { theme } = useThemeUI()
  const { fonts, fontWeights, lineHeights } = theme

  return (
    <section id="typography">
      <Themed.h2>Typography</Themed.h2>
      {fonts && (
        <div>
          <Themed.h3>Font Families</Themed.h3>
          <Row>
            {Object.keys(fonts).map((name) => (
              <div key={name}>
                <TypeStyle fontFamily={name} fontSize={6}>
                  Aa
                </TypeStyle>
                <Themed.code title={fonts[name]}>{name}</Themed.code>
              </div>
            ))}
          </Row>
        </div>
      )}
      <Themed.h3>Font Sizes</Themed.h3>
      <TypeScale />
      {fontWeights && (
        <div>
          <Themed.h3>Font Weights</Themed.h3>
          <Row>
            {Object.keys(fontWeights).map((name) => (
              <div key={name}>
                <TypeStyle fontSize={6} fontWeight={name}>
                  {fontWeights[name]}
                </TypeStyle>
                <Themed.code>{name}</Themed.code>
              </div>
            ))}
          </Row>
        </div>
      )}
      {lineHeights && (
        <div>
          <Themed.h3>Line Heights</Themed.h3>
          <Row>
            {Object.keys(lineHeights).map((name) => (
              <div key={name}>
                <TypeStyle fontSize={6} lineHeight={name}>
                  {lineHeights[name]}
                </TypeStyle>
                <Themed.code>{name}</Themed.code>
              </div>
            ))}
          </Row>
        </div>
      )}
    </section>
  )
}
