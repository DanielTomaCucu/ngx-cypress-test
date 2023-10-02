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
      if (!dateAttr.includes(futureMonth) || !dateAttr.includes(futureYear)) {
        cy.get('[data-name="chevron-right"]').click();
        getDateCorrect(day);
      } else {
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });
  return dateAssert;
}
export class DatePickerpage {
  datePickcer(dayToday) {


    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((date) => {
        cy.wrap(date).click();

        const dateAssert = getDateCorrect(dayToday);
        cy.wrap(date).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(date).should("have.value", dateAssert);
      });
  }

  datePickcerInRange(firstDay, secondDay) {


    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((date) => {
        cy.wrap(date).click();

        const fd = getDateCorrect(firstDay);
        const sd = getDateCorrect(secondDay);
        const final = fd + ' - ' + sd
        cy.wrap(date).invoke("prop", "value").should("contain", final);
        cy.wrap(date).should("have.value", final);
      });
  }
}
export const onDatePickerPage = new DatePickerpage();
