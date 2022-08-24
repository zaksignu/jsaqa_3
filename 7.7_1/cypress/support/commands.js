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
import SeatsPage from "../support/pages/seatsPage.js";
import AdminLoginForm from "../support/pages/adminLoginForm";
const admLoginFrm = new AdminLoginForm();
const stsPge = new SeatsPage();

const selectors = require("../fixtures/selectors.json");

Cypress.Commands.add("login", (login, password) => {
  if (login !== "") {
    admLoginFrm.getLoginField().type(login);
  }
  if (password !== "") {
    admLoginFrm.getPasswordField().type(password);
  }
  admLoginFrm.getSubmitButton().click();
});

Cypress.Commands.add("getCustomTimestamp", (daysToApproach) => {
  let currentTimestamp = new Date();
  let zeroDayTimeStamp = currentTimestamp.setHours(0, 0, 0, 0) / 1000;
  let answer = String(zeroDayTimeStamp + 86400 * daysToApproach + "");
  return answer;
});
//let ups;
Cypress.Commands.add("touchForOccupied", (line, seat) => {
// let ups = 0;

  cy.get(
    `.buying-scheme__wrapper > :nth-child(${line}) > :nth-child(${seat})`
  ).then(($el) => {
    const classList = Array.from($el[0].classList);
    console.log($el);
    console.log(classList);
    if (classList.includes("buying-scheme__chair_taken")) {
      ups = 1;
      debugger;
    //  console.log(1);
  //    console.log(ups);
     return 1;
  /// exit
    } else {
   //   ups = 2;
      debugger;
    //  console.log(2);
   //   console.log(ups);
      return 2;
    // return ;
 //exit
    }
    debugger;
    // console.log(ups);
    
  });
 // console.log("qq"+psps);
 // console.log(ups);
 // return ups;
 // return `${ups}`;
 // return psps.value;
 
});
