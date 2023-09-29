function selectGroupName(grupName) {
  cy.contains("a", grupName).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state g g")
      .invoke("attr", "data-name")
      .then((attr) => {
        if (attr.includes("left")) {
          cy.wrap(menu).click();
        }
      });
  });
}

export class NavigationPage {
  formLayoutsPage() {
    selectGroupName("Forms");
    cy.contains("Form Layouts").click();
  }

  datePickerPage() {
    selectGroupName("Forms");
    cy.contains("Datepicker").click();
  }

  modalPage() {
    selectGroupName("Modal & Overlays");
    cy.contains("Toastr").click();
  }
  tablesPage() {
    selectGroupName("Tables & Data");
    cy.contains("Smart Table").click();
  }

  tooltipsPage() {
    selectGroupName("Modal & Overlays");
    cy.contains("Tooltip").click();
  }
}

export const onNavigationPage = new NavigationPage();
