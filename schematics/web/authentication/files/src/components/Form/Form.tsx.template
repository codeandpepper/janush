import { DetailedHTMLProps, FC, FormHTMLAttributes } from "react";

type Props = Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  "noValidate"
>;

export const Form: FC<Props> = ({ children, ...props }) => (
  <form {...props} noValidate>
    {children}
  </form>
);
