import { Box, Button, Grid, Typography } from "@mui/material";
import { VFC } from "react";

import { Link } from "@components/Link/Link";

interface Props {
  buttonText: string;
  buttonLinkPath: string;
  buttonDataTestId?: string;
  linkTestId?: string;
  text: string;
}

export const AuthBottomBar: VFC<Props> = ({
  buttonLinkPath,
  buttonText,
  text,
  buttonDataTestId,
  linkTestId,
}) => {
  return (
    <Box py={4.75}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item>
          <Link to={buttonLinkPath} underline="none" testId={linkTestId}>
            <Button
              data-testid={buttonDataTestId}
              variant="outlined"
              color="primary"
            >
              {buttonText}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
