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
import AdminLoginForm from "../support/pages/adminLoginForm";
const admLoginFrm = new AdminLoginForm();

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
