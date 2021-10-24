/** @jsx jsx */
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { jsx, Themed } from 'theme-ui'

const aliases: Record<string, Language | undefined> = {
  js: 'javascript',
  sh: 'bash',
}

const isInRange = (start: number, end: number, num: number) => {
  if (num >= start && num <= end) {
    return true
  }
  return false
}

const checkRanges = (range: number[], num: number) => {
  for (let i = 0; i < range.length; i += 2) {
    if (isInRange(range[i], range[i + 1], num)) {
      return true
    }
  }
  return false
}

type HighlightProps = React.ComponentPropsWithoutRef<typeof Highlight>
// prism-react-renderer doesn't export `Token` type
type Tokens = Parameters<HighlightProps['children']>[0]['tokens']
type Token = Tokens[number][number]

export interface ThemeUIPrismProps
  extends Omit<
    HighlightProps,
    'children' | 'code' | 'language' | 'theme' | 'Prism'
  > {
  className: string
  children: string
  Prism?: HighlightProps['Prism']
}
export default function ThemeUIPrism({
  children,
  className: outerClassName,
  ...props
}: ThemeUIPrismProps) {
  const [language] = outerClassName.replace(/language-/, '').split(' ')
  const lang = aliases[language] || language
  let startEndRangesToHighlight: number[] = []
  let countHighlightCommentsRemoved: number = 0;

  const findStartAndEndHighlights = (tokens: Token[][]) => {
    const tokensWithoutHighlightComments = tokens.filter((item, index) => {
      const removeLine = item
        .map(({ content }) => {
          if (content.trim() === '// highlight-start') {
            /**
             * Track highlighted lines, including countHighlightCommentsRemoved 
             * so we can keep track of multiple highlight-start and highlight-end blocks. 
             * */
            startEndRangesToHighlight.push(index - countHighlightCommentsRemoved)
            countHighlightCommentsRemoved += 1; 
            return true
          }
          if (content.trim() === '// highlight-end') {
            /**
             * Subtract by (countHighlightCommentsRemoved + 1) to account for 
             * the current highlight-end block being removed.
             * */
            startEndRangesToHighlight.push(index - (countHighlightCommentsRemoved + 1))
            countHighlightCommentsRemoved += 1; 
            return true
          }
        })
        .filter(Boolean)[0]
      if (!removeLine) {
        return item
      }
    })
    return tokensWithoutHighlightComments
  }

  const isStartEndHighlighted = (index: number) => {
    return checkRanges(startEndRangesToHighlight, index)
  }

  const isInlineHighlighted = (line: Token[]) => {
    const regex = new RegExp('// highlight-line$')
    for (let token of line) {
      if (regex.test(token.content)) {
        token.content = token.content.replace(regex, '') // remove the highlight-line comment now that we've acted on it
        return true
      }
    }
    return false
  }

  const shouldHighlightLine = (line: Token[], index: number) => {
    return isStartEndHighlighted(index) || isInlineHighlighted(line)
  }

  return (
    <Highlight
      {...defaultProps}
      {...props}
      code={children.trim()}
      language={lang as Language}
      theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const tokensWithoutHighlightComments = findStartAndEndHighlights(tokens)
        return (
          <Themed.pre
            className={`${outerClassName} ${className}`}
            style={style}>
            {tokensWithoutHighlightComments.map((line, i) => {
              const lineProps = getLineProps({ line, key: i })
              if (shouldHighlightLine(line, i)) {
                lineProps.className = `${lineProps.className} highlight`
              }
              return (
                <div {...lineProps}>
                  {line.map((token, key) => (
                    <span
                      {...getTokenProps({ token, key })}
                      sx={token.empty ? { display: 'inline-block' } : undefined}
                    />
                  ))}
                </div>
              )
            })}
          </Themed.pre>
        )
      }}
    </Highlight>
  )
}
