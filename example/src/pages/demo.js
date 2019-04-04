import React, { useReducer } from 'react'
import {
  ThemeProvider,
  Styled,
  css,
} from 'theme-ui'
import { Helmet } from 'react-helmet'
import merge from 'lodash.merge'
import theme from '../components/theme'
import Layout from '../components/layout'
import Lorem from './lorem.mdx'

const reducer = (state, action) => {
  switch (action.type) {
    case 'setColor':
      return merge({}, state, {
        colors: merge({}, state.colors, action.payload)
      })
    case 'setFont':
      return merge({}, state, {
        fonts: merge({}, state.fonts, action.payload)
      })
    case 'setFontWeight':
      return merge({}, state, {
        fontWeights: merge({}, state.fontWeights, action.payload)
      })
    case 'setLineHeight':
      return merge({}, state, {
        lineHeights: merge({}, state.lineHeights, action.payload)
      })
    default:
      return state
  }
}

const demoFonts = [
  'system-ui, sans-serif',
  '"Avenir Next", sans-serif',
  'Georgia, serif',
  'Baskerville, serif',
  'Menlo, monospace',
  'Roboto, sans-serif',
  '"Roboto Condensed", sans-serif',
  'Poppins, sans-serif',
  'Montserrat, sans-serif',
  'Merriweather, serif',
]

const Flex = props =>
  <div
    {...props}
    css={css({
      display: 'flex',
    })}
  />

const Label = props =>
  <label
    {...props}
    css={css({
      width: '75%',
      pr: 2,
      whiteSpace: 'nowrap',
    })}
  />

const Input = props =>
  <input
    {...props}
    css={css({
      width: '25%',
    })}
  />

const Colors = ({
  colors,
  dispatch,
}) =>
  <div>
    <h3>Colors</h3>
    {Object.keys(colors).map(key => (typeof colors[key] !== 'object') && (
      <Flex key={key}>
        <Label htmlFor={key}>
          {key}
        </Label>
        <Input
          id={key}
          name={key}
          type='text'
          value={colors[key]}
          onChange={e => {
            const { value } = e.target
            dispatch({
              type: 'setColor',
              payload: {
                [key]: value
              }
            })
          }}
        />
      </Flex>
    ))}
    <Flex>
      <Label htmlFor='headerText'>
        Header Text
      </Label>
      <Input
        id='headerText'
        name='headerText'
        type='text'
        value={colors.header.text}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setColor',
            payload: {
              header: {
                text: value
              }
            }
          })
        }}
      />
    </Flex>
    <Flex>
      <Label htmlFor='headerBackground'>
        Header Background
      </Label>
      <Input
        id='headerBackground'
        name='headerBackground'
        type='text'
        value={colors.header.background}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setColor',
            payload: {
              header: {
                background: value
              }
            }
          })
        }}
      />
    </Flex>
  </div>

const Typography = ({
  fonts,
  fontWeights,
  lineHeights,
  dispatch
}) =>
  <div>
    <h3>Typography</h3>
    <Flex>
      <Label htmlFor='font'
        css={{
          width: '50%',
        }}>
        Font
      </Label>
      <select
        id='font'
        name='font'
        value={fonts.body}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setFont',
            payload: {
              body: value
            }
          })
        }}>
        {demoFonts.map(font => (
          <option
            key={font}
            value={font}
            label={font.split(',')[0]}
          />
        ))}
      </select>
    </Flex>
    <Flex>
      <Label htmlFor='fontWeight'>
        Font Weight
      </Label>
      <Input
        id='fontWeight'
        name='fontWeight'
        type='number'
        min='100'
        max='900'
        step='100'
        value={fontWeights.body}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setFontWeight',
            payload: {
              body: value
            }
          })
        }}
      />
    </Flex>
    <Flex>
      <Label htmlFor='lineHeight'>
        Line Height
      </Label>
      <Input
        id='lineHeight'
        name='lineHeight'
        type='number'
        min={1}
        max={2}
        step={1/32}
        value={lineHeights.body}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setLineHeight',
            payload: {
              body: value
            }
          })
        }}
      />
    </Flex>
    <h4>Heading</h4>
    <Flex>
      <Label htmlFor='headingFont'
        css={{
          width: '50%',
        }}>
        Font
      </Label>
      <select
        id='headingFont'
        name='headingFont'
        value={fonts.heading}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setFont',
            payload: {
              heading: value
            }
          })
        }}>
        <option
          value='inherit'
          label='inherit'
        />
        {demoFonts.map(font => (
          <option
            key={font}
            value={font}
            label={font.split(',')[0]}
          />
        ))}
      </select>
    </Flex>
    <Flex>
      <Label htmlFor='headingFontWeight'>
        Font Weight
      </Label>
      <Input
        id='headingFontWeight'
        name='headingFontWeight'
        type='number'
        min='100'
        max='900'
        step='100'
        value={fontWeights.heading}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setFontWeight',
            payload: {
              heading: value
            }
          })
        }}
      />
    </Flex>
    <Flex>
      <Label htmlFor='headingLineHeight'>
        Line Height
      </Label>
      <Input
        id='headingLineHeight'
        name='headingLineHeight'
        type='number'
        min='1'
        max='2'
        step={1/32}
        value={lineHeights.heading}
        onChange={e => {
          const { value } = e.target
          dispatch({
            type: 'setLineHeight',
            payload: {
              heading: value
            }
          })
        }}
      />
    </Flex>
  </div>

const Controls = ({
  state,
  dispatch,
}) =>
  <Styled.wrapper
    css={css({
      position: 'fixed',
      top: 0,
      right: 0,
      fontFamily: 'system-ui, sans-serif',
      width: 256,
      p: 3,
      mx: 3,
      my: 5,
      fontSize: 1,
      bg: 'muted',
    })}>
    <Colors
      colors={state.colors}
      dispatch={dispatch}
    />
    <Typography
      {...state}
      dispatch={dispatch}
    />
  </Styled.wrapper>

export default props => {
  const [ state, dispatch ] = useReducer(reducer, theme)

  return (
    <ThemeProvider theme={state}>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Merriweather:400,700|Montserrat:400,700,900|Poppins:400,700,900|Roboto:400,700,900|Roboto+Condensed:400,700'
        />
      </Helmet>
      <Layout>
        <Styled.h1>Demo page</Styled.h1>
        <Styled.p>
          Use the control panel on the right to change some aspects of the theme in real-time.
        </Styled.p>
        <Lorem />
      </Layout>
      <Controls
        state={state}
        dispatch={dispatch}
      />
    </ThemeProvider>
  )
}
