const { onNavigationPage } = require("../support/page_Objects/navigationPage");
const { onFormLayoutsPage } = require("../support/page_Objects/formLayoutPage");
const { onDatePickerPage } = require("../support/page_Objects/datepickerpage");
const { onSmartTablePage } = require("../support/page_Objects/smartTable");

describe("tests with page objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage()
  });

  it("navig ", () => {
    onNavigationPage.formLayoutsPage();
    onNavigationPage.datePickerPage();
    onNavigationPage.modalPage();
    onNavigationPage.tablesPage();
    onNavigationPage.tooltipsPage();
  });

  it.only('should submit inline and basic form', () => {
    onNavigationPage.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithName('Daniel', 'test@test.com')
    onFormLayoutsPage.submitGridForm('email@email.com', '1234567890')
    onNavigationPage.datePickerPage();
    onDatePickerPage.datePickcer(1)
    onDatePickerPage.datePickcerInRange(1, 2)
    onNavigationPage.tablesPage();
    onSmartTablePage.addNameEmail('Daniel','Toma', 'daniel@d.com')
    onSmartTablePage.updateByFirstName('Daniel', 33)
    onSmartTablePage.deleteRowByIndex(1)
  })
});
