const selectors = require("../fixtures/selectors.json");
const answers = require("../fixtures/answers.json");
const users = require("../fixtures/users.json");

const {
  getRandomInt,
  getNeededDatestamp,
  getDateFromStamp,
  touchForOccupied,
} = require("../support/dateRoutine.js");

import FirstBookedPage from "../support/pages/firstBookedPage.js";
import SeatsPage from "../support/pages/seatsPage.js";
import IndexPage from "../support/pages/indexPage.js";
import AdminLoginForm from "../support/pages/adminLoginForm.js";
import AdminPage from "../support/pages/adminPage.js";
import ErrorPage from "../support/pages/errorPage.js";
import { getRandomSeat } from "../support/commands.js";

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

  it.skip("Should add new cinema hall", () => {
    //TO DO: fix it!

    cy.get(selectors.adminPage.createHallButton).click();
    cy.wait(1000);
    cy.get(selectors.adminPage.createHallField).type(
      answers.adminPage.hallName
    );
    cy.wait(1000);
    //  cy.contains("Добавить зал").click({ force: true });
    cy.get(selectors.adminPage.createHallButtonInForm).click();
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
      filmFromAdminPage = doc.querySelectorAll(
        "#grid-session > div > div.conf-step__movies > div>  .conf-step__movie-title"
      )[answers.filmPage.filmNumber].textContent;
      items = doc.querySelectorAll(
        "#grid-session > div > div.conf-step__seances > div > div > div > p.conf-step__seances-movie-title"
      );
      //   console.log(items);
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
      cy.wait(500);
      indexPge.getSeance(filmId).click();
      cy.wait(500);
      // = getSeat();
      let line = getRandomInt(answers.bookingPage.maxRow);
      let seat = getRandomInt(answers.bookingPage.maxSeat);
      let pshpsh = stsPge.getSeatsBlock(line, seat).click();
      // cy.wait(1000);
      stsPge.getBookPage().click();
      //  frstBookedPage.getDate().contains()
      frstBookedPage.getFilmName().contains(answers.filmPage.filmName);
      frstBookedPage.getSeatsInfo().contains(`${line}/${seat}`);
      // .should('be.enabled');
      //  .should('not.have.class', 'form-buying-scheme__chair_taken');
      //  pshpsh.should('be.visible').click().should('not.have.class', 'form-buying-scheme__chair_taken');

      // debugger;
      //  let  mainSelector = selectors.bookingPage.seatBooking_1+`${line}`+selectors.bookingPage.seatBooking_2+`${seat}`+selectors.bookingPage.seatBooking_3;
      // let prprp = cy.get('.buying-scheme__wrapper > :nth-child(1) > :nth-child(2)')
      //               .should('satisfy', ($el) => {

      //                 const classList = Array.from($el[0].classList);
      //                 console.log(classList)
      //                 return classList.not.includes('')
      //               })

      // let prprp = cy.get('.buying-scheme__wrapper > :nth-child(3) > :nth-child(3)')
      //               .then(($el) => {
      //                 const classList = Array.from($el[0].classList);

      //                 if ( classList.includes('buying-scheme__chair_taken')){return console.log (1)} else {return console.log (2)}
      //               })
      // // let erer = 0;
      // // //let prprp = cy.touchForOccupied(line, seat);
      // // debugger;
      // // let prprp  = cy.get(`.buying-scheme__wrapper > :nth-child(${line}) > :nth-child(${seat})`);
      //  console.log(prprp)
      // .then(($el) => {
      //   const classList = Array.from($el[0].classList);
      //   debugger;
      //   if (classList.includes("buying-scheme__chair_taken")) {
      //     erer = 1;
      //     debugger;
      //     return 1
      //   } else {
      //     erer = 2;
      //     debugger;
      //     return 2
      //   };
      //  debugger;
      // console.log(ups);
      //   return 3;

      // });

      //debugger;
      //console.log(line+"    "+seat);
      //            console.log(erer);
      //  console.log(prprp);

      // cy.get('div#2')
      // .should('satisfy', ($el) => {
      //   const classList = Array.from($el[0].classList);
      //   return classList.includes('class1') || classList.includes('class2') // passes
      // }) // passes

      //let rtrtr = prprp.find('class');
      //console.log(prprp);
      //console.log(rtrtr);
      //    let seatTaken = true;
      //   let randomLine,randomSeat;
      // while (seatTaken){
      //   // если место занято - генерируем новое место и повторяем
      //      randomLine = getRandomInt(10);
      //      randomSeat = getRandomInt(10);
      //      seatTaken =  touchForOccupied(randomLine,randomSeat);
      //   };

      //   cy.document().then((doc) => {
      //       console.log("+"+mainSelector);
      //   let seatObject = doc.querySelector(mainSelector);
      //   console.log(seatObject);
      //  // let seatObjct = seatObject.classList[2].value;
      //   console.log(seatObject.classList[2]);
      //   console.log(seatObjct);
      //   // if (seatObject.classList[2] === `buying-scheme__chair_taken`) {
      //   //   return true
      //   // } else {return false}
      // })

      // do {
      //   randomLine = getRandomInt(10);
      //   randomSeat = getRandomInt(10);
      // } while (touchForOccupied(randomLine,randomSeat));

      //  return [randomLine,randomSeat];
      // console.log(randomLine);

      // let rnd = getRandomSeat();
      // let seat = getRandomInt(answers.bookingPage.maxRow);
      //let seatForSeat = getRandomInt(answers.bookingPage.maxSeat);
      //touchForOccupied(rowForSeat)
      //     console.log(tyty+"111111");
      //     console.log(items+"211111");\

      //     const elsP = document.querySelectorAll('p');
      // // for
      // for (let i = 0, length = elsP.length; i < length; i++) {
      //   elsP[i].style.backgroundColor = 'yellow';
      // }
      // ocument.querySelectorAll('#grid-session > div > div.conf-step__movies > div:nth-child(2) > h3').item(0).childNodes[0].data
      //#grid-session > div > div.conf-step__seances > div
      //#grid-session > div > div.conf-step__seances > div:nth-child(3) > h3
      // #grid-session > div > div.conf-step__seances > div:nth-child(2) > div > div > p.conf-step__seances-movie-title
      //document.querySelectorAll('#grid-session > div > div.conf-step__seances > div:nth-child(2) > div > div > p.conf-step__seances-movie-title').item(0).childNodes[0].data
      //   console.log(frfrfr);
    });

    // 1 - получаем имя фильма из плашки сверху.
    // 2 - ищем фильм среди списка. пусть будет первая позиция в выборке определяя data-seance-id - уникальный идентификатор

    // 3. броним фильм по идентификатору
    // document.querySelectorAll('#grid-session > div > div.conf-step__seances > div > div > div > p.conf-step__seances-movie-title')[2].childNodes[0].data

    //document.querySelectorAll('#grid-session > div > div.conf-step__seances > div > div > div > p.conf-step__seances-movie-title')[2].parentNode.attributes[1].value

    // console.log(
    //   cy.get('#grid-session > div > div.conf-step__seances > div')
    // .find('div>div > p.conf-step__seances-movie-title')
    // .contains('Логан').item(0).childNodes[0].data
    // );
    // cy.get('.assertion-table')
    // .find('tbody tr:last')
    // // finds first  element with text content matching regular expression
    // .contains('td', /column content/i)
    // .should('be.visible')

    //TO DO: fix it!

    //     cy.get(selectors.adminPage.createHallButton).click();
    //     cy.wait(1000);
    //     cy.get(selectors.adminPage.createHallField).type(
    //       answers.adminPage.hallName
    //     );
    //  //   cy.wait(1000);
    //  cy.contains("Добавить зал").click({ force: true });
    //  cy.get(selectors.adminPage.createHallButtonInForm).click();

    // console.log(cy.get("#grid-session > div > div.conf-step__movies "));
    // cy.document().then ((doc) =>{
    // console.log(doc.document.querySelectorAll(".conf-step__movie")[1]);
    // console.log(doc);
    // });

    //then((doc) =>
    // work with document element
    // const itensCount = doc.querySelectorAll((".conf-step__movie").length
    //console.log(doc.querySelectorAll(".conf-step__movie").item[1]);
    //.attributes[2].value);
    //  let rrr = doc.querySelectorAll(".conf-step__movie");
    //  console.log("2222");
    //  console.log(rrr);
    // })
    // console.log(rrr);
    // console.log( cy.get(`#grid-session > div > div.conf-step__movies > div:nth-child(1)`));
  });
});
