import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { createRequest } from '../../../actions/request';
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

const CreateRequest = ({ createRequest, history }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    status: '1',
  });

  const { title, department, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createRequest(formData, history);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-user'></i> Fill in the following information to
        create a request
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              label='Title'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='department'
              value={department}
              onChange={(e) => onChange(e)}
              label='Department'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='description'
              value={description}
              onChange={(e) => onChange(e)}
              label='Description'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              multiline
              rows={5}
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

CreateRequest.propTypes = {
  createRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { createRequest })(withRouter(CreateRequest));
