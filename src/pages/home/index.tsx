import React from "react";
import { Typography, Box, Grid, Stack } from "@mui/material";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

const boxes = [
  {
    title: "T&E",
    description: "Create and Manage Test Events",
    icon: <EventNoteRoundedIcon fontSize="large" color="primary" />,
  },
  {
    title: "TOR/EMAF",
    description: "Discrepancy Reports",
    icon: <ReportProblemRoundedIcon fontSize="large" color="warning" />,
  },
  {
    title: "Staff Management",
    description: "Manage Staff",
    icon: <GroupRoundedIcon fontSize="large" color="info" />,
  },
  {
    title: "CS",
    description: "Cybersecurity Modules",
    icon: <SecurityRoundedIcon fontSize="large" color="success" />,
  },
  {
    title: "WIMS",
    description: "Warehouse Inventory Management System",
    icon: <Inventory2RoundedIcon fontSize="large" color="secondary" />,
  },
  {
    title: "CSAT",
    description: "Combat Systems Assessment Team",
    icon: <AssessmentRoundedIcon fontSize="large" color="error" />,
  },
];

const Home: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h1"
        fontSize={24}
        gutterBottom
        sx={{ textAlign: { xs: "center", lg: "left" } }}
      >
        Welcome to MERIDIAN!
      </Typography>
      <Grid
        container
        spacing={3}
        maxWidth="md"
        sx={{
          mx: { xs: "auto", lg: 0 }, // Center on small screens, normal on md+
          justifyContent: { xs: "center", lg: "flex-start" }, // Center items on small screens
        }}
      >
        {boxes.map((box) => (
          <Stack spacing={2} key={box.title}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "background.paper",
                minHeight: 180,
                height: 200, // Fixed height for all boxes
                width: 250,
                justifyContent: "center",
              }}
            >
              {box.icon}
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                {box.title}
              </Typography>
              <Typography height={25} variant="body2" color="text.secondary" align="center">
                {box.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
