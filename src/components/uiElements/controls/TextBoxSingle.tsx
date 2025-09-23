import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import type { TextBoxSingleProps } from "../../../customTypes/uiElement/control/TextBoxTypes";

function TextBoxSingle({ name, callback, label }: TextBoxSingleProps) {
  // const { control } = useFormContext();
  // const { control } = useFormContext();
  // console.log('Context available:', !!control); // Should log: true

  return (
    <FormControl fullWidth>
      <TextField
        name={name}
        size="small"
        onChange={callback}
        // {...field}
        label={label}
        // error={!!fieldState.error}
        // helperText={fieldState.error?.message}
        variant="outlined"
      />
    </FormControl>
    // <Controller
    //   name={name}
    //   // control={control}
    //   rules={rules}
    //   defaultValue=""
    //   render={({ field, fieldState }) => (
    //     <TextField
    //       {...field}
    //       label={label}
    //       error={!!fieldState.error}
    //       helperText={fieldState.error?.message}
    //       fullWidth
    //       variant="outlined"
    //     />
    //   )}
    // />
  );
}

export default TextBoxSingle;
