const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  downloadsFolder: 'downloads',
  fixturesFolder: 'fixtures',
  retries: {
    runMode: 1,
    openMode: 3,
  },
  projectId: 'fmfid1',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins.js')(on, config)
    },
    baseUrl: 'http://localhost:9000',
    supportFile: 'support.ts',
    specPattern: 'integration/**/*.*',
  },
})
