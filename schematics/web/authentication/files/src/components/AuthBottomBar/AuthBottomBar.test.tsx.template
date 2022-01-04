import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { AuthBottomBar } from "@components/AuthBottomBar/AuthBottomBar";

describe("<AuthBottomBar />", () => {
  it("should render properly", () => {
    const bar = render(
      <MemoryRouter>
        <AuthBottomBar
          buttonText="Create test account"
          buttonLinkPath="/create-test-account"
          text="Still don't have test account?"
          linkTestId="create-test-account-link"
        />
      </MemoryRouter>
    );

    expect(bar.getByText("Create test account").tagName).toEqual("BUTTON");
    bar.getByText("Still don't have test account?").closest("a");
    expect(
      bar.getByTestId("create-test-account-link").getAttribute("href")
    ).toEqual("/create-test-account");
  });
});
