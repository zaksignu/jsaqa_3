/// <reference types="cypress" />

import IndexPage from "../../cypress/support/pages/indexPage.js";
import AdmPage from "../../cypress/support/pages/adminPage.js";

const indexPge = new IndexPage();
const admPage = new AdmPage();

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
  indexPge.getAdmin();
  cy.login("test@test.com", "test");
  admPage.getTitleField("test@test.com").should("be.visible");
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
  beforeEach(() =>{
    cy.login(user.validUsers[0].mail, user.validUsers[0].pass);
    
  });
  it("Should successfully add book", () => {
    indexPge.getAddBookButton().click();
    cy.addBook(book,0);
    indexPge.getFirstBook().contains(`Add to favorite`);   
  });

  it("Should successfully add book to favorites", () => {
    indexPge.getFirstBook().click();
    indexPge.getFirstBook().contains(`Delete from favorite`);   
  });

  it("Should successfully delete book from fav", () => {
    indexPge.getFirstBook().contains(`Delete from favorite`); 
    indexPge.getFirstBook().click();
    indexPge.getFirstBook().contains(`Add to favorite`); 
  });

});