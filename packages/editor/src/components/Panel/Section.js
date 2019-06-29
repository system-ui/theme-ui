/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Heading } from '../Typography'

const Section = ({ children, heading }) => {
  return (
    <section
      sx={{ mb: 4, pb: 4, borderBottom: '1px solid', borderColor: 'muted' }}
    >
      <Heading level={2}>{heading}</Heading>
      {children}
    </section>
  )
}

export default Section
