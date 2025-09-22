import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import { PageBreadCrumbLink } from '../customTypes/uiElement/PageBreadCrumbLinkTypes';
import { PageBreadcrumbProps } from '../customTypes/uiElement/PageBreadCrumbLinkTypes';
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function PageBreadcrumbs<T>({links} : PageBreadcrumbProps<T>) {
  return (
    <Box
    sx={{
      // display: '-ms-flexbox;
      // display: flex;
      // -ms-flex-wrap: wrap;
      // flex-wrap: wrap;
      padding: '.75rem 1rem',
      // margin-bottom: 1rem;
      // list-style: none;
      backgroundColor: '#e9ecef',
      borderRadius: '.25rem'
    }}>
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map(link => (
          <Link underline="hover" color="inherit" href={link.href}>
            {link.displayText}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
    </Box>
  );
}