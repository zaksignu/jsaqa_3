const selectors = require("../../fixtures/selectors.json");

class AdminLoginForm {
  visit() {
    cy.visit("/admin");
  }
  getTitle() {
    return cy.get(selectors.loginPage.title);
  }

  getLoginField() {
    return cy.get(selectors.loginPage.loginField);
  }
  getPasswordField() {
    return cy.get(selectors.loginPage.passwordField);
  }
  getSubmitButton() {
    return cy.get(selectors.loginPage.buttonField);
  }
}
export default AdminLoginForm;
