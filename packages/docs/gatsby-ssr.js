import React from 'react'
export { wrapPageElement } from './src'

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
          var searchSelector = "#algolia-docs-search";
          var searchInput = document.querySelector(searchSelector);
          if (searchInput) {
            docsearch({
              apiKey: "84ed820927eee5fa5018c9f1abe70390",
              indexName: "theme-ui",
              inputSelector: searchSelector,
              debug: false
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
