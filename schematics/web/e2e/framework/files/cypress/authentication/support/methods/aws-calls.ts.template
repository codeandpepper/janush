const defaultPassword = "Password1234";

Cypress.Commands.add("confirmUserSignUp", (email: string) => {
  cy.exec(
    `aws cognito-idp admin-confirm-sign-up \
  --user-pool-id ${Cypress.env("userPoolId")} \
  --username ${email}`
  );
});

Cypress.Commands.add("createUserWithPassword", (email: string) => {
  cy.exec(`aws cognito-idp admin-create-user \
  --user-pool-id ${Cypress.env("userPoolId")} \
  --username ${email}`);
  cy.exec(`aws cognito-idp admin-set-user-password \
  --user-pool-id ${Cypress.env("userPoolId")} \
  --username ${email} \
  --password ${defaultPassword} \
  --permanent`);
});

Cypress.Commands.add(
  "addUserToSpecificGroup",
  (email: string, group: string) => {
    cy.exec(`aws cognito-idp admin-add-user-to-group \
  --user-pool-id ${Cypress.env("userPoolId")} \
  --username ${email} \
  --group-name ${group}`);
  }
);

Cypress.Commands.add("createAdminWithPassword", (email: string) => {
  cy.createUserWithPassword(email);
  cy.addUserToSpecificGroup(email, "admin");
});
