const selectors = require("../../fixtures/selectors.json");
class SeatsPage {
  getSeatsBlock(row, seat) {
    return cy.get(
      selectors.bookingPage.seatBooking_1 + `${row}` + selectors.bookingPage.seatBooking_2 +
        `${seat}` + selectors.bookingPage.seatBooking_3
    );
  }
  getBookPage() {
    return cy.get(".acceptin-button");
  }
}
export default SeatsPage;
