import { render, waitFor } from "@testing-library/react";
import { Auth } from "aws-amplify";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { Paths } from "@routing/paths";
import ConfirmSignUp from "./ConfirmSignUp";

const setup = () => {
  return render(
    <ThemeProvider>
      <ConfirmSignUp />
    </ThemeProvider>
  );
};

// eslint-disable-next-line no-var
var mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "www.test-path.com",
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ConfirmSignUp", () => {
  it("should inform user about the processing", () => {
    Auth.confirmSignUp = jest.fn();
    const env = setup();

    env.getByText("Please wait...");
  });

  it("should redirect user to sign-up page on success", async () => {
    Auth.confirmSignUp = jest.fn();
    setup();

    await waitFor(() =>
      expect(mockHistoryPush).toBeCalledWith(Paths.SIGN_IN_PATH)
    );
  });

  it("should display an error on failure", async () => {
    Auth.confirmSignUp = jest.fn().mockImplementation(() => {
      // eslint-disable-next-line
      throw {
        message: "Wrong code",
      };
    });

    const env = setup();

    await env.findByText("Wrong code");
  });
});
