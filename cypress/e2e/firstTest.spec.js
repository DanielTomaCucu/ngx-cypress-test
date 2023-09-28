/// <reference types="cypress" />

const { table } = require("console");

describe("First test suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get("input");
    cy.get("#inputEmail1");
    cy.get(".input-full-width");
    cy.get("[fullwidth]");
    cy.get('[placeholder="Email"]');

    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Horizontal form").contains("Sign in");
    cy.contains("nb-card", "Horizontal form").get("button");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });
  it("shoul save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");

    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find("[for='inputPassword2']")
      .should("contain", "Password");
    cy.contains("nb-card", "Using the Grid").then((usingTheGrid) => {
      cy.wrap(usingTheGrid)
        .find("[for='inputPassword2']")
        .should("contain", "Password");
    });
  });

  it("extract text values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
    });
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.be.equal("label");
      });
    cy.get("#exampleInputEmail1").type("test@t.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@t.com")
      .then((property) => {
        expect(property).to.be.equal("test@t.com");
      });
  });

  it("radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(0).should("be.not.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });
  it("checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
    cy.get("[type='checkbox']").eq(2).uncheck({ force: true });
  });
  it("datepicker", () => {
    function getDateCorrect(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleDateString("en-US", {
        month: "short",
      });
      let futureYear = date.getFullYear();
      let dateAssert = `${futureMonth} ${futureDay}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttr) => {
          if (
            !dateAttr.includes(futureMonth) ||
            !dateAttr.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            getDateCorrect(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDay)
              .click();
          }
        });
      return dateAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((date) => {
        cy.wrap(date).click();

        const dateAssert = getDateCorrect(20);
        cy.wrap(date).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(date).should("have.value", dateAssert);
      });
  });
  it("lists", () => {
    cy.visit("/");
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");

    cy.get("nav nb-select").then((dropDown) => {
      cy.wrap(dropDown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const item = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropDown).should("contain", item);
        if (index < 3) {
          cy.wrap(dropDown).click();
        }
      });
    });
  });
  it("table tests", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(55);
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "55");
      });

    cy.get("thead .nb-plus").click();
    cy.get("thead tr")
      .eq(2)
      .then((trow) => {
        cy.wrap(trow).find('[placeholder="First Name"]').type("Jhon");
        cy.wrap(trow).find('[placeholder="Last Name"]').type("Johny");
        cy.wrap(trow).find('[placeholder="E-mail"]').type("tomaC@gmail.com");
        cy.wrap(trow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((newRow) => {
        cy.wrap(newRow).eq(2).should("contain", "Jhon");
        cy.wrap(newRow).eq(3).should("contain", "Johny");
        cy.wrap(newRow).eq(5).should("contain", "tomaC@gmail.com");
      });

    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age === 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it('tooltips', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Tooltip').click();
    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  })

  it.only('dialog box', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click();
    cy.contains('Smart Table').click()

    const stub = cy.stub();
    cy.on('window:confirm', stub);
    cy.get("tbody tr").first().find(".nb-trash").click().then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "Are you sure you want to delete?"
          );
        })

})
});
