// @ts-check
export default {
  '.comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url': {
    color: 'gray',
  },
  '.comment': {
    fontStyle: 'italic',
  },
  '.property, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable': {
    color: 'accent',
  },
  '.atrule, .attr-value, .keyword': {
    color: 'primary',
  },
  '.selector, .attr-name, .string, .char, .builtin, .inserted': {
    color: 'secondary',
  },
}
