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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (login, password) => {
    cy.contains("Log in").click();
    cy.get("#mail").type(login);
    cy.get("#pass").type(password);
    cy.contains("Submit").click();
  });

  Cypress.Commands.add("extendedLogin", (login, password) => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.get("#mail").type(login);
    cy.get("#pass").type(password);
    cy.contains("Submit").click();
    cy.contains(`Добро пожаловать ${login}`).should("be.visible");
  });

  Cypress.Commands.add("addText", ( selector,text) => {
    cy.get(selector).type(text);   
  });

  Cypress.Commands.add("addBook", ( books,number) => {
    cy.get("#title").type(books.books[number].title);
    cy.get("#description").type(books.books[number].description);  
    cy.get("#authors").type(books.books[number].author);   
    cy.get('form > .ml-2').click();
  });

  