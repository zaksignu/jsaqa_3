const answers = require("../../fixtures/answers.json");
const users = require("../../fixtures/users.json");

import AdminLoginForm from "../../support/pages/adminLoginForm.js";
import AdminPage from "../../support/pages/adminPage.js";

const admLoginFrm = new AdminLoginForm();
const admPg = new AdminPage();

before(() => {
  admLoginFrm.visit();
});
describe("Cinema tests. Testings admin login ", () => {
  it("Should successfully login with happy path", () => {
    cy.login(users.validUsers[0].mail, users.validUsers[0].pass);
    admPg.getTitle().contains(answers.adminPage.headerTitel);
  });
});
