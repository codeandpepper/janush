import React from "react";

type Props = Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  "noValidate"
>;

const Form: React.FC<Props> = ({ children, ...props }) => (
  <form {...props} noValidate>
    {children}
  </form>
);

export default Form;
