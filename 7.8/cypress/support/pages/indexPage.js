const selectors = require("../../fixtures/selectors.json");

class IndexPage {
  visit() {
    cy.visit("/");
  }
  getTitle() {
    return cy.get(selectors.indexPage[0].vInHead);
  }
  getCurrentDate() {
    return cy.get(selectors.indexPage[1].daySelector);
  }
  get3DaysAfterDate() {
    return cy.get(selectors.indexPage[2].daySelector);
  }
  getLastDate() {
    return cy.get(selectors.indexPage[3].daySelector);
  }
  getSeance(id) {
    return cy.get(selectors.indexPage[4].seance+`${id}"]`);
  }
}
export default IndexPage;
