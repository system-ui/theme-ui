export interface Snippet {
  lang: string | null
  value: string | null
  meta: string | null
  props?: {
    live?: boolean
    xray?: boolean
  }
}

export interface RecipeQuery {
  id: string
  name: string
  slug: string
  snippets: Snippet[]
  body: string
}
