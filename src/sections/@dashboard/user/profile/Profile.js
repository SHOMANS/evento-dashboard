import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Button } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import ProfileAbout from './ProfileAbout';

import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
};

export default function Profile({ myProfile }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <ProfileAbout profile={myProfile} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ProfileSocialInfo profile={myProfile} />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" component={RouterLink} to={PATH_DASHBOARD.general.createPackage}>
          New Package
        </Button>
      </Grid>
    </Grid>
  );
}
