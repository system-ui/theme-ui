/** @jsx jsx */
/* eslint react/jsx-key: 0 */

import Highlight, { defaultProps } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

const aliases = {
  js: 'javascript',
  sh: 'bash',
}

const isInRange = (start, end, num) => {
  if (num >= start && num <= end) {
    return true
  }
  return false
}

const checkRanges = (range, num) => {
  for (let i = 0; i < range.length; i += 2) {
    if (isInRange(range[i], range[i + 1], num)) {
      return true
    }
  }
  return false
}

export default ({ children, className: outerClassName, title, ...props }) => {
  const [language] = outerClassName.replace(/language-/, '').split(' ')
  const lang = aliases[language] || language
  let startEndRangesToHighlight = []

  const findStartAndEndHighlights = tokens => {
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

  const isStartEndHighlighted = index => {
    return checkRanges(startEndRangesToHighlight, index)
  }

  const isInlineHighlighted = line => {
    const regex = new RegExp('// highlight-line$')
    for (let token of line) {
      if (regex.test(token.content)) {
        token.content = token.content.replace(regex, '') // remove the highlight-line comment now that we've acted on it
        return true
      }
    }
    return false
  }

  const shouldHighlightLine = (line, index) => {
    return isStartEndHighlighted(index) || isInlineHighlighted(line)
  }

  return (
    <Highlight
      {...defaultProps}
      {...props}
      code={children.trim()}
      language={lang}
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
