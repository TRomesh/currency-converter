import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { ConversionProps } from "./Conversion.types";

const Conversion = ({ rate }: ConversionProps): JSX.Element => {
  return (
    <Paper>
      {rate &&
        rate.map((r: any) => {
          const value = Object.entries(r);
          return (
            <Grid container spacing={2} key={`${value[0]}-${value[1]}`}>
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <InputLabel style={{ height: `50px` }}>
                  SEK value in {`${value[0]} : ${value[1]}`}
                </InputLabel>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          );
        })}
    </Paper>
  );
};

export default Conversion;
