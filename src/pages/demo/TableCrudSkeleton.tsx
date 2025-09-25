import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

export function TableCrudSkeleton() {
  // Create array for skeleton rows
  const skeletonRows = Array.from({ length: 8 }, (_, index) => index);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Toolbar skeleton */}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <Toolbar>
          <Typography component="div" variant="h6" sx={{ flex: "1 1 100%" }}>
            <Skeleton width={200} />
          </Typography>
          <Skeleton variant="rectangular" width={150} height={36} />
        </Toolbar>
      </Paper>

      {/* Table skeleton */}
      <TableContainer component={Paper} sx={{ minHeight: "500px" }}>
        <Table sx={{ minWidth: 750 }} aria-label="loading table">
          <TableHead>
            <TableRow>
              {/* Column headers skeleton - matches your 6 columns */}
              <TableCell>
                <Skeleton width={50} />
              </TableCell>{" "}
              {/* ID */}
              <TableCell>
                <Skeleton width={100} />
              </TableCell>{" "}
              {/* First Name */}
              <TableCell>
                <Skeleton width={100} />
              </TableCell>{" "}
              {/* Last Name */}
              <TableCell>
                <Skeleton width={120} />
              </TableCell>{" "}
              {/* Email */}
              <TableCell>
                <Skeleton width={80} />
              </TableCell>{" "}
              {/* State */}
              <TableCell>
                <Skeleton width={100} />
              </TableCell>{" "}
              {/* Position */}
              <TableCell>
                <Skeleton width={80} />
              </TableCell>{" "}
              {/* Actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {skeletonRows.map((row) => (
              <TableRow key={row}>
                <TableCell>
                  <Skeleton width={40} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell>
                  <Skeleton width={160} />
                </TableCell>
                <TableCell>
                  <Skeleton width={60} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="circular" width={24} height={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
