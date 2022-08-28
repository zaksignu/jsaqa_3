const selectors = require("../../fixtures/selectors.json");

class AdminPage {
  visit() {
    cy.visit("/admin");
  } 
  
  getTitle(){
    return cy.get(selectors.adminPage.headerTitel);
  
  }
//1st block
//2nd block 
//3rd block
//4th block
//5th block
getLoginField(){
  
}

}
export default AdminPage;
