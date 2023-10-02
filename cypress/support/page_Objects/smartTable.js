export class smartTable
{
  updateByFirstName(name, age) {
      cy.get("tbody")
        .contains("tr", name)
        .then((tableRow) => {
          cy.wrap(tableRow).find(".nb-edit").click();
          cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
          cy.wrap(tableRow).find(".nb-checkmark").click();
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        });
  }

  addNameEmail(name, pname, email) {
    cy.get("thead .nb-plus").click();
    cy.get("thead tr")
      .eq(2)
      .then((trow) => {
        cy.wrap(trow).find('[placeholder="First Name"]').type(name);
        cy.wrap(trow).find('[placeholder="Last Name"]').type(pname);
        cy.wrap(trow).find('[placeholder="E-mail"]').type(email);
        cy.wrap(trow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((newRow) => {
        cy.wrap(newRow).eq(2).should("contain", name);
        cy.wrap(newRow).eq(3).should("contain", pname);
        cy.wrap(newRow).eq(5).should("contain", email);
      });
  }

  deleteRowByIndex(index) {

    const stub = cy.stub();
    cy.on('window:confirm', stub);
    cy.get("tbody tr")
      .eq(index)
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });
  }
}
export const onSmartTablePage = new smartTable();
