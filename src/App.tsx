import { Outlet } from "@tanstack/react-router";
import { alpha } from "@mui/material/styles";
import SideMenu from "./components/SideMenu";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import Search from "./components/Search";
import { CssBaseline, Toolbar, Stack, Box } from "@mui/material";
import AppTheme from "./assets/theme/AppTheme";
import ColorModeIconDropdown from "./assets/theme/ColorModeIconDropdown";

export default function App() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Toolbar
              sx={(theme) => ({
                background: theme.vars
                  ? theme.vars.palette.background.paper
                  : theme.palette.background.paper,
                boxShadow: "0px 2px 8px -2px rgba(0,0,0,0.15)", // Bottom shadow
                minHeight: 56,
              })}
            >
              <Stack
                direction="row"
                sx={{ gap: 2, width: "100%" }}
                alignItems="center"
                justifyContent={"space-between"}
              >
                <Search />
                {/* Color mode icon at end */}
                <ColorModeIconDropdown />
              </Stack>
            </Toolbar>
            <Box sx={{ px: 4 }}>
              <Header />
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
