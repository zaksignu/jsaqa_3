const answers = require("../fixtures/answers.json");
const selectors = require("../fixtures/selectors.json");

import SeatsPage from "../support/pages/seatsPage.js";
const stsPge = new SeatsPage();

module.exports = {
  getNeededDatestamp: function (daysToApproach) {
    let currentTimestamp = new Date();
    let zeroDayTimeStamp = currentTimestamp.setHours(0, 0, 0, 0) / 1000;
    return zeroDayTimeStamp + 86400 * daysToApproach;
  },

  getDateFromStamp: function (datestamp) {
    let date = new Date(datestamp * 1000);
    return date.getUTCDate();
  },
  getRandomInt: function (maxValue) {
    return Math.floor(Math.random() * maxValue)+1;
  },

  // // touchForOccupied: function (line, seat) {
  // //  let  mainSelector = selectors.bookingPage.seatBooking_1+`${line}`+selectors.bookingPage.seatBooking_2+`${seat}`+selectors.bookingPage.seatBooking_3;
  // // // let seatObject = cy.
  // //  // cy.document().then((doc) => {
  // //   //       console.log(mainSelector);
  // //   //   let seatObject = doc.querySelector(mainSelector);
  // //   //   console.log(seatObject);
  // //   //   if (seatObject.classList[2] === `buying-scheme__chair_taken`) {
  // //   //     return true
  // //   //   } else {return false}
  // //   // })

  // //   // let mainSelector = `div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${line}) > span:nth-child(${seat})`;
  // //   // let otherSelector = `span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken`;
  // //   // console.log(stsPge.getBookPage(lone, seat));

  // //   // // await page.waitForSelector(mainSelector)
  // //   // //ищем ячейку по ее адресу и получаем актуальный селектор class = "....."
  // //   // let seatObject = await page.$(mainSelector);
  // //   // let actualSelector = await seatObject._remoteObject.description;
  // //   // //если селекторы не совпадают - возвращаем false. это значит, что ячейка свободна
  // //   // if (actualSelector != otherSelector) {
  // //   //   return false;
  // //   // } else return true;
  // },

  // getSeat: function () {
  //   let seatTaken = true;
  //   let randomLine,randomSeat;
  //   while (seatTaken){
  //     // если место занято - генерируем новое место и повторяем
  //        randomLine = this.getRandomInt(10);
  //        randomSeat = this.getRandomInt(10);
  //        seatTaken =  this.touchForOccupied(randomLine,randomSeat);
  //     };
  //   return [randomLine,randomSeat];
  // }
};
