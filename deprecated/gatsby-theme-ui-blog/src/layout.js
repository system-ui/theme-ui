import React from 'react'
import { Link } from 'gatsby'
import Head from './head'

export default (props) => (
  <>
    <Head {...props} />
    {props.children}
  </>
)
