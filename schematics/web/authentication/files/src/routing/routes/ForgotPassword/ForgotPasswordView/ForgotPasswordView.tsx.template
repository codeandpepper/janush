import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { VFC } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { Link } from "@components/Link/Link";
import { AuthLayout } from "@layouts/AuthLayout/AuthLayout";
import { Paths } from "@routing/paths";

import { ForgotPasswordForm } from "./ForgotPasswordForm/ForgotPasswordForm";
import { ForgotPasswordFormState } from "./ForgotPasswordForm/formState";

interface Props {
  error: string;
  loading: boolean;
  onForgotPassword(formData: ForgotPasswordFormState): void;
  isEmailSent?: boolean;
}

const EmailSentContentBox: VFC = () => (
  <Box px={2}>
    <Typography
      color="textPrimary"
      gutterBottom
      variant="h4"
      textAlign="center"
    >
      Resetting your password
    </Typography>
    <Typography variant="body1" textAlign="center" gutterBottom>
      If provided email does exists in our database, then we will sent reset
      link on it. You can close this page now.
    </Typography>
    <Link to={Paths.SIGN_IN_PATH} underline="none">
      <Button
        color="primary"
        variant="text"
        fullWidth
        data-testid="back-to-sign-in-button"
      >
        Back to sign in page
      </Button>
    </Link>
  </Box>
);

const ForgotPasswordContentBox: VFC<Props> = ({
  onForgotPassword,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  return (
    <Box px={2} boxSizing="border-box">
      <Typography color="textPrimary" gutterBottom variant="h4">
        Forgot your password?
      </Typography>
      <Typography variant="body1">
        Please write email you used during create account process. We will send
        you a message with instructions.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ForgotPasswordForm
            onSubmit={onForgotPassword}
            loading={loading}
            error={error}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={loading}
            onClick={() => navigate(-1)}
            color="primary"
            variant="text"
            fullWidth
            data-testid="back-to-sign-in-button"
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export const ForgotPasswordView: VFC<Props> = ({
  onForgotPassword,
  loading,
  error,
  isEmailSent,
}) => (
  <AuthLayout>
    <Container maxWidth="xs">
      <Helmet>
        <title>Forgot password</title>
      </Helmet>
      {isEmailSent ? (
        <EmailSentContentBox />
      ) : (
        <ForgotPasswordContentBox
          onForgotPassword={onForgotPassword}
          loading={loading}
          error={error}
        />
      )}
    </Container>
  </AuthLayout>
);
