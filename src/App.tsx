import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { Nav } from "./assets/components/Nav";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorSchemeProvider, useColorScheme } from "./assets/contexts/ColorSchemeContext";

export default function App() {
  return (
    <ColorSchemeProvider>
      <AppWithTheme />
    </ColorSchemeProvider>
  );
}

function AppWithTheme() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;
  const { colorScheme } = useColorScheme();
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
            <Typography variant="h6" noWrap>
              v3.1.2
            </Typography>
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
