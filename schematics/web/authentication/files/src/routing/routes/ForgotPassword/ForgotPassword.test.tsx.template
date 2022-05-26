import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "./ForgotPassword";
import { Auth } from "aws-amplify";

const MockForgotPassword = () => (
  <ThemeProvider>
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  </ThemeProvider>
);

describe("ForgotPassword", () => {
  it("should show forgot password form view", () => {
    render(<MockForgotPassword />);
    screen.getByText("Forgot your password?");
    screen.getByText(
      "Please write email you used during create account process. We will send you a message with instructions."
    );
    screen.getByRole("textbox", { name: /Email/i });
    screen.getByRole("button", {
      name: /Send/i,
    });
    screen.getByRole("button", {
      name: /Go Back/i,
    });
  });

  it("should validate email properly", async () => {
    render(<MockForgotPassword />);

    const emailInput = screen.getByRole("textbox", { name: /Email/i });
    expect(emailInput).toHaveValue("");

    const sendButton = screen.getByRole("button", {
      name: /Send/i,
    });

    await act(async () => {
      userEvent.click(sendButton);
    });

    screen.getByText(/Email is a required field/i);

    await act(async () => {
      userEvent.type(emailInput, "invalidEmail");
      userEvent.click(sendButton);
    });

    screen.getByText(/Email is not correct/i);
  });

  it("shoud call Auth.forgotPassword() function on submit", async () => {
    Auth.forgotPassword = jest.fn();

    render(<MockForgotPassword />);

    const emailInput = screen.getByRole("textbox", { name: /Email/i });

    const sendButton = screen.getByRole("button", { name: /Send/i });

    await act(async () => {
      userEvent.type(emailInput, "test@test.com");
      userEvent.click(sendButton);
    });

    expect(Auth.forgotPassword).toBeCalled();

    screen.getByRole("heading", {
      name: "Resetting your password",
    });

    screen.getByText(
      "If provided email does exists in our database then we will sent reset lin on it. You can close this page now."
    );
  });
});
