import React from "react";
import Home from "../pages/Home";
import Shop from "../pages/Shop";

type RouteProps = {
  path: string;
  children: React.ReactNode;
  exact?: boolean;
}[];

const routes: RouteProps = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/shops",
    exact: true,
    children: <Shop />,
  },
];

export default routes;
