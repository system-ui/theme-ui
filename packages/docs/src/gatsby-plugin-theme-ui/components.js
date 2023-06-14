import CodeBlock from '../components/code'
import Note from '../components/note'

const heading = (Tag) => (props) =>
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
        }}
      >
        {props.children}
      </a>
    </Tag>
  ) : (
    <Tag {...props} />
  )

const components = {
  pre: CodeBlock,
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  // "shortcodes"
  Note,
}

export default components
