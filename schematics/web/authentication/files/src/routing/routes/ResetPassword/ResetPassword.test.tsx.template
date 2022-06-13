import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Auth } from "aws-amplify";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";

import ResetPassword from "./ResetPassword";

const renderWithHistory = (
  initialEntries: string[] = [],
  Component: JSX.Element
) => {
  const history = createMemoryHistory({
    initialEntries,
  });

  const [path] = initialEntries;

  return {
    ...render(
      <ThemeProvider>
        <Router location={path} navigator={history}>
          {Component}
        </Router>
      </ThemeProvider>
    ),
    history,
  };
};

const getResetPasswordElements = () => {
  const heading = screen.getByRole("heading", {
    name: "Create new password",
  });
  const passwordInput = screen.getByText("Password");
  const confirmPasswordInput = screen.getByText("Confirm Password");
  const saveButton = screen.getByRole("button", { name: /Save/i });

  return {
    heading,
    passwordInput,
    confirmPasswordInput,
    saveButton,
  };
};

describe("ResetPassword", () => {
  it("should show reset password view", () => {
    renderWithHistory(
      ["/create-new-password?username=test%40test.com&code=165582"],
      <ResetPassword />
    );

    getResetPasswordElements();
  });

  it("shoud redirect when no verification code in query params", () => {
    const { history } = renderWithHistory(
      ["/create-new-password"],
      <ResetPassword />
    );

    expect(history.location.pathname).toBe("/");
  });

  it("should call reset password function on submit", async () => {
    Auth.forgotPasswordSubmit = jest.fn();

    renderWithHistory(
      ["/create-new-password?username=test%40test.com&code=165582"],
      <ResetPassword />
    );

    const { passwordInput, confirmPasswordInput, saveButton } =
      getResetPasswordElements();

    await act(async () => {
      userEvent.type(passwordInput, "TestPassword00");
      userEvent.type(confirmPasswordInput, "TestPassword00");
      userEvent.click(saveButton);
    });

    expect(Auth.forgotPasswordSubmit).toBeCalled();
  });

  it("should validate password properly", async () => {
    renderWithHistory(
      ["/create-new-password?username=test%40test.com&code=165582"],
      <ResetPassword />
    );

    const { passwordInput, confirmPasswordInput, saveButton } =
      getResetPasswordElements();

    await act(async () => {
      userEvent.click(saveButton);
    });
    expect(
      screen.getAllByText(/Password is a required field/i)[0]
    ).toBeInTheDocument();

    await act(async () => {
      userEvent.type(passwordInput, "test");
      userEvent.click(saveButton);
    });
    expect(
      screen.getByText(/Your password should contain upper case letters/i)
    ).toBeInTheDocument();

    await act(async () => {
      userEvent.type(passwordInput, "Test");
      userEvent.type(confirmPasswordInput, "test");
    });
    expect(
      screen.getByText(/Your password should contain digits/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
  });
});
