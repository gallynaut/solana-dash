/* eslint-disable react/display-name */
import { Suspense, lazy } from 'react';
import type { PartialRouteObject } from 'react-router';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';
import Connect from './pages/authentication/Connect';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Dashboard pages

const Calendar = Loadable(lazy(() => import('./pages/Calendar')));
const Contact = Loadable(lazy(() => import('./pages/Contact')));
const Network = Loadable(lazy(() => import('./pages/Network')));
const Overview = Loadable(lazy(() => import('./pages/Overview')));
const News = Loadable(lazy(() => import('./pages/News')));

// Beginner pages

const BeginnerWhat = Loadable(lazy(() => import('./pages/beginners/BeginnerWhat')));

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
        path: 'connect',
        element: <Connect />
      },
      {
        path: 'beginners',
        children: [
          {
            path: 'what',
            element: <BeginnerWhat />,
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
        element: (
          <AuthGuard>
            <Overview />
          </AuthGuard>
        ),
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
        element: (<AuthGuard><Calendar /></AuthGuard>),
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
        path: '/contact',
        element: <Contact />
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
