/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
// import { Account } from "@solana/web3.js";
import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import LoadingScreen from "./components/LoadingScreen";
import Connect from "./pages/authentication/Connect";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Dashboard pages

const Home = Loadable(lazy(() => import("./pages/Home")));
const Calendar = Loadable(lazy(() => import("./pages/Calendar")));
const Contact = Loadable(lazy(() => import("./pages/Contact")));
const Network = Loadable(lazy(() => import("./pages/Network")));
const Account = Loadable(lazy(() => import("./pages/Account")));
const News = Loadable(lazy(() => import("./pages/News")));
const Test = Loadable(lazy(() => import("./pages/Test")));

// Beginner pages

const BeginnerWhat = Loadable(
  lazy(() => import("./pages/beginners/BeginnerWhat"))
);

// Error pages

const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const ServerError = Loadable(lazy(() => import("./pages/ServerError")));

const routes: PartialRouteObject[] = [
  {
    path: "*",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "connect",
        element: <Connect />,
      },
      {
        path: "beginners",
        children: [
          {
            path: "what",
            element: <BeginnerWhat />,
          },
          {
            path: "how",
            element: <Home />,
          },
          {
            path: "create",
            element: <Home />,
          },
          {
            path: "connect",
            element: <Home />,
          },
          {
            path: "receive",
            element: <Home />,
          },
          {
            path: "security",
            element: <Home />,
          },
        ],
      },
      {
        path: "advanced",
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/what",
            element: <Home />,
          },
        ],
      },
      {
        path: "account",
        element: (
          <AuthGuard>
            <Account />
          </AuthGuard>
        ),
      },
      {
        path: "network",
        element: <Network />,
      },
      {
        path: "tokens",
        element: <Home />,
      },
      {
        path: "staking",
        element: <Home />,
      },
      {
        path: "farming",
        element: <Home />,
      },
      {
        path: "/calendar",
        element: (
          <AuthGuard>
            <Calendar />
          </AuthGuard>
        ),
      },
      {
        path: "/projects",
        element: <Home />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "401",
        element: <NotFound />,
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "500",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
