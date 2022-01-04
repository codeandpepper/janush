import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Auth } from "aws-amplify";
import { MemoryRouter } from "react-router-dom";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import SignIn from "./SignIn";

describe("<SignIn />", () => {
  it("should call Auth.signIn() function on form submit", async () => {
    Auth.signIn = jest.fn();

    render(
      <ThemeProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailInput = await screen.findByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = await screen.findByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const signInElements = await screen.findAllByText(/Sign in/i);
    expect(signInElements).toHaveLength(2);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.click(signInElements[1]);
    });

    expect(Auth.signIn).toBeCalled();
  });

  it("should handle error form Auth.signIn()", async () => {
    Auth.signIn = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    render(
      <ThemeProvider>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </ThemeProvider>
    );

    const emailInput = await screen.findByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = await screen.findByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const signInElements = await screen.findAllByText(/Sign in/i);
    expect(signInElements).toHaveLength(2);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@test.com" } });
      fireEvent.change(passwordInput, { target: { value: "Test123456" } });
      fireEvent.click(signInElements[1]);
    });

    expect(Auth.signIn).toThrowError();
  });
});
