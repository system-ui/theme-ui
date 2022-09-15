import { styles } from '../src'

test('snapshot', () => {
  expect(styles).toMatchInlineSnapshot(`
    {
      "b": {
        "fontWeight": "bold",
      },
      "blockquote": {
        "margin": 0,
        "marginBottom": 3,
        "mx": 3,
        "padding": 0,
      },
      "code": {
        "fontSize": "85%",
      },
      "h1": {
        "fontFamily": "heading",
        "fontSize": 5,
        "fontWeight": "heading",
        "lineHeight": "heading",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "h2": {
        "fontFamily": "heading",
        "fontSize": 4,
        "fontWeight": "heading",
        "lineHeight": "heading",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "h3": {
        "fontFamily": "heading",
        "fontSize": 3,
        "fontWeight": "heading",
        "lineHeight": "heading",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "h4": {
        "fontFamily": "heading",
        "fontSize": 2,
        "fontWeight": "heading",
        "lineHeight": "heading",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "h5": {
        "fontFamily": "heading",
        "fontSize": 1,
        "fontWeight": "heading",
        "lineHeight": "heading",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "h6": {
        "fontFamily": "heading",
        "fontSize": 0,
        "fontWeight": "heading",
        "lineHeight": "heading",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "hr": {
        "border": 0,
        "borderBottom": "1px solid",
        "margin": 0,
        "marginBottom": 3,
        "mb": 3,
        "mt": "-1px",
        "padding": 0,
      },
      "img": {
        "margin": 0,
        "marginBottom": 3,
        "maxWidth": "100%",
        "padding": 0,
      },
      "li": {
        "mb": 2,
        "ol": {
          "ml": 3,
          "my": 2,
        },
        "p": {
          "mb": 2,
        },
        "pl": 0,
        "ul": {
          "ml": 3,
          "my": 2,
        },
      },
      "ol": {
        "listStyleImage": "none",
        "listStylePosition": "outside",
        "margin": 0,
        "marginBottom": 3,
        "ml": 3,
        "padding": 0,
      },
      "p": {
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
      },
      "pre": {
        "fontSize": "85%",
        "margin": 0,
        "marginBottom": 3,
        "padding": 3,
      },
      "root": {
        "fontFamily": "body",
        "fontSize": 2,
        "fontWeight": "body",
        "lineHeight": "body",
      },
      "strong": {
        "fontWeight": "bold",
      },
      "table": {
        "borderCollapse": "collapse",
        "margin": 0,
        "marginBottom": 3,
        "padding": 0,
        "width": "100%",
      },
      "td": {
        ":first-child": {
          "pl": 0,
        },
        ":last-child": {
          "pr": 0,
        },
        "borderBottom": "1px solid",
        "mt": "-1px",
        "px": 2,
        "py": 1,
        "textAlign": "left",
      },
      "th": {
        ":first-child": {
          "pl": 0,
        },
        ":last-child": {
          "pr": 0,
        },
        "borderBottom": "1px solid",
        "px": 2,
        "py": 1,
        "textAlign": "left",
      },
      "ul": {
        "listStyleImage": "none",
        "listStylePosition": "outside",
        "margin": 0,
        "marginBottom": 3,
        "ml": 3,
        "padding": 0,
      },
    }
  `)
})
