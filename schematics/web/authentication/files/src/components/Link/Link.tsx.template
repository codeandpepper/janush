import { Link as MuiLink, LinkProps } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

type Props = Omit<LinkProps, "component" | "href"> & {
  to: string;
  testId?: string;
};

export const Link: FC<Props> = ({ children, testId, ...props }) => {
  return (
    <MuiLink component={RouterLink} data-testid={testId} {...props}>
      {children}
    </MuiLink>
  );
};
