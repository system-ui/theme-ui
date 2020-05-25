/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import { ComponentProps } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

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

type HighlightProps = ComponentProps<typeof Highlight>
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

  const findStartAndEndHighlights = (tokens: Token[][]) => {
    const tokensWithoutHighlightComments = tokens.filter((item, index) => {
      const removeLine = item
        .map(({ content }) => {
          if (content === '// highlight-start') {
            startEndRangesToHighlight.push(index) // track our highlighted lines
            return true
          }
          if (content === '// highlight-end') {
            startEndRangesToHighlight.push(index - 2) // since we're removing start and end lines, we'll shorten the range by 2 lines
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
          <Styled.pre
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
          </Styled.pre>
        )
      }}
    </Highlight>
  )
}
