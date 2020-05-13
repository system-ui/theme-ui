/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import { ComponentProps } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { jsx, Styled } from 'theme-ui'

const aliases: Record<string, Language | undefined> = {
  js: 'javascript',
  sh: 'bash',
}

type HighlightProps = ComponentProps<typeof Highlight>
export interface ThemeUIPrismProps
  extends Omit<
    HighlightProps,
    'children' | 'code' | 'language' | 'theme' | 'Prism'
  > {
  className: string
  children: string
  Prism?: HighlightProps['Prism']
}
export default ({
  children,
  className: outerClassName,
  ...props
}: ThemeUIPrismProps) => {
  const [language] = outerClassName.replace(/language-/, '').split(' ')
  const lang = aliases[language] || language

  return (
    <Highlight
      {...defaultProps}
      {...props}
      code={children.trim()}
      language={lang as Language}
      theme={undefined}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Styled.pre className={`${outerClassName} ${className}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  {...getTokenProps({ token, key })}
                  sx={token.empty ? { display: 'inline-block' } : undefined}
                />
              ))}
            </div>
          ))}
        </Styled.pre>
      )}
    </Highlight>
  )
}
