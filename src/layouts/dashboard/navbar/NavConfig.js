// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  cart: getIcon('ic_cart'),
  ecommerce: getIcon('ic_ecommerce'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Packages',
        path: PATH_DASHBOARD.general.packages,
        icon: ICONS.cart,
      },
      { title: 'My Events', path: PATH_DASHBOARD.general.events, icon: ICONS.booking },
      { title: 'New Package', path: PATH_DASHBOARD.general.createPackage, icon: ICONS.ecommerce },
      { title: 'Organizer Account', path: PATH_DASHBOARD.general.orgaccount, icon: ICONS.ecommerce },
    ],
  },
];

export default navConfig;
