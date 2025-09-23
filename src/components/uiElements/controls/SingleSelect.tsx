import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SingleSelectProps } from "../../../customTypes/uiElement/control/SingleSelectTypes";

export default function SingleSelect<T>({
  name,
  options,
  callback,
  label,
  value,
  optionDisplayKey,
  optionValueKey,
  fullwidth,
}: SingleSelectProps<T>) {
  const handleChange = (event: SelectChangeEvent<T>) => {
    if (callback) {
      callback(event.target.value as any);
    }
  };

  return (
    <FormControl fullWidth={fullwidth} sx={{ margin: 1 }}>
      <InputLabel size="small" id={label + "-select-label"}>
        {label}
      </InputLabel>
      <Select
        variant="outlined"
        size="small"
        name={name}
        labelId={label + "-select-label"}
        label={label}
        id={label + "-select"}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value={""}></MenuItem>
        {options
          ? options.map((option: any, index: number) => (
              <MenuItem value={option[optionValueKey]}>{option[optionDisplayKey]}</MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  );
}
