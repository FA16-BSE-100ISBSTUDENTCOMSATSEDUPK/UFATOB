import React, { Fragment, useState } from 'react';
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
import { createProfile } from '../../../actions/profile';
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

const CreateProfile = ({ createProfile, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    bio: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  const {
    status,
    company,
    website,
    location,
    skills,
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
    createProfile(formData, history, 2);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create your profile
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl
              variant='outlined'
              className={classes.formControl}
              margin='dense'
            >
              <InputLabel id='status'>Status</InputLabel>
              <Select
                labelId='status'
                label='Status'
                name='status'
                value={status}
                onChange={(e) => onChange(e)}
              >
                <MenuItem value=''>
                  <em>Please select your professional status</em>
                </MenuItem>
                <MenuItem value='Developer'>Developer</MenuItem>
                <MenuItem value='Student'>Student</MenuItem>
                <MenuItem value='Instructor'>Instructor</MenuItem>
                <MenuItem value='Intern'>Intern</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='company'
              value={company}
              onChange={(e) => onChange(e)}
              label='Company'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
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
              name='skills'
              value={skills}
              onChange={(e) => onChange(e)}
              label='Skills'
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
