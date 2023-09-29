const { onNavigationPage } = require("../support/page_Objects/navigationPage");

describe("tests with page objects", () => {
  beforeEach("open application", () => {
    cy.visit("/");
  });

  it("navig ", () => {
    onNavigationPage.formLayoutsPage();
    onNavigationPage.datePickerPage();
    onNavigationPage.modalPage();
    onNavigationPage.tablesPage();
    onNavigationPage.tooltipsPage();
  });
});
