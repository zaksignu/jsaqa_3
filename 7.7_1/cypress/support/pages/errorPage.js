const selectors = require("../../fixtures/selectors.json");

class ErrorPage {
    getBody() {
      return cy.get(selectors.errorPage.body);
    } 
}
export default ErrorPage;