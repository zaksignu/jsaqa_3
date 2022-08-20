class BookForm {
  getTitleField() {
    return cy.get("#title");
  }

  getDescriptionField() {
    return cy.get("#description");
  }

  getAuthorField() {
    return cy.get("#authors");
  }

  getSubmitButt() {
    return cy.get("form > .ml-2");
  }
}
export default BookForm;
