import { Box, Container, Typography } from "@mui/material";
import { VFC } from "react";
import { Helmet } from "react-helmet";

import { AuthBottomBar } from "@components/AuthBottomBar/AuthBottomBar";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Paths } from "@routing/paths";

import { SignInForm } from "./SignInForm/SignInForm";
import { SignInFormState } from "./SignInForm/SignInFormState";

interface Props {
  error: string;
  loading: boolean;
  onSignIn(formData: SignInFormState): void;
}

export const SignInView: VFC<Props> = ({ error, loading, onSignIn }) => {
  return (
    <AuthLayout>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <Container maxWidth="xs">
        <Box px={2} boxSizing="border-box">
          <Typography color="textPrimary" gutterBottom variant="h4">
            Sign in
          </Typography>
        </Box>
        <SignInForm error={error} loading={loading} onSubmit={onSignIn} />
      </Container>
      <AuthBottomBar
        text="Don't have an account?"
        buttonLinkPath={Paths.SIGN_UP_PATH}
        buttonText="Sign up"
        buttonDataTestId="go-to-sign-up-page-button"
      />
    </AuthLayout>
  );
};
