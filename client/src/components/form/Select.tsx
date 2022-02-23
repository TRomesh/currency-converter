import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { selectProps } from "./Select.types";

const Select = ({
  data = [],
  onChange,
  disabled = false,
  value = [],
}: selectProps): JSX.Element => {
  return (
    <Autocomplete
      value={value}
      disabled={disabled}
      multiple
      id="tags-outlined"
      options={data}
      onChange={onChange}
      getOptionLabel={(option) => option.common}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Countries"
          placeholder="Countries"
        />
      )}
    />
  );
};

export default Select;
