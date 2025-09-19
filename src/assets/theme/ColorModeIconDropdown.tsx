import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { IconButtonOwnProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";

export default function ColorModeIconDropdown(props: IconButtonOwnProps) {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <IconButton aria-label="toggle color mode" color="inherit" onClick={handleClick} {...props}>
        {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setMode("light");
            handleClose();
          }}
        >
          Light
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMode("dark");
            handleClose();
          }}
        >
          Dark
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMode("system");
            handleClose();
          }}
        >
          System
        </MenuItem>
      </Menu>
    </Box>
  );
}
