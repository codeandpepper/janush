// Add all your custom global commands to the "Chainable" interface
namespace Cypress {
  interface Chainable {
    checkThatURLContains(specificPage: string);
    fillSignUpForm(email: string, password: string);
    fillSignInForm(email: string, password: string);
    signOut();
    clickOn(selector: string);
    typeText(selector: string, text: string);
    clearElement(selector: string);
    checkValidation(validationText: string);
    getByDataTestId<T>(selector: string, ...args: T[]);
    checkIfTextIsShown(selector: string, text: string);
    checkTheStateOfElement(selector: string, state: string);
    checkIfPasswordIsVisible(selector: string, isVisible: boolean);
    confirmUserSignUp(email: string);
    createUserWithPassword(email: string);
    addUserToSpecificGroup(email: string, group: string);
    createAdminWithPassword(email: string);
    visitPageCheckURL(specificPage: string);
  }
}
