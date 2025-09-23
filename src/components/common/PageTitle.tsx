import React from "react";
import { Typography } from "@mui/material";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography
      variant="h1"
      fontSize={24}
      gutterBottom
      sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
