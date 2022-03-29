import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useForm } from "react-hook-form";

import { ThemeProvider } from "@features/ThemeProvider/ThemeProvider";
import { PasswordField } from "./PasswordField";

const setup = () => {
  const FormWrapper: React.VFC = () => {
    const {
      formState: { errors },
    } = useForm<{ password: string }>({
      mode: "all",
      defaultValues: { password: "" },
    });

    return (
      <ThemeProvider>
        <PasswordField
          id="password"
          name="password"
          label="password"
          placeholder="password"
          error={!!errors.password?.message}
        />
      </ThemeProvider>
    );
  };

  return render(<FormWrapper />);
};

describe("<PasswordField />", () => {
  it("should render with type set to password", () => {
    const utils = setup();
    const passwordInput = utils.getByPlaceholderText(
      "password"
    ) as HTMLInputElement;
    expect(passwordInput.type).toEqual("password");
  });

  it("should change its type to text on visibility button click", () => {
    const utils = setup();

    const visibilityButton = utils.getByLabelText("Show password");
    fireEvent.click(visibilityButton);

    const passwordInput = utils.getByPlaceholderText(
      "password"
    ) as HTMLInputElement;
    expect(passwordInput.type).toEqual("text");
  });

  it("should change aria-label on visibility button click", () => {
    const utils = setup();

    const visibilityButton = utils.getByLabelText("Show password");
    fireEvent.click(visibilityButton);
    const ariaLabel = visibilityButton.getAttribute("aria-label");

    expect(ariaLabel).toEqual("Hide password");
  });
});
