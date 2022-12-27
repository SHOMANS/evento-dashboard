import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// guards
import GuestGuard from '../guards/GuestGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH } from './paths';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from '../layouts/dashboard';
import { PATH_AFTER_LOGIN } from '../config';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    { element: <Navigate to={PATH_AUTH.login} replace />, index: true },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'packages', element: <Packages /> },
        { path: 'profile', element: <UserProfile /> },
        { path: 'events', element: <Events /> },
        { path: 'orgaccount', element: <OrgAccount /> },
        // { path: 'booking', element: <GeneralBooking /> },
      ],
    },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const Packages = Loadable(lazy(() => import('../pages/dashboard/Packages')));
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const Events = Loadable(lazy(() => import('../pages/dashboard/Events')));
const OrgAccount = Loadable(lazy(() => import('../pages/dashboard/OrgAccount')));
