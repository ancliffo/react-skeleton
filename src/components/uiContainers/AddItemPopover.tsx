import React, { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import type { AddItemPopoverProps } from "../../types/customTypes";

// This component allows the use of a single "add" icon which when hovered,
// provides multiple supplied buttons via "children" for use in
// adding different items to a parent container.
export function AddItemPopover<T>({ children }: AddItemPopoverProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const addIconRef = useRef<HTMLDivElement>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAnchorEl(null);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (addIconRef.current && !addIconRef.current.contains(event.target as Node)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        ref={addIconRef}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        <AddIcon />
      </Typography>
      <Popover
        id="mouse-over-popover"
        // sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </div>
  );
}
