export class FormLayoutsPage{


  submitInlineFormWithName(name, email) {
    cy.contains('nb-card', 'Inline form').find('form').then(form => {
      cy.wrap(form).find('[placeholder="Jane Doe"]').type(name);
      cy.wrap(form).find('[placeholder="Email"]').type(email);
      cy.wrap(form).find("[type='checkbox']").check({force:true});
      cy.wrap(form).find("button").click();
    })
  }

  submitGridForm(email, pass) {
    cy.contains("nb-card", "Using the Grid").find('form').then(form => {
      cy.wrap(form).find('[placeholder="Email"]').type(email);
      cy.wrap(form).find('[placeholder="Password"]').type(pass);
      cy.wrap(form).find("nb-radio-group").eq(0).then(option => {
        cy.wrap(option).find('[type="radio"]').check({force:true});
      });
      cy.wrap(form).submit();
    });
  }
}
export const onFormLayoutsPage = new FormLayoutsPage()
