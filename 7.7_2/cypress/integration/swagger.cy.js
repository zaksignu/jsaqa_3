const usr = require("../fixtures/injectUser.json");
const usrUpd = require("../fixtures/updateUser.json");
const ans = require("../fixtures/answers.json");

describe("Swagger tests", () => {
  it("Adding user", () => {
    cy.request({
      method: "POST",
      url: "/v2/user/",
      body: usr,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
  });
  it("Getting user after add", () => {
    cy.request({
      method: `GET`,
      url: "/v2/user/" + ans.userName,
      headers: { accept: "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("username", ans.userName); // true
    });
  });

  it("Updating user", () => {
    cy.request({
      method: "PUT",
      url: "/v2/user/" + ans.userName,
      body: usrUpd,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
    });
  });

  it("Getting user after updating", () => {
    cy.request({
      method: `GET`,
      url: "/v2/user/" + ans.userNameUpdated,
      headers: { accept: "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.body));
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("username", ans.userNameUpdated); // true
    });
  });

  it("Removing user", () => {
    cy.request({
      method: `DELETE`,
      url: "/v2/user/" + ans.userNameUpdated,

      headers: { accept: "application/json" },
    }).then((response) => {
      expect(response.status).to.eq(200); // true
      console.log(JSON.stringify(response.body));
    });
  });

  it("Touching user to make sure it was deleted", () => {
    cy.request({
      failOnStatusCode: false,
      method: `GET`,
      url: "/v2/user/" + ans.userNameUpdated,
    }).then((response) => {
      console.log(JSON.stringify(response.body));
      expect(response.status).to.eq(404);
    });
  });
});
