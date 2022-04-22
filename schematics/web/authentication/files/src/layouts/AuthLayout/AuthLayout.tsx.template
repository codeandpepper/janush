import { Box, Container, ContainerProps } from "@mui/material";
import { FC } from "react";

import { useStyles } from "./styles";

interface Props {
  maxWidth?: ContainerProps["maxWidth"];
}

export const AuthLayout: FC<Props> = ({ maxWidth = "md", children }) => {
  const styles = useStyles();
  return (
    <Container maxWidth={maxWidth} className={styles.container} disableGutters>
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="fit-content">{children}</Box>
      </Box>
    </Container>
  );
};
