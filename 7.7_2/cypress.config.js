const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    specPattern: "cypress/integration/*.cy.{js,jsx,ts,tsx}",
    retries: 1,
    
    
    baseUrl: "https://petstore.swagger.io/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
