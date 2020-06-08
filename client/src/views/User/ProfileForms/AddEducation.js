import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Grid,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { addEducation } from '../../../actions/profile';
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

const AddEducation = ({ addEducation, history }) => {
  const classes = useStyles();

  const getCurrentDate = () => {
    let d = new Date(Date.now());
    d = new Date(Date.now() + d.getTimezoneOffset() * 60000);

    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  };

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    description: '',
    from: getCurrentDate(),
    current: false,
    to: getCurrentDate(),
  });

  const {
    school,
    degree,
    fieldOfStudy,
    description,
    from,
    current,
    to,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.heading}>
        <i className='fas fa-book'></i> Fill in the following information to add
        an education
      </Typography>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='school'
              value={school}
              onChange={(e) => onChange(e)}
              label='School'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='degree'
              value={degree}
              onChange={(e) => onChange(e)}
              label='Degree'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='fieldOfStudy'
              value={fieldOfStudy}
              onChange={(e) => onChange(e)}
              label='Field of study'
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
            <TextField
              name='from'
              value={from}
              onChange={(e) => onChange(e)}
              label='From'
              type='date'
              defaultValue={getCurrentDate()}
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={current}
                    onChange={(e) =>
                      setFormData({ ...formData, current: !current })
                    }
                  />
                }
                label='Current'
                labelPlacement='end'
                style={{ color: 'black' }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              name='to'
              value={to}
              onChange={(e) => onChange(e)}
              label='To'
              type='date'
              defaultValue={getCurrentDate()}
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              disabled={current}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
