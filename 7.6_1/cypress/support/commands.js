// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
import IndexPage from "../../cypress/support/pages/indexPage.js";
import AdmPage from "../../cypress/support/pages/adminPage.js";
import BookForm from "../../cypress/support/pages/bookForm.js";

const indexPge = new IndexPage();
const admPage = new AdmPage();
const bkForm = new BookForm();

Cypress.Commands.add("login", (login, password) => {
  indexPge.getAdmin();
  indexPge.getLoginButton().click();
  admPage.getLoginField().type(login);
  admPage.getPassField().type(password);
  admPage.getSubmitButt().click();
  cy.wait(1000);
  indexPge.getIndex();
});

Cypress.Commands.add("addBook", (books, number) => {
  bkForm.getTitleField().type(books.books[number].title);
  bkForm.getDescriptionField().type(books.books[number].description);
  bkForm.getAuthorField().type(books.books[number].author);
  bkForm.getSubmitButt().click();
});
