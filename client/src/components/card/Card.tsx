import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import { CardProps } from "./Card.types";

const prettyNumbers = (x: number) =>
  x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

const Card = ({
  rates,
  common,
  population,
  currencies,
}: CardProps): JSX.Element => {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <InputLabel>Country: {common}</InputLabel>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <InputLabel>Population : {prettyNumbers(population)}</InputLabel>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={2}>
              <InputLabel>Currencies : </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <InputLabel>
                {currencies &&
                  Object.values(currencies).map(
                    ({ name, symbol }: { name: string; symbol: string }) => {
                      return (
                        <InputLabel key={`${symbol}-${name}`}>
                          {name}
                        </InputLabel>
                      );
                    }
                  )}
              </InputLabel>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={2}>
              <InputLabel>Rates : </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <InputLabel>
                {rates &&
                  rates.map((rate) => {
                    if (rate) {
                      const [value] = Object.entries(rate);
                      return (
                        <InputLabel key={`${value[0]}-${value[1]}`}>{`${
                          value[0]
                        } : ${value[1].toFixed(5)}`}</InputLabel>
                      );
                    }
                  })}
              </InputLabel>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
