import {
  SyntheticEvent,
  ChangeEvent,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "../components/card/Card";
import Conversion from "../components/card/Conversion";
import Select from "../components/form/Select";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { LIST_COUNTRIES, COUNTRY_DETAILS, CONVERT } from "../Queries";
import { useQuery, useMutation } from "@apollo/client";
import debounce from "lodash.debounce";

interface initSelectedState {
  amount: number;
  selectedCountries: any[];
}

const Home = (): JSX.Element => {
  const [selected, setSelected] = useState<initSelectedState>({
    amount: 0,
    selectedCountries: [],
  });
  const { loading, error, data } = useQuery(LIST_COUNTRIES);

  const [details, detailsStatus] = useMutation(COUNTRY_DETAILS);

  const [convert, convertStatus] = useMutation(CONVERT);

  const debouncedAmountConvert = useRef(
    debounce(async ({ amount, codes }) => {
      convert({ variables: { codes, amount: parseFloat(amount) } });
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedAmountConvert.cancel();
    };
  }, [debouncedAmountConvert]);

  const onSelectChange = (
    event: SyntheticEvent<Element, Event>,
    value: any[]
  ): void => {
    event.preventDefault();
    setSelected({ ...selected, selectedCountries: value });
  };

  const getCounryDetails = (): void => {
    let codes: string[] = selected.selectedCountries.map(
      (country) => country.cca2
    );
    details({ variables: { codes } });
  };

  const renderCountryDetailsList = (countries: any[]) => {
    return countries && countries.length > 0
      ? countries.map((country: any) => {
          return (
            <Fragment key={`${country.cca2}-${country.official}`}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Card
                  rates={country.rates}
                  common={country.official}
                  population={country.population}
                  currencies={country.currencies}
                />
              </Grid>
              <Grid item xs={1}></Grid>
            </Fragment>
          );
        })
      : null;
  };

  const renderConversionList = (rates: any[]) => {
    return rates && rates.length > 0
      ? rates.map((rate, i) => {
          return (
            <Fragment key={i}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Conversion rate={rate} />
              </Grid>
              <Grid item xs={1}></Grid>
            </Fragment>
          );
        })
      : null;
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSelected({ ...selected, amount: parseFloat(event.target.value) });
    let codes =
      detailsStatus &&
      detailsStatus?.data?.country_details.map((country: any) => country.cca2);
    debouncedAmountConvert({ amount: event.target.value, codes });
  };

  if (loading)
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <CircularProgress />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Select data={data && data.country_list} onChange={onSelectChange} />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Button variant="outlined" onClick={getCounryDetails}>
          Details
        </Button>
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        {detailsStatus?.data?.country_details.length > 0 ? (
          <TextField
            fullWidth
            id="outlined-basic"
            label="Convert from SEK"
            variant="outlined"
            onChange={onChange}
          />
        ) : null}
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          {renderCountryDetailsList(detailsStatus?.data?.country_details)}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={3}>
          {renderConversionList(
            convertStatus?.data?.convert?.conversion?.result
          )}
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Home;
