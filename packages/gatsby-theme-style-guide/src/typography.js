/** @jsx jsx */
import { jsx, Styled, useThemeUI } from 'theme-ui'
import {
  TypeScale,
  TypeStyle,
} from '@theme-ui/style-guide'

const Row = props => (
  <div
    {...props}
    sx={{
      display: 'flex',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      mx: -3,
      '& > div': {
        px: 3,
      },
    }}
  />
)

export default props => {
  const { theme } = useThemeUI()
  const { fonts, fontWeights, lineHeights } = theme

  return (
    <section id="typography">
      <Styled.h2>Typography</Styled.h2>
      {fonts && (
        <div>
          <Styled.h3>Font Families</Styled.h3>
          <Row>
            {Object.keys(fonts).map(name => (
              <div key={name}>
                <TypeStyle fontFamily={name} fontSize={6}>
                  Aa
                </TypeStyle>
                <Styled.code title={fonts[name]}>{name}</Styled.code>
              </div>
            ))}
          </Row>
        </div>
      )}
      <Styled.h3>Font Sizes</Styled.h3>
      <TypeScale />
      {fontWeights && (
        <div>
          <Styled.h3>Font Weights</Styled.h3>
          <Row>
            {Object.keys(fontWeights).map(name => (
              <div key={name}>
                <TypeStyle fontSize={6} fontWeight={name}>
                  {fontWeights[name]}
                </TypeStyle>
                <Styled.code>{name}</Styled.code>
              </div>
            ))}
          </Row>
        </div>
      )}
      {lineHeights && (
        <div>
          <Styled.h3>Line Heights</Styled.h3>
          <Row>
            {Object.keys(lineHeights).map(name => (
              <div key={name}>
                <TypeStyle fontSize={6} lineHeight={name}>
                  {lineHeights[name]}
                </TypeStyle>
                <Styled.code>{name}</Styled.code>
              </div>
            ))}
          </Row>
        </div>
      )}
    </section>
  )
}
