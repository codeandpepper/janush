import { createTheme, CssBaseline, Theme, useMediaQuery } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { FC, ReactNode } from "react";

import { getPalette } from "@themes/palette";

export interface ThemeContextValue {
  theme: Theme;
}

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: getPalette(prefersDarkMode),
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
