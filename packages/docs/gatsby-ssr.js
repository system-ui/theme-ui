// @ts-check

import * as React from 'react'

import { WrapPageElement } from './src'

export const wrapPageElement = (props) => <WrapPageElement {...props} />

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  // configure algolia doc search
  setHeadComponents([
    <link
      key="algolia-css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
    />,
  ])
  setPostBodyComponents([
    <script
      key="algolia-cdn"
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>,
    <script
      key="algolia-script"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          var observer = new MutationObserver(function () {
          var searchSelector = "${process.env.ALGOLIA_DOCSEARCH_SEARCH_INPUT}";
          var searchInput = document.querySelector(searchSelector);
          if (searchInput) {
            docsearch({
              apiKey: "${process.env.ALGOLIA_DOCSEARCH_API_KEY}",
              indexName: "${process.env.ALGOLIA_DOCSEARCH_INDEX_NAME}",
              inputSelector: searchSelector,
              debug: ${process.env.ALGOLIA_DOCSEARCH_DEBUG}
            })
            observer.disconnect()
            observer = null
          }
        });
        // start observing
        document.addEventListener("DOMContentLoaded", function() {
          observer.observe(document, {
            childList: true,
            subtree: true
          });
        });        
      `,
      }}
    />,
  ])
}
