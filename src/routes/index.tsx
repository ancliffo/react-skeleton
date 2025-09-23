import { createRootRoute, createRoute, Router } from "@tanstack/react-router";
import App from "./__root";
import Home from "../pages/home/Home";
import AboutUs from "../pages/about-us/AboutUs";
import Demo from "../pages/demo";
import DndPage from "../pages/dnd";
import TEPage from "../pages/te";
import TorPage from "../pages/tor";
import WimsPage from "../pages/wims";
import StaffPage from "../pages/staff";
import CSATPage from "../pages/csat";
import CSPage from "../pages/cs";

const rootRoute = createRootRoute({
  component: App, // Or: () => <App />
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about-us",
  component: AboutUs,
});

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: Demo,
});

const dndRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dnd",
  component: DndPage,
});

const teRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/te",
  component: TEPage,
});

const torRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tor",
  component: TorPage,
});

const wimsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wims",
  component: WimsPage,
});
const staffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/staff",
  component: StaffPage,
});

const csatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/csat",
  component: CSATPage,
});

const csRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cs",
  component: CSPage,
});

export const router = new Router({
  routeTree: rootRoute.addChildren([
    homeRoute,
    aboutRoute,
    demoRoute,
    dndRoute,
    teRoute,
    torRoute,
    wimsRoute,
    staffRoute,
    csatRoute,
    csRoute,
  ]),
});
