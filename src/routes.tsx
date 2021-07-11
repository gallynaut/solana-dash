/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
// import { Account } from "@solana/web3.js";
import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
import AuthGuard from "./components/general/AuthGuard";
import DashboardLayout from "./components/general/DashboardLayout";
import LoadingScreen from "./components/general/LoadingScreen";
import Connect from "./pages/Connect";

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Dashboard pages

const Home = Loadable(lazy(() => import("./pages/Home")));
const Contact = Loadable(lazy(() => import("./pages/Contact")));
const Network = Loadable(lazy(() => import("./pages/Network")));
const Account = Loadable(lazy(() => import("./pages/Account")));
const Tokens = Loadable(lazy(() => import("./pages/Tokens")));
const News = Loadable(lazy(() => import("./pages/News")));
const Test = Loadable(lazy(() => import("./pages/Test")));

// Beginner pages
const BeginnerFrame = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerFrame"))
);
const BeginnerWhat = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerWhat"))
);
const BeginnerHow = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerHow"))
);
const BeginnerCreate = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerCreate"))
);
const BeginnerConnect = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerConnect"))
);
const BeginnerReceive = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerReceive"))
);
const BeginnerSecurity = Loadable(
  lazy(() => import("./pages/informational/beginners/BeginnerSecurity"))
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
        element: <BeginnerFrame />,
        children: [
          {
            path: "what",
            element: <BeginnerWhat />,
          },
          {
            path: "how",
            element: <BeginnerHow />,
          },
          {
            path: "create",
            element: <BeginnerCreate />,
          },
          {
            path: "connect",
            element: <BeginnerConnect />,
          },
          {
            path: "receive",
            element: <BeginnerReceive />,
          },
          {
            path: "security",
            element: <BeginnerSecurity />,
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
        element: <Tokens />,
      },
      {
        path: "staking",
        element: <Home />,
      },
      {
        path: "farming",
        element: <Home />,
      },
      // {
      //   path: "/calendar",
      //   element: (
      //     <AuthGuard>
      //       <Calendar />
      //     </AuthGuard>
      //   ),
      // },
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
