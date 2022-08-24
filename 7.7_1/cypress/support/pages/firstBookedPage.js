const selectors = require("../../fixtures/selectors.json");
class FirstBookedPage {
  getFilmName() {
    return cy.get(selectors.bookingPage.filmForBooking);
  }

  getSeatsInfo() {
    return cy.get(selectors.bookingPage.seatsForBooking);
  }
}
export default FirstBookedPage;
