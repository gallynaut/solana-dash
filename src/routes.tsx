import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
// import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Dashboard pages

const Calendar = Loadable(lazy(() => import('./pages/dashboard/Calendar')));
const Network = Loadable(lazy(() => import('./pages/dashboard/Network')));
const Overview = Loadable(lazy(() => import('./pages/dashboard/Overview')));
const News = Loadable(lazy(() => import('./pages/dashboard/News')));

// Error pages

const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: (
      <DashboardLayout />
    ),
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'beginners',
        children: [
          {
            path: 'what',
            element: <Overview />,
          },
          {
            path: 'how',
            element: <Overview />,
          },
          {
            path: 'create',
            element: <Overview />,
          },
          {
            path: 'connect',
            element: <Overview />,
          },
          {
            path: 'receive',
            element: <Overview />,
          },
          {
            path: 'security',
            element: <Overview />,
          },
        ]
      },
      {
        path: 'advanced',
        children: [
          {
            path: '/',
            element: <Overview />,
          },
          {
            path: '/what',
            element: <Overview />,
          },
        ]
      },
      {
        path: 'account',
        element: <Overview />
      },
      {
        path: 'network',
        element: <Network />
      },
      {
        path: 'tokens',
        element: <Overview />
      },
      {
        path: 'staking',
        element: <Overview />
      },
      {
        path: 'farming',
        element: <Overview />
      },
      {
        path: '/calendar',
        element: <Calendar />
      },
      {
        path: '/projects',
        element: <Overview />
      },
      {
        path: '/news',
        element: <News />
      },
      {
        path: '401',
        element: <NotFound />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '500',
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
];

export default routes;
