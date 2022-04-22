import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  StandardTextFieldProps,
  IconButton,
  InputAdornment,
  Theme,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MouseEvent, useState } from "react";

import { TextField } from "@components/TextField/TextField";
import { formDataTestId } from "@utils/formDataTestId/formDataTestId";

interface Props extends StandardTextFieldProps {
  errorMessage?: string;
  ariaControls?: string;
  dataTestId?: string;
}

export const PasswordField = ({
  ariaControls,
  errorMessage,
  dataTestId,
  ...restProps
}: Props): JSX.Element => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

  const onVisibilityToggleClick = () => {
    setPasswordVisible((isVisible) => !isVisible);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getVisibilityLabel = (passwordShown: boolean): string =>
    passwordShown ? "Hide password" : "Show password";

  const theme = useTheme<Theme>();

  return (
    <TextField
      error={Boolean(errorMessage)}
      helperText={errorMessage}
      type={isPasswordVisible ? "text" : "password"}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={getVisibilityLabel(isPasswordVisible)}>
              <IconButton
                aria-controls={ariaControls}
                data-testid={formDataTestId(dataTestId, "show-icon")}
                aria-expanded={isPasswordVisible}
                aria-label={getVisibilityLabel(isPasswordVisible)}
                onClick={onVisibilityToggleClick}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {isPasswordVisible ? (
                  <VisibilityOff htmlColor={theme.palette.primary.light} />
                ) : (
                  <Visibility htmlColor={theme.palette.primary.light} />
                )}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        startAdornment: (
          <InputAdornment position="start">
            <Lock color="primary" />
          </InputAdornment>
        ),
        inputProps: {
          "data-testid": formDataTestId(dataTestId, "input-field"),
        },
      }}
      data-testid={dataTestId}
      {...restProps}
    />
  );
};
