import { Link, useRouterState } from "@tanstack/react-router";
import {
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
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
import ConstructionIcon from "@mui/icons-material/Construction";

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
  const routerState = useRouterState();
  const currentPathname = routerState.location.pathname;

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography textAlign="center" variant="h5" noWrap>
          CrewFle
          <ConstructionIcon fontSize="medium" sx={{ mb: -0.5 }} />
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            selected={item.link === currentPathname}
            key={item.label}
            component={Link}
            to={item.link}
          >
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
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
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
