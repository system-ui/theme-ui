import React from 'react'
import renderer from 'react-test-renderer'
import { matchers } from 'jest-emotion'
import styled from '../src/styled'

test('styled cleans up non-HTML props', () => {
  const Box = styled('div')()
  const json = renderer.create(<Box beep="boop" />).toJSON()
  expect(json.props.beep).toBe(undefined)
})

test('styled does not clean props for components', () => {
  const Base = props => <div {...props} />
  const Box = styled(Base)()
  const json = renderer.create(<Box x="hello" />).toJSON()
  expect(json.props.x).toBe('hello')
})
