import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../actions/profile';
import { withRouter } from 'react-router-dom';

const styles = {
  heading: {
    marginBottom: '16px',
  },
  input: {
    margin: '10px 0',
  },
  formControl: {
    width: '100%',
  },
};

const useStyles = makeStyles(styles);

const EditProfile = ({
  createProfile,
  history,
  profile: { loading, profile },
  getCurrentProfile,
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    website: '',
    location: '',
    contactNo: '',
    bio: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  const {
    website,
    location,
    contactNo,
    bio,
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, 1, true);
  };

  useEffect(() => {
    if (profile === null) getCurrentProfile();

    setFormData({
      website: !loading && profile.website ? profile.website : '',
      location: !loading && profile.location ? profile.location : '',
      bio: !loading && profile.bio ? profile.bio : '',
      contactNo: !loading && profile.contactNo ? profile.contactNo : '',
      facebook: !loading && profile.social ? profile.social.facebook : '',
      twitter: !loading && profile.social ? profile.social.twitter : '',
      linkedin: !loading && profile.social ? profile.social.linkedin : '',
      instagram: !loading && profile.social ? profile.social.instagram : '',
      youtube: !loading && profile.social ? profile.social.youtube : '',
    });

    // eslint-disable-next-line
  }, [loading, getCurrentProfile]);

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create your profile
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='website'
              value={website}
              onChange={(e) => onChange(e)}
              label='Website'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='location'
              value={location}
              onChange={(e) => onChange(e)}
              label='Location'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='contactNo'
              value={contactNo}
              onChange={(e) => onChange(e)}
              label='Contact no'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='bio'
              value={bio}
              onChange={(e) => onChange(e)}
              label='Bio'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='facebook'
              value={facebook}
              onChange={(e) => onChange(e)}
              label='Facebook'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='youtube'
              value={youtube}
              onChange={(e) => onChange(e)}
              label='Youtube'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='twitter'
              value={twitter}
              onChange={(e) => onChange(e)}
              label='Twitter'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='instagram'
              value={instagram}
              onChange={(e) => onChange(e)}
              label='Instagram'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='linkedin'
              value={linkedin}
              onChange={(e) => onChange(e)}
              label='Linkedin'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              color='primary'
              variant='contained'
              fullWidth={true}
              type='submit'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
