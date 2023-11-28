// @ts-check
// @ts-expect-error you're not supposed to import those usually
import { jsx, jsxs, Fragment } from 'react/jsx-runtime'

import * as mdx from '@mdx-js/mdx'
import { useMDXComponents } from '@mdx-js/react'
import remarkGfm from 'remark-gfm-3'

/**
 *
 * @param {string} mdxString
 * @returns {Promise<import('mdx/types').MDXContent>}
 */
export const evalMdx = async (mdxString) => {
  return mdx
    .evaluate(mdxString, {
      useMDXComponents,
      jsx,
      jsxs,
      Fragment,
      remarkPlugins: [remarkGfm],
    })
    .then((mod) => mod.default)
}
