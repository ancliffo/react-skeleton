import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BasicButton from "../uiElements/controls/BasicButton";

import type { FormDialogProps } from "../../types/customTypes/container/FormDialogTypes";

// This file is not currently working - react-hook-form seems to be having trouble with
// the "children" paradigm. We need to revisit once we are on next.js and can update all
// library versions to see if that is the issue.
export function FormDialog<T>({
  title,
  description,
  openButtonLabel,
  openButton,
  submitButtonText,
  children,
  handleSubmitCallback,
}: FormDialogProps<T>) {
  const [open, setOpen] = React.useState(false);
  // const methods = useForm();
  // const { control } = useFormContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmitCallback(e);
    handleClose();
  };
  // react-hook-form MUST BE ADDED BACK IN
  return (
    <div>
      {openButton ? (
        openButton(handleClickOpen)
      ) : (
        <BasicButton callback={handleClickOpen} label={openButtonLabel ? openButtonLabel : null} />
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>{description}</DialogContentText>
          {/* <FormProvider {...methods}> */}
          <form onSubmit={handleSubmit}>
            {/* {methods.handleSubmit(handleSubmitCallback)}> */}
            {children}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{submitButtonText}</Button>
            </DialogActions>
          </form>
          {/* </FormProvider> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
