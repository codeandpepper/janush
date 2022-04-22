import { LinearProgress } from "@mui/material";
import { FC, Suspense } from "react";

import { useStyles } from "./styles";

export const SuspenseProvider: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Suspense fallback={<LinearProgress className={classes.progress} />}>
      {children}
    </Suspense>
  );
};
