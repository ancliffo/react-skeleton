import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useRouterState, Link } from "@tanstack/react-router";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, link: "/" },
  { text: "Demo", icon: <AnalyticsRoundedIcon />, link: "/demo" },
  { text: "Enterprise", icon: <PeopleRoundedIcon />, link: "/enterprise" },
  { text: "Data Visualizations", icon: <AssignmentRoundedIcon />, link: "/data-visualizations" },
  { text: "Data Explorer", icon: <AssignmentRoundedIcon />, link: "/data-explorer" },
];

const secondaryListItems = [
  { text: "Configuration", icon: <SettingsRoundedIcon />, link: "/configuration" },
  { text: "Reports", icon: <InfoRoundedIcon />, link: "/reports" },
  { text: "Admin", icon: <HelpRoundedIcon />, link: "/admin" },
  { text: "Notifications", icon: <InfoRoundedIcon />, link: "/notifications" },
  { text: "Self Assessment", icon: <InfoRoundedIcon />, link: "/self-assessment" },
  { text: "My TQS Progress", icon: <InfoRoundedIcon />, link: "/my-tqs-progress" },
];

export default function MenuContent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={pathname === item.link} component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
