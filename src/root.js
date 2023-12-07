import { Router, Route, RootRoute } from "@tanstack/react-router";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ListingsPage from "./pages/Listings";
import ListingPage from "./pages/Listing";
import CreatePage from "./pages/Create";
import ProfilePage from "./pages/Profile";
import Root from "./App";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const ListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listing/$itemid",
  component: ListingPage,
});

const ListingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listings",
  component: ListingsPage,
});

const CreateRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: CreatePage,
});

const ProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  ListingsRoute,
  ListingRoute,
  registerRoute,
  CreateRoute,
  ProfileRoute,
]);

export const router = new Router({ routeTree });

export default router;
