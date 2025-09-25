import React from "react";
import { Box, Typography } from "@mui/material";
import TableCrud from "./TableCrud";

const Demo: React.FC = () => {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <TableCrud />
    </Box>
  );
};

export default Demo;
