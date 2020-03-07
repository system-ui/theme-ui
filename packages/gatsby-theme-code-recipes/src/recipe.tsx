import React from 'react'
import { RecipeQuery } from '../types'

type Recipe = Omit<RecipeQuery, 'body'> & {
  children: React.ReactNode
}

/** Props such as a `name` etc. are passed down to and used by other packages */
export default (props: Recipe) => <div>{props.children}</div>
