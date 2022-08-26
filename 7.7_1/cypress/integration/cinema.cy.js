const selectors = require("../fixtures/selectors.json");
const answers = require("../fixtures/answers.json");
const users = require("../fixtures/users.json");


const {
  getRandomInt,
  getNeededDatestamp,
  getDateFromStamp,
} = require("../support/dateRoutine.js");

import FirstBookedPage from "../support/pages/firstBookedPage.js";
import SeatsPage from "../support/pages/seatsPage.js";
import IndexPage from "../support/pages/indexPage.js";
import AdminLoginForm from "../support/pages/adminLoginForm.js";
import AdminPage from "../support/pages/adminPage.js";
import ErrorPage from "../support/pages/errorPage.js";

const stsPge = new SeatsPage();
const indexPge = new IndexPage();
const admLoginFrm = new AdminLoginForm();
const admPg = new AdminPage();
const errPg = new ErrorPage();
const frstBookedPage = new FirstBookedPage();
before(() => {
  cy.visit("/client/index.php");
});

//тест-спек с тестами для проверки корректности отображения главной страницы
describe("Cinema tests. Testings main page ", () => {
  it("Should successfully open main page", () => {
    indexPge
      .getTitle()
      .contains(answers.indexPage.answInHead)
      .should("be.visible");
  });

  it("Should have current day to the left ", () => {
    let curDs = getNeededDatestamp(selectors.indexPage[1].day);
    console.log(getDateFromStamp(curDs));
    indexPge
      .getCurrentDate()
      .contains(getDateFromStamp(curDs))
      .should("be.visible");
  });

  it("Should have 3 days from current", () => {
    let curDs = getNeededDatestamp(selectors.indexPage[2].day);
    indexPge
      .get3DaysAfterDate()
      .contains(getDateFromStamp(curDs))
      .should("be.visible");
  });

  it("Should have 7 days from current", () => {
    let curDs = getNeededDatestamp(selectors.indexPage[3].day);
    indexPge
      .getLastDate()
      .contains(getDateFromStamp(curDs))
      .should("be.visible");
  });
});

//ест-спек для проверки логина в админку - используйте фикстуру для хранения тестовых данных (мин. 2 набора - happy и sad path)

describe("Cinema tests. Testings admin login ", () => {
  beforeEach(() => {
    admLoginFrm.visit();
  });
  it("Should not login with valid login and wrong pass", () => {
    cy.login(users.invalidUsers[0].mail, users.invalidUsers[0].pass);
    errPg.getBody().contains(answers.errorPage.body);
  });

  it("Should not login with valid login and blank pass", () => {
    cy.login(users.invalidUsers[1].mail, users.invalidUsers[1].pass);
    admLoginFrm
      .getPasswordField()
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with valid pass and blank login", () => {
    cy.login(users.invalidUsers[2].mail, users.invalidUsers[2].pass);
    admLoginFrm
      .getLoginField()
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should successfully login with happy path", () => {
    cy.login(users.validUsers[0].mail, users.validUsers[0].pass);
    admPg.getTitle().contains(answers.adminPage.headerTitel);
  });
});

//тест-спек с UI тестом для бронирования фильма в доступный зал, название которого вы получаете из админки

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
      filmFromAdminPage = doc.querySelectorAll(selectors.adminPage.filmFromAdmin)[answers.filmPage.filmNumber].textContent;
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
