
class AdminPage {
  visit() {
    cy.visit("/admin");
  }  

  getTitleField(login) {
    return  cy.contains(`Добро пожаловать ${login}`);
  }


  getLoginField() {
    return cy.get("#mail");
  }

  getPassField() {
    return cy.get("#pass");
  }

  getSubmitButt() {
    return cy.contains("Submit");
  }

}
export default AdminPage;
