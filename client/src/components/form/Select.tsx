import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { selectProps } from "./Select.types";

const Select = ({ data = [], onChange }: selectProps): JSX.Element => {
  return (
    <Autocomplete
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
