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
import { useToasts } from "react-toast-notifications";

interface initSelectedState {
  amount: number;
  selectedCountries: any[];
  selectEnabled: boolean;
}

const Home = (): JSX.Element => {
  const { addToast } = useToasts();
  const [selected, setSelected] = useState<initSelectedState>({
    amount: 0,
    selectEnabled: true,
    selectedCountries: [],
  });
  const { loading, error, data } = useQuery(LIST_COUNTRIES, {
    onError: (error) => {
      addToast(error.message, { appearance: "error", autoDismiss: true });
    },
  });

  const [details, detailsStatus] = useMutation(COUNTRY_DETAILS, {
    onCompleted: () => {
      setSelected({ ...selected, selectEnabled: false });
    },
  });

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
            <td key={`${country.cca2}-${country.official}`}>
              <Card
                rates={country.rates}
                common={country.official}
                population={country.population}
                currencies={country.currencies}
              />
            </td>
          );
        })
      : null;
  };

  const renderConversionList = (rates: any[]) => {
    return rates && rates.length > 0
      ? rates.map((rate, i) => {
          return (
            <td key={i}>
              <Conversion rate={rate} />
            </td>
          );
        })
      : null;
  };

  const getCountryCodes = () => {
    return (
      detailsStatus &&
      detailsStatus?.data?.country_details.map((country: any) => country.cca2)
    );
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSelected({
      ...selected,
      amount: parseFloat(event.target.value),
    });
    let codes = getCountryCodes();
    debouncedAmountConvert({ amount: event.target.value, codes });
  };

  const Cancel = () => {
    setSelected({
      ...selected,
      selectedCountries: [],
      selectEnabled: true,
      amount: 0,
    });
    detailsStatus.reset();
    convertStatus.reset();
  };

  if (loading)
    return (
      <Grid container spacing={2}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <CircularProgress />
          <span>Loading....</span>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
        <Select
          value={selected.selectedCountries}
          data={data && data.country_list}
          onChange={onSelectChange}
          disabled={!selected?.selectEnabled}
        />
      </Grid>
      <Grid item xs={2}></Grid>
      <Grid item xs={9}></Grid>
      <Grid item xs={1}>
        <Button
          variant="outlined"
          onClick={() => {
            Cancel();
          }}
        >
          Clear
        </Button>
      </Grid>
      <Grid item xs={1}>
        <Button variant="outlined" onClick={getCounryDetails}>
          Details
        </Button>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={12}></Grid>
      {detailsStatus?.loading ? (
        <Fragment>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <CircularProgress size={1} />
          </Grid>
          <Grid item xs={4}></Grid>
        </Fragment>
      ) : (
        <Fragment>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {detailsStatus?.data?.country_details.length > 0 ? (
              <TextField
                fullWidth
                value={selected.amount}
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
          <Grid item xs={10}>
            <table>
              <tbody>
                <tr>
                  {renderCountryDetailsList(
                    detailsStatus?.data?.country_details
                  )}
                </tr>
                <tr>
                  {renderConversionList(
                    convertStatus?.data?.convert?.conversion?.result
                  )}
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={1}></Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default Home;
