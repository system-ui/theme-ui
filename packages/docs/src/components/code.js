/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import Prism from '@theme-ui/prism'
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'

const posts = [
  {
    title: 'A Conceptual Look at Theming',
    id: '/a-conceptual-look-at-theming',
    slug: '/a-conceptual-look-at-theming',
    excerpt:
      'The word theme can mean a lot of different things and invoke a lot of different interpretations, which can be both a blessing and a curse.',
    date: '2019-08-10',
  },
  {
    title: 'Code Literacy',
    id: '/code-literacy',
    slug: '/code-literacy',
    excerpt: `Ah yes, everyone's favorite question: should designers code? As much as I'd love to pontificate on the matter, I think the framing of this question is fundamentally wrong.`,
    date: '2019-07-25',
  },
  {
    title: 'Portability',
    id: '/portability',
    slug: '/portability',
    excerpt: `In software development, formats help ensure that content and data are portable and can be used in many different applications.`,
    date: '2019-07-23',
  },
  {
    title: 'Themeability',
    id: '/themeability',
    slug: '/themeability',
    excerpt: `I've been interested in the idea of constraint-based design for a while. By constraining the solution space for a particular problem, new and novel ideas can emerge beyond the initial problem's scope.`,
    date: '2019-07-21',
  },
]

const scope = {
  jsx,
  Styled,
  Link: props => {
    if (props.activeClassName)
      return <span className={props.activeClassName} {...props} />
    return <span {...props} sx={{ cursor: 'pointer' }} />
  },
  posts,
}

const transformCode = src => `/** @jsx jsx */\n${src}`

const liveTheme = { styles: [] }

export const LiveCode = ({ children, preview, xray }) => {
  if (preview) {
    return (
      <LiveProvider
        theme={liveTheme}
        code={children}
        scope={scope}
        transformCode={transformCode}>
        <LivePreview />
      </LiveProvider>
    )
  }

  return (
    <LiveProvider
      theme={liveTheme}
      code={children}
      scope={scope}
      transformCode={transformCode}>
      <div
        sx={{
          p: 3,
          variant: xray ? 'styles.xray' : null,
          border: t => `1px solid ${t.colors.muted}`,
        }}>
        <LivePreview />
        <LiveError
          sx={{
            p: 3,
            fontFamily: 'monospace',
            fontSize: 0,
            color: 'secondary',
            bg: 'highlight',
          }}
        />
      </div>
      <Styled.pre
        sx={{
          my: 0,
        }}>
        <LiveEditor padding={0} />
      </Styled.pre>
    </LiveProvider>
  )
}

export default props => {
  if (props.live) {
    return <LiveCode {...props} />
  }
  return <Prism {...props} />
}
