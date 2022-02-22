import React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";

const Navigation = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <AppBar>
          <span>Convert</span>
        </AppBar>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Navigation;
