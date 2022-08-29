// @ts-check

/** @jsx jsx */
import { jsx } from 'theme-ui'

import Layout from './components/layout'

export { default as Banner } from './components/banner'
export { default as Tiles } from './components/tiles'
export { default as Cards } from './components/cards'
export { default as Note } from './components/note'

/**
 * @param {import("gatsby").WrapPageElementBrowserArgs} props
 */
export const WrapPageElement = ({ element, props }) => (
  <Layout {...props} children={element} />
)

/**
 * @see https://docsearch.algolia.com/
 * @param {import("gatsby").RenderBodyArgs} args
 */
export const setDocSearchComponents = ({
  setHeadComponents,
  setPostBodyComponents,
}) => {
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
      src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
    ></script>,
    <script
      key="algolia-script"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          var lastSearchInput = null; 
          var observer = new MutationObserver(function () {
            var searchSelector = "#algolia-docs-search";
            var searchInput = document.querySelector(searchSelector);

            if (searchInput && (lastSearchInput !== searchInput)) {
              docsearch({
                apiKey: "84ed820927eee5fa5018c9f1abe70390",
                indexName: "theme-ui",
                inputSelector: searchSelector,
                debug: true,
                transformData: function(hits) {
                  for (const hit of hits) {
                    hit.url = hit.url.replace(
                      "https://theme-ui.com",
                      window.location.origin
                    )
                  }
                }
              })
              lastSearchInput = searchInput;
            }
          });

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
