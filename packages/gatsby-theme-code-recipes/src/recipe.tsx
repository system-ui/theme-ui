import React from 'react'
import { RecipeQuery } from '../types'

type Recipe = Omit<RecipeQuery, 'body'> & {
  children: React.ReactNode
}

export default (props: Recipe) => <div>{props.children}</div>
