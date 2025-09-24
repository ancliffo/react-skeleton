import React from "react";
import { Typography, Box, Grid, Stack } from "@mui/material";
import PageTitle from "../../components/common/PageTitle";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import { Link } from "@tanstack/react-router";

const Home: React.FC = () => {
  const boxes = [
    {
      title: "T&E",
      description: "Create and Manage Test Events",
      icon: <EventNoteRoundedIcon fontSize="large" color="primary" />,
      link: "/te",
    },
    {
      title: "TOR/EMAF",
      description: "Discrepancy Reports",
      icon: <ReportProblemRoundedIcon fontSize="large" color="warning" />,
      link: "/tor",
    },
    {
      title: "Staff Management",
      description: "Manage Staff",
      icon: <GroupRoundedIcon fontSize="large" color="info" />,
      link: "/staff",
    },
    {
      title: "CS",
      description: "Cybersecurity Modules",
      icon: <SecurityRoundedIcon fontSize="large" color="success" />,
      link: "/cs",
    },
    {
      title: "WIMS",
      description: "Warehouse Inventory Management System",
      icon: <Inventory2RoundedIcon fontSize="large" color="secondary" />,
      link: "/wims",
    },
    {
      title: "CSAT",
      description: "Combat Systems Assessment Team",
      icon: <AssessmentRoundedIcon fontSize="large" color="error" />,
      link: "/csat",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PageTitle title="Welcome to MERIDIAN!" />
      <Grid
        container
        spacing={3}
        maxWidth="md"
        sx={{
          mx: "auto",
          justifyContent: "center",
        }}
      >
        {boxes.map((box) => (
          <Stack spacing={2} key={box.title}>
            <Box
              sx={{
                color: "text.primary",
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
                textDecoration: "none",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "action.hover",
                },
              }}
              component={Link}
              href={box.link}
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
