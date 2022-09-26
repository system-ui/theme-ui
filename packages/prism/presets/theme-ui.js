// @ts-check

const syntaxStyles = {
  '.comment': {
    fontStyle: 'italic',
  },
  '.property, .tag, .boolean, .number, .constant, .symbol, .function, .class-name, .regex, .important, .variable':
    { color: 'accent' },
  '.atrule, .attr-value, .keyword': {
    color: 'primary',
  },
  '.selector, .attr-name, .string, .char, .builtin, .inserted': {
    color: 'secondary',
  },
  '.deleted': {
    color: 'accent',
    fontStyle: 'italic',
  },
  '.comment,.prolog,.doctype,.cdata,.punctuation.punctuation,.operator,.entity,.url':
    { color: 'gray' },
}

export default syntaxStyles
