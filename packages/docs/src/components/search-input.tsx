import { Input } from '@theme-ui/components'
import { ThemeUICSSObject } from '@theme-ui/css'
import { useEffect } from 'react'

/**
 * @see https://docsearch.algolia.com/docs/styling/
 */
const algoliaStyles: ThemeUICSSObject = {
  '.algolia-autocomplete': {
    color: 'text',
    '.ds-dropdown-menu': {
      backgroundColor: 'background',

      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 48px 100px 0px',

      '&:before': {
        backgroundColor: 'inherit',
        color: 'muted',
        borderColor: 'currentColor',
      },
    },
    '.ds-dropdown-menu [class^=ds-dataset-]': {
      backgroundColor: 'inherit',
      color: 'muted',
      border: '1px solid currentColor',
    },
    '.algolia-docsearch-suggestion': {
      color: 'text',
      backgroundColor: 'inherit',
    },
    '.algolia-docsearch-suggestion--subcategory-column': {
      color: 'text',
    },
    '.algolia-docsearch-suggestion--highlight': {
      color: 'primary',
      '--shadow-color': (theme) => theme.colors!.muted,
      boxShadow: 'inset 0 -2px 0 0 var(--shadow-color)',
      padding: 0,
    },
    '.algolia-docsearch-suggestion--subcategory-column-text': {},
    '.algolia-docsearch-suggestion--text': {
      fontSize: 1,
      color: 'gray',
    },
    '.algolia-docsearch-suggestion--title': {
      fontWeight: 'bold',
      color: 'text',
      fontSize: 1,
    },
    '.algolia-docsearch-suggestion--category-header': {
      display: 'none !important',
      borderBottom: '1px solid transparent',
      fontSize: 1,
      color: 'text',
    },
    '.algolia-docsearch-suggestion--content:before': {
      backgroundColor: 'gray',
      opacity: 0.2,
    },
    '.algolia-docsearch-suggestion--subcategory-column:before': {
      display: 'none',
    },
    '.ds-dropdown-menu .ds-suggestion.ds-cursor .algolia-docsearch-suggestion:not(.suggestion-layout-simple) .algolia-docsearch-suggestion--content':
      {
        backgroundColor: 'muted',
      },
    '@media (max-width: 768px)': {
      // todo: make docsearch autocomplete dropdown responsive
    },
  },
}

const resetButtonStyles: ThemeUICSSObject = {
  'input[type="search"]': {
    '&::-webkit-search-cancel-button': {
      WebkitAppearance: 'none',
      height: '1em',
      width: '1em',
      borderRadius: '50em',
      background: (th) => {
        const textColor = (th.rawColors || th.colors)!.text
        const fill = encodeURIComponent(String(textColor))
        return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='${fill}' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'/%3E%3C/svg%3E");`
      },
      backgroundSize: 'contain',
      opacity: 0,
      pointerEvents: 'none',
    },
    '&:focus::-webkit-search-cancel-button': {
      opacity: 0.3,
      pointerEvents: 'all',
    },
  },
}

const searchFormStyles: ThemeUICSSObject = {
  ...resetButtonStyles,
  ...algoliaStyles,

  // Search results are not responsive.
  '@media (max-width: 475px)': {
    display: 'none',
  },
}

export default function SearchInput() {
  const searchInputId = 'algolia-docs-search'

  useEffect(() => {
    let lastSearchInput: HTMLElement | null = null
    const observer = new MutationObserver(function () {
      const searchInput = document.getElementById(searchInputId)
      const docsearch = (window as any).docsearch

      if (!docsearch) return
      if (searchInput && lastSearchInput !== searchInput) {
        docsearch({
          apiKey: '84ed820927eee5fa5018c9f1abe70390',
          indexName: 'theme-ui',
          inputSelector: `#${searchInputId}`,
          debug: true,
          transformData: function (hits: { url: string }[]) {
            for (const hit of hits) {
              hit.url = hit.url.replace(
                'https://theme-ui.com',
                window.location.origin
              )
            }
          },
        })

        lastSearchInput = searchInput
      }
    })

    observer.observe(document, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <form sx={searchFormStyles}>
      <Input
        type="search"
        id={searchInputId}
        placeholder="Search the docs"
        aria-label="Search docs"
        autoComplete="off"
        sx={{
          minWidth: ['unset', 100],
          borderColor: 'transparent',
          backgroundColor: 'muted',
          px: 2,
          py: 2,
          color: 'inherit',
          textDecoration: 'none',
          fontSize: 1,
          fontWeight: 'bold',
          '::placeholder': {
            color: 'text',
            opacity: 0.4,
          },
        }}
      />
    </form>
  )
}
