const answers = require("../../fixtures/answers.json");
const users = require("../../fixtures/users.json");

import AdminLoginForm from "../../support/pages/adminLoginForm.js";
import ErrorPage from "../../support/pages/errorPage.js";

const admLoginFrm = new AdminLoginForm();
const errPg = new ErrorPage();

before(() => {
  cy.visit("/client/index.php");
});

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
});
