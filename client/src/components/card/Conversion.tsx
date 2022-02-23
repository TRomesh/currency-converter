import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { ConversionProps } from "./Conversion.types";

const Conversion = ({ rate }: ConversionProps): JSX.Element => {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          {rate &&
            rate.map((r: any) => {
              const value = Object.entries(r)[0] as [string, number];
              return (
                <Grid container spacing={2} key={`${value[0]}-${value[1]}`}>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={8}>
                    <InputLabel style={{ height: `50px` }}>
                      SEK value in {`${value[0]} : ${value[1].toFixed(5)}`}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={2}></Grid>
                </Grid>
              );
            })}
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Paper>
  );
};

export default Conversion;
