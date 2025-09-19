import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link, useRouterState } from "@tanstack/react-router";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const matches = useRouterState({ select: (s) => s.matches });

  const breadcrumbs = matches
    .map((match) => {
      const title = match.loaderData?.breadcrumb;
      if (!title) return null;
      return {
        title,
        path: match.pathname,
      };
    })
    .filter((crumb): crumb is { title: string; path: string } => crumb !== null);

  console.log("breadcrumbs", breadcrumbs);

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">MERIDIAN</Typography>
      {breadcrumbs.map((crumb, idx) => {
        if (!crumb) return null;
        const isLast = idx === breadcrumbs.length - 1;
        return isLast ? (
          <Typography
            key={crumb.path}
            variant="body1"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {crumb.title}
          </Typography>
        ) : (
          <Typography
            key={crumb.path}
            variant="body1"
            component={Link}
            to={crumb.path}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {crumb.title}
          </Typography>
        );
      })}
    </StyledBreadcrumbs>
  );
}
