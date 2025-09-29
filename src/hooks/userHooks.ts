import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type User } from "../types/userTypes";
import { type ValidationError } from "../types/errorTypes";

export const handleApiError = async (response: Response): Promise<never> => {
  const errorData = await response.json();

  // Check if it's a Zod validation error
  if (errorData.error?.name === "ZodError") {
    const zodErrors = JSON.parse(errorData.error.message);
    const validationErrors = zodErrors.reduce(
      (acc: Record<string, string>, error: { path: string[]; message: string }) => {
        acc[error.path[0]] = error.message;
        return acc;
      },
      {},
    );

    const customError = new Error("Validation failed") as ValidationError;
    customError.validationErrors = validationErrors;
    customError.statusCode = response.status;
    throw customError;
  }

  // Handle other non-200 errors
  const error = new Error(`Request failed: ${response.status}`) as ValidationError;
  error.statusCode = response.status;
  throw error;
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      return Promise.resolve();
    },
    // Client side optimistic update - add new user to the list immediately
    // Assumes that your back end will return the new user with an ID
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: User[]) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as User[],
      );
    },
    onError: (error: ValidationError) => {
      if (error.statusCode === 400 && error.validationErrors) {
        // Handle validation errors
        Object.entries(error.validationErrors).forEach(([field, message]) => {
          console.error(`${field}: ${message}`);
        });
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");

      if (!response.ok) {
        await handleApiError(response);
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      //send api update request here
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        await handleApiError(response);
      }
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(["users"], (prevUsers: User[]) =>
        prevUsers?.map((prevUser: User) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      //send api update request here
      const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });

      if (!response.ok) {
        await handleApiError(response);
      }
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId: string) => {
      queryClient.setQueryData(["users"], (prevUsers: User[]) =>
        prevUsers?.filter((user: User) => user.id !== userId),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export { useCreateUser, useGetUsers, useUpdateUser, useDeleteUser };
