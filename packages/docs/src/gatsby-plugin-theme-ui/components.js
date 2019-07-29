/** @jsx jsx */
import { jsx } from 'theme-ui'

import Prism from '@theme-ui/prism'

const heading = Tag => props =>
  !!props.id ? (
    <Tag {...props}>
      <a
        href={`#${props.id}`}
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline',
          },
        }}>
        {props.children}
      </a>
    </Tag>
  ) : (
    <Tag {...props} />
  )

export default {
  code: Prism,
  pre: props => props.children,
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
}
