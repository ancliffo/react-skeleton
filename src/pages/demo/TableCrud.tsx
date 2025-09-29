import { Suspense, useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useCreateUser, useDeleteUser, useGetUsers, useUpdateUser } from "../../hooks/userHooks";
import type { User } from "../../types/userTypes";
import type { ValidationError } from "../../types/errorTypes";
import { usStates, positions, validateUser } from "../../utils";
import { Edit, Delete } from "@mui/icons-material";
import { TableCrudSkeleton } from "./TableCrudSkeleton";

export default function TableCrud() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableCreating: false,
        size: 80,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        muiEditTextFieldProps: () => {
          return {
            required: true,
            error: !!validationErrors?.firstName,
            helperText: validationErrors?.firstName,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                firstName: undefined,
              }),
          };
        },
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        muiEditTextFieldProps: () => {
          return {
            required: true,
            error: !!validationErrors?.lastName,
            helperText: validationErrors?.lastName,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                lastName: undefined,
              }),
          };
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: () => {
          return {
            type: "email",
            required: true,
            error: !!validationErrors?.email,
            helperText: validationErrors?.email,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                email: undefined,
              }),
          };
        },
      },
      {
        accessorKey: "state",
        header: "State",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: () => {
          return {
            select: true,
            error: !!validationErrors?.state,
            helperText: validationErrors?.state,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                state: undefined,
              }),
          };
        },
      },
      {
        accessorKey: "position",
        header: "Position",
        editVariant: "select",
        editSelectOptions: positions,
        muiEditTextFieldProps: () => {
          return {
            select: true,
            error: !!validationErrors?.position,
            helperText: validationErrors?.position,
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                position: undefined,
              }),
          };
        },
      },
    ],
    [validationErrors],
  );

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  // CREATE action
  const handleCreateUser: MRT_TableOptions<User>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    try {
      await createUser(values);
      table.setCreatingRow(null); // exit editing mode
    } catch (error: unknown) {
      // Handle server validation errors
      // Type guard to check if it's a ValidationError
      if (error instanceof Error && "validationErrors" in error) {
        const validationError = error as ValidationError;
        if (validationError.validationErrors) {
          setValidationErrors(validationError.validationErrors);
          return;
        }
      } else if (error instanceof Error) {
        console.error("Failed to create user:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  // UPDATE action
  const handleSaveUser: MRT_TableOptions<User>["onEditingRowSave"] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    try {
      await updateUser(values);
      table.setEditingRow(null); // exit editing mode
    } catch (error: unknown) {
      // Handle server validation errors
      // Type guard to check if it's a ValidationError
      if (error instanceof Error && "validationErrors" in error) {
        const validationError = error as ValidationError;
        if (validationError.validationErrors) {
          setValidationErrors(validationError.validationErrors);
          return;
        }
      } else if (error instanceof Error) {
        console.error("Failed to update user:", error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  // DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Create New User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {internalEditComponents?.slice(1) /* not the ID column */}
          {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit User</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        color="success"
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
          //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the
          // `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row,
          //     //useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <Suspense fallback={<TableCrudSkeleton />}>
      <MaterialReactTable table={table} />
    </Suspense>
  );
}
