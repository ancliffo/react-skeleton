
import { RootRoute, Route, Router } from '@tanstack/react-router';
import App from '../App';
import Home from '../pages/home/Home';
import AboutUs from '../pages/about-us/AboutUs';
import Demo from '../pages/demo';

const rootRoute = new RootRoute({
  component: App,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about-us',
  component: AboutUs,
});

const demoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/demo',
  component: Demo,
});

export const router = new Router({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute, demoRoute]),
});
