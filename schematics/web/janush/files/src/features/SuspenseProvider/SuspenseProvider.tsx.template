import React from "react";
import { LinearProgress } from "@mui/material";

import { useStyles } from "./styles";

export const SuspenseProvider: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Suspense fallback={<LinearProgress className={classes.progress} />}>
      {children}
    </React.Suspense>
  );
};
