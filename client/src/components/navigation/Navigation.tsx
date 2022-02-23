import React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navigation = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Currency Converter
            </Typography>
          </Toolbar>
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
