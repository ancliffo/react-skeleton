import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";

// API function to fetch users
const fetchUsers = async () => {
  const response = await fetch("/api/users"); // Use proxy path instead
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const Demo: React.FC = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Error loading users: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {users?.map((user: any, index: number) => (
          <ListItem key={user.id || index} divider>
            <ListItemText
              primary={user.name || user.username || `User ${index + 1}`}
              secondary={user.email || user.id}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Demo;
