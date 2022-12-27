// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    profile: path(ROOTS_AUTH, '/profile'),
    packages: path(ROOTS_DASHBOARD, '/packages'),
    createPackage: path(ROOTS_DASHBOARD, '/packages/create'),
    editPackage: path(ROOTS_DASHBOARD, '/packages/edit/:id'),
    events: path(ROOTS_DASHBOARD, '/events'),
    viewEevent: path(ROOTS_DASHBOARD, '/events/view/:id'),
    orgaccount: path(ROOTS_DASHBOARD, '/orgaccount'),
  },
};
