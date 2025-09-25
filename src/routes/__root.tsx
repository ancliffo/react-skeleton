// This is the root layout component for TanStack Router
import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorSchemeProvider } from "../contexts/ColorSchemeProvider";
import { useColorScheme } from "../hooks/useColorScheme";

function AppWithTheme() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const theme = createTheme({
    palette: {
      mode: colorScheme || "light",
    },
  });
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "min-content 1fr",
          minHeight: "100vh",
          alignItems: "start",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              v1.0.0
            </Typography>
            <Box>
              <TextField
                sx={() => ({
                  marginRight: 2,
                  backgroundColor: colorScheme === "dark" ? "#424242" : "#fff",
                })}
                size="small"
                label="Search"
                variant="outlined"
              />
              <IconButton color="inherit" onClick={toggleColorScheme} title="Toggle color scheme">
                {colorScheme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Nav
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          drawerWidth={drawerWidth}
        />
        <Box component="main" sx={{ p: 2, marginLeft: { sm: `${drawerWidth}px` } }}>
          <Toolbar /> {/* Spacer for AppBar */}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ColorSchemeProvider>
      <AppWithTheme />
    </ColorSchemeProvider>
  );
}
