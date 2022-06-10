import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Auth } from "aws-amplify";
import { MemoryHistory } from "history";
import { MemoryRouter, Router } from "react-router-dom";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { Paths } from "@routing/paths";

import VerifyEmail from "./VerifyEmail";

const setupHistory: MemoryHistory = {
  push: jest.fn(),
  createHref: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  location: {},
  listen: jest.fn(),
};

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    state: {
      email: "test@test.com",
    },
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const setup = async (history?: MemoryHistory) => {
  render(
    <ThemeProvider>
      {history ? (
        <Router location={Paths.VERIFY_EMAIL_PATH} navigator={history}>
          <VerifyEmail />
        </Router>
      ) : (
        <MemoryRouter>
          <VerifyEmail />
        </MemoryRouter>
      )}
    </ThemeProvider>
  );
};

describe("<VerifyEmail />", () => {
  it("should render email if provided in location state", async () => {
    await setup();
    const element = screen.getByText("test@test.com");
    expect(element).toBeInTheDocument();
  });

  it("should call Auth.resendSignUp() on button click", async () => {
    jest.useFakeTimers();
    Auth.resendSignUp = jest.fn();

    await setup();
    const buttonText = screen.getByText("Resend email");
    expect(buttonText).toBeInTheDocument();

    await act(async () => {
      jest.runAllTimers();
      fireEvent.click(buttonText);
    });

    const button = buttonText.closest("button");
    expect(button).toBeDisabled();
  });

  it("should call Auth. on button click", async () => {
    jest.useFakeTimers();
    Auth.confirmSignUp = jest.fn();
    await setup(setupHistory);

    const buttonText = screen.getByText("Verify code");
    expect(buttonText).toBeInTheDocument();

    const input = screen.getByTestId("verification-code-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "123123" } });
    });

    await act(async () => {
      jest.runAllTimers();
      fireEvent.click(buttonText);
    });

    await waitFor(() =>
      expect(mockNavigate).toBeCalledWith(Paths.SIGN_IN_PATH)
    );
  });
});

it("should display an error on failure", async () => {
  jest.useFakeTimers();
  const message = "Wrong code";
  Auth.confirmSignUp = jest.fn().mockImplementation(() => {
    // eslint-disable-next-line
    throw {
      code: "CodeMismatchException",
      message,
    };
  });
  await setup(setupHistory);

  const buttonText = screen.getByText("Verify code");
  expect(buttonText).toBeInTheDocument();

  const input = screen.getByTestId("verification-code-input");

  await act(async () => {
    fireEvent.change(input, { target: { value: "Incorrect code 123" } });
  });

  await act(async () => {
    jest.runAllTimers();
    fireEvent.click(buttonText);
  });

  const errorMessage = await screen.findByText(message);
  expect(errorMessage).toBeInTheDocument();
  await waitFor(() =>
    expect(mockNavigate).not.toBeCalledWith(Paths.SIGN_IN_PATH)
  );
});
