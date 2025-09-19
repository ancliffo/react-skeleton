import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import App from "../App";
import Home from "../pages/home";
import AboutUs from "../pages/about-us/AboutUs";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  loader: () => ({
    breadcrumb: "Dashaboard",
  }),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: AboutUs,
  loader: () => ({
    breadcrumb: "About Us",
  }),
});

export const router = new Router({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute]),
});
