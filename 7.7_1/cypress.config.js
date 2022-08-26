const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'q6qmbp',
  e2e: {
    specPattern: "cypress/integration/*.cy.{js,jsx,ts,tsx}",
    retries: 1,
    baseUrl: "http://qamid.tmweb.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
