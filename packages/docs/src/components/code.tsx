// @ts-check
import { Text } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
import Prism, { ThemeUIPrismProps } from '@theme-ui/prism'
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'
import * as themeUI from 'theme-ui'
import { ComponentPropsWithoutRef } from 'react'
import { PrismTheme } from 'prism-react-renderer'

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

const images = {
  nyc: 'https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  flatiron:
    'https://images.unsplash.com/photo-1520222984843-df35ebc0f24d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  logo: 'https://raw.githubusercontent.com/system-ui/theme-ui/stable/packages/docs/static/icon.png',
}

const scope = {
  ...themeUI,
  Link: (props: Record<string, any>) => {
    if (props.activeClassName)
      return <span className={props.activeClassName} {...props} />
    return <span {...props} sx={{ cursor: 'pointer' }} />
  },
  posts,
  images,
}

const stripTrailingNewline = (str: string) => {
  if (typeof str === 'string' && str[str.length - 1] === '\n') {
    return str.slice(0, -1)
  }
  return str
}

const transformCode = (src: string) => {
  return `<>${src}</>`
}

const liveTheme: PrismTheme = { plain: {}, styles: [] }

export const LiveCode = ({
  children,
  preview,
  xray,
}: {
  children: string
  preview?: boolean
  xray?: boolean
}) => {
  const code = stripTrailingNewline(children)

  if (preview) {
    return (
      <LiveProvider
        theme={liveTheme}
        code={code}
        scope={scope}
        transformCode={transformCode}
      >
        <LivePreview />
      </LiveProvider>
    )
  }

  return (
    <LiveProvider
      theme={liveTheme}
      code={code}
      scope={scope}
      transformCode={transformCode}
    >
      <div
        sx={{
          p: 3,
          variant: xray ? 'styles.xray' : undefined,
          border: (t) => `1px solid ${t.colors!.muted}`,
        }}
      >
        <LivePreview />
        <LiveError
          sx={{
            p: 3,
            fontFamily: 'monospace',
            fontSize: 0,
            color: 'secondary',
            bg: 'highlight',
            overflow: 'auto',
          }}
        />
      </div>
      <Themed.pre sx={{ p: 0, mt: 0, mb: 3 }}>
        <LiveEditor
          // @ts-expect-error
          padding="1rem"
          style={{
            fontFamily: 'inherit',
          }}
        />
      </Themed.pre>
    </LiveProvider>
  )
}

type LiveCodeBlockProps = {
  live: true
} & ComponentPropsWithoutRef<typeof LiveCode>
type UsualCodeBlockProps = {
  live?: false
  filename?: string
} & ThemeUIPrismProps
type CodeBlockProps = LiveCodeBlockProps | UsualCodeBlockProps

const CodeBlock = (props: CodeBlockProps) => {
  if (typeof props.children === 'object' && props.children) {
    props = {
      ...props,
      ...(props.children as any).props,
    }
  }

  if (props.live) {
    return (
      <LiveCode
        {...props}
        // @ts-expect-error
        style={{
          fontFamily: 'Menlo',
        }}
      />
    )
  } else {
    const { live: _, filename, ...rest } = props as UsualCodeBlockProps
    if (filename) {
      return (
        <section>
          <Text
            as="span"
            sx={{
              display: 'block',
              bg: 'gray',
              color: 'background',
              px: 3,
              py: 2,
              fontWeight: 'bold',
            }}
          >
            {filename}
          </Text>
          <Prism {...rest} sx={{ mt: 0 }} />
        </section>
      )
    } else {
      return <Prism {...rest} />
    }
  }
}

export default CodeBlock
