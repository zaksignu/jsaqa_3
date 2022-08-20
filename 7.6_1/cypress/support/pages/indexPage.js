class IndexPage {
  getIndex() {
    return cy.visit("/");
  }

  getAdmin() {
    return cy.visit("/booksNode");
  }

  getLoginButton() {
    return cy.contains("Log in");
  }

  getAddBookButton() {
    return cy.get(".p-0 > .btn");
  }
  getFirstBook() {
    return cy.get(
      "#root > div > div > div > a:nth-child(1) > div > div.card-footer > button"
    );
  }
}
export default IndexPage;
