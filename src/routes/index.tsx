
import { createRootRoute, createRoute, Router } from '@tanstack/react-router';
import App from './__root';
import Home from '../pages/home/Home';
import AboutUs from '../pages/about-us/AboutUs';
import Demo from '../pages/demo';

const rootRoute = createRootRoute({
  component: App, // Or: () => <App />
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about-us',
  component: AboutUs,
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/demo',
  component: Demo,
});

export const router = new Router({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute, demoRoute]),
});
