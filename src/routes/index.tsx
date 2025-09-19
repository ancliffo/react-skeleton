import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import App from "../App";
import Home from "../pages/home";
import Demo from "../pages/demo";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  loader: () => ({
    breadcrumb: "Home",
  }),
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: Demo,
  loader: () => ({
    breadcrumb: "Demo",
  }),
});

export const router = new Router({
  routeTree: rootRoute.addChildren([homeRoute, demoRoute]),
});
