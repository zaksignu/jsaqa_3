const selectors = require("../../fixtures/selectors.json");
const answers = require("../../fixtures/answers.json");
const users = require("../../fixtures/users.json");

const { getRandomInt } = require("../../support/dateRoutine.js");

import FirstBookedPage from "../../support/pages/firstBookedPage.js";
import SeatsPage from "../../support/pages/seatsPage.js";
import IndexPage from "../../support/pages/indexPage.js";
import AdminLoginForm from "../../support/pages/adminLoginForm.js";

const stsPge = new SeatsPage();
const indexPge = new IndexPage();
const admLoginFrm = new AdminLoginForm();
const frstBookedPage = new FirstBookedPage();
before(() => {
  cy.visit("/client/index.php");
});

describe("Cinema tests. Happypath from admin ", () => {
  it("Should add new cinema hall", () => {
    let filmFromAdminPage;
    let items, qqq;
    let filmId;
    admLoginFrm.visit();
    cy.wait(1000);
    cy.login(users.validUsers[0].mail, users.validUsers[0].pass);
    cy.wait(1000);
    cy.document().then((doc) => {
      filmFromAdminPage = doc.querySelectorAll(
        selectors.adminPage.filmFromAdmin
      )[answers.filmPage.filmNumber].textContent;
      items = doc.querySelectorAll(selectors.adminPage.items);
      for (let i = 0, length = items.length; i < length; i++) {
        //выпиливаем названия из массива данных
        let currFilm = items.item(i).childNodes[0].data;
        if (currFilm === filmFromAdminPage) {
          //получаем data-seance-id
          filmId = items[i].parentNode.attributes[1].value;
          break;
        }
      }
      indexPge.visit();
      indexPge.get3DaysAfterDate().click();
      indexPge.getSeance(filmId).click();
      cy.wait(500);
      let line = getRandomInt(answers.bookingPage.maxRow);
      let seat = getRandomInt(answers.bookingPage.maxSeat);
      stsPge.getSeatsBlock(line, seat).click();
      stsPge.getBookPage().click();
      frstBookedPage.getFilmName().contains(answers.filmPage.filmName);
      frstBookedPage.getSeatsInfo().contains(`${line}/${seat}`);
    });
  });
});
