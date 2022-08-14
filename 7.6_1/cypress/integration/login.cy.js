/// <reference types="cypress" />
let user , book;
before(()=> {
  cy.fixture('users').then(function (fUsers)  {
     user = fUsers;
  })
  cy.fixture('books').then(function (fBooks)  {
    book = fBooks;
 })
})  

describe('Default bookapp tests from Netology', () => {

it("Should successfully login", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.get('form > .ml-2').click;
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it("Should not login with empty login", () => {
  cy.visit("/booksNode");
  cy.contains("Log in").click();
  cy.get("#mail").type(" ");
  cy.get("#pass").type("test");
  cy.contains("Submit").click();
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле.");
});

it("Should not login with empty password", () => {
  cy.visit("/booksNode");
  cy.contains("Log in").click();
  cy.get("#mail").type("test@test.com");
  cy.contains("Submit").click();
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
});

});

describe('Custom bookapp tests from me', () => {

  it("Should successfully auth with  valid logins", () => {
    cy.extendedLogin(user.validUsers[0].mail, user.validUsers[0].pass);
    cy.contains("Log out").click();
    cy.extendedLogin(user.validUsers[1].mail, user.validUsers[1].pass);
    cy.contains("Log out").click();
  });

  it("Should successfully add book", () => {
    cy.extendedLogin(user.validUsers[0].mail, user.validUsers[0].pass);
    cy.visit("/");
    cy.get(".p-0 > .btn").click();
    cy.addBook(book,0);
  });

  it("Should successfully add book to favorites", () => {
    cy.extendedLogin(user.validUsers[0].mail, user.validUsers[0].pass);
    cy.visit("/");
    cy.get("#root > div > div > div > a:nth-child(1) > div > div.card-footer > button").click();
    cy.get("#root > div > div > div > a:nth-child(1) > div > div.card-footer > button").contains(`Delete from favorite`);
    cy.get("#root > div > div > div > a:nth-child(1) > div > div.card-footer > button").click();
  });

});