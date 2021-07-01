// ***********************************************************
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const esbuildPreprocessor = require('@bahmutov/cypress-esbuild-preprocessor')

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    esbuildPreprocessor({
      // any ESBuild options here
      // https://esbuild.github.io/api/
    })
  )
}
