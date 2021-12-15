import React from "react";
import { Box, BoxProps, Container, ContainerProps } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface Props extends BoxProps {
  maxWidth?: ContainerProps["maxWidth"];
  withBottomPadding?: boolean;
  withTopPadding?: boolean;
  withTopGradient?: boolean;
}

export const PageLayout: React.FC<Props> = ({
  className,
  maxWidth = "md",
  withBottomPadding = false,
  withTopPadding = false,
  ...props
}) => (
  <Container maxWidth={maxWidth} disableGutters>
    <Box
      mt={4}
      pt={withTopPadding ? 6.5 : 0}
      pb={withBottomPadding ? 10 : 0}
      {...props}
    />
  </Container>
);
