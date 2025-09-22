

import Button from '@mui/material/Button';
import { BasicButtonProps } from "../../customTypes/uiElement/control/BasicButtonTypes";

export default function BasicButton<T>({ callback, label }: BasicButtonProps<T>) {

  return (
      <Button variant="contained" onClick={callback}>{label}</Button>
  );
}


