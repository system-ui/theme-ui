/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const XRay = props => (
  <div
    {...props}
    sx={{
      '*': {
        outline: '1px solid rgba(0, 255, 255, 0.25)',
      },
    }}
  />
)

export default props => (
  <XRay>
    <pre>Demo/debugging page</pre>
    <div
      sx={{
        display: 'grid',
        gridGap: 3,
        gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))',
      }}>
      <Styled.img src="https://source.unsplash.com/random/512x512?new-york" />
      <Styled.img src="https://source.unsplash.com/random/512x512?new-york" />
      <Styled.img src="https://source.unsplash.com/random/512x512?new-york" />
      <Styled.img src="https://source.unsplash.com/random/512x512?new-york" />
    </div>
  </XRay>
)
