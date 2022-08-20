const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1000,
  viewportHeight: 360,
  retries: 1,
  
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
  },
})
