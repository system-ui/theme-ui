/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  Styled,
  ColorMode,
  Box,
} from 'theme-ui'
import { Helmet } from 'react-helmet'
import {
  EditProvider,
  FieldSet,
} from '@styled-system/edit'
import Layout from '../components/layout'
import Lorem from './lorem.mdx'

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

export default props => {
  return (
    <EditProvider>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Merriweather:400,700|Montserrat:400,700,900|Poppins:400,700,900|Roboto:400,700,900|Roboto+Condensed:400,700'
        />
      </Helmet>
      <ColorMode />
      <Layout>
        <div
          css={{
            float: 'right',
            ml: 4,
            p: 2,
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.5,
            fontSize: 12,
            color: 'black',
            bg: 'white',
          }}>
          <FieldSet
            name='colors'
            type='color'
            ignore={[ 'modes' ]}
          />
          <FieldSet
            name='fonts'
            type='select'
            options={demoFonts}
          />
          <FieldSet
            name='fontWeights'
            type='number'
            step='100'
            min='100'
            max='900'
          />
          <FieldSet
            name='lineHeights'
            type='number'
            step={1/16}
            min={1}
            max={2}
          />
        </div>
        <Styled.h1>Demo page</Styled.h1>
        <Styled.p>
          Use the control panel on the right to change some aspects of the theme in real-time.
        </Styled.p>
        <Lorem />
      </Layout>
    </EditProvider>
  )
}
