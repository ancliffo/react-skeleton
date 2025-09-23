import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type { CheckboxSingleProps } from "../../../customTypes/uiElement/control/CheckboxTypes";

export default function CheckboxSingle<T>({
  name,
  callback,
  label,
  rules,
}: CheckboxSingleProps<T>) {
  return <FormControlLabel control={<Checkbox defaultChecked name={name} />} label={label} />;
}
