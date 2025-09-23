import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorSchemeProvider, useColorScheme } from "../contexts/ColorSchemeContext";

const drawerWidth = 240;
const navItems = [
  { link: "/", label: "Home" },
  { link: "/about-us", label: "About Us" },
  { link: "/demo", label: "Demo" },
  { link: "/dnd", label: "DnD" },
];

export default function App() {
  return (
    <ColorSchemeProvider>
      <AppWithTheme />
    </ColorSchemeProvider>
  );
}

function AppWithTheme() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const theme = createTheme({
    palette: {
      mode: colorScheme || "light",
    },
  });
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MERIDAN
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} component={Link} to={item.link}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MERIDIAN
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.label} sx={{ color: "#fff" }} component={Link} to={item.link}>
                  {item.label}
                </Button>
              ))}
              <IconButton color="inherit" onClick={toggleColorScheme} title="Toggle color scheme">
                {colorScheme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={document.body}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
