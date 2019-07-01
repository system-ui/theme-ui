/** @jsx jsx */
import { jsx } from 'theme-ui'

const Section = ({ children, heading }) => {
  return (
    <section
      sx={{ mb: 4, pb: 4, borderBottom: '1px solid', borderColor: 'muted' }}
    >
      <h2>{heading}</h2>
      {children}
    </section>
  )
}

export default Section
