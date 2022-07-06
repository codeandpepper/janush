import { authSelectors } from "../support/selectors/auth-selectors";
import {
  FakeUserData,
  generateFakeUserData,
} from "../support/methods/generate-data";

const user: FakeUserData = generateFakeUserData();

describe("Forgot password test suite", () => {
  before(() => {
    cy.visitPageCheckURL("sign-in");
  });

  it("User is able to go to the forgot password page and go back", () => {
    cy.clickOn(authSelectors.buttons.forgotPassword);
    cy.checkThatURLContains("/forgot-password");
    cy.clickOn(authSelectors.buttons.backToSignIn);
    cy.checkThatURLContains("/sign-in");
  });

  it("User is not able to send reset password form when email is missing", () => {
    cy.clickOn(authSelectors.buttons.forgotPassword);
    cy.clickOn(authSelectors.buttons.sendForgottenPassword);
    cy.checkValidation("Email is a required field");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is not able to send reset password form when email doesn't contain @ sign", () => {
    cy.typeText(authSelectors.inputs.email, user.email.withoutAtSign);
    cy.clickOn(authSelectors.buttons.sendForgottenPassword);
    cy.checkValidation("Email is not correct");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is not able to send reset password form when email doesn't contain a proper domain", () => {
    cy.typeText(authSelectors.inputs.email, user.email.withoutDomain);
    cy.clickOn(authSelectors.buttons.sendForgottenPassword);
    cy.checkValidation("Email is not correct");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is able to send reset password form when email is correct", () => {
    cy.typeText(authSelectors.inputs.email, user.email.correct);
    cy.clickOn(authSelectors.buttons.sendForgottenPassword);
    cy.contains("Resetting your password").should("be.visible");
    cy.checkThatURLContains("/forgot-password");
  });

  it("User is able to get back to sign in page after getting reset password confirmation screen", () => {
    cy.clickOn(authSelectors.buttons.backToSignIn);
    cy.checkThatURLContains("/sign-in");
  });
});
