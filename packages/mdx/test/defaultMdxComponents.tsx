import { defaultMdxComponents } from '../src'

describe('defaultMdxComponents', () => {
  it('has keys matching inline snapshot', () => {
    expect(Object.keys(defaultMdxComponents)).toMatchInlineSnapshot(`
      [
        "p",
        "b",
        "i",
        "a",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "img",
        "pre",
        "code",
        "ol",
        "ul",
        "li",
        "blockquote",
        "hr",
        "em",
        "table",
        "tr",
        "th",
        "td",
        "strong",
        "del",
        "inlineCode",
        "thematicBreak",
        "div",
        "root",
      ]
    `)
  })
})
