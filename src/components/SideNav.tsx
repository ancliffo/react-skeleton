// This is a side nav component that could be used for the internal pages
import { Link } from "@tanstack/react-router";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorScheme } from "../contexts/ColorSchemeContext";

const navItems = [
  { link: "/", label: "Home", icon: <HomeIcon /> },
  { link: "/about-us", label: "About Us", icon: <BusinessIcon /> },
  { link: "/demo", label: "Demo", icon: <PersonIcon /> },
  { link: "", label: "Analytics", icon: <BarChartIcon /> },
  { link: "", label: "Settings", icon: <SettingsIcon /> },
];

export function Nav(props: {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  drawerWidth: number;
}) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Logo Here
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item.label} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <SwitchAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Change account" />
        </ListItemButton>
        <ListItemButton onClick={toggleColorScheme}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
        <ListItem>
          <IconButton color="inherit" onClick={toggleColorScheme} title="Toggle color scheme">
            {colorScheme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
