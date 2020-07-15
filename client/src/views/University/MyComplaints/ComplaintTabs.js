import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import Table from '../../../components/Table/Table.js';
import { connect } from 'react-redux';
import { getUserComplaints } from '../../../actions/complaint';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Fragment>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    </Fragment>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ComplaintTabs = ({
  complaint: { complaints, loading },
  getUserComplaints,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [description, setDescription] = useState('');

  const getComplaintStatus = (status) => {
    switch (status) {
      case 0:
        return 'Forwarded to University';
      case 1:
        return 'Forwarded to HEC';
      default:
        return '';
    }
  };

  const getPendingComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status < 2) {
        if (
          description === '' ||
          new RegExp(description, 'i').test(complaint.title)
        ) {
          res = [
            ...res,
            [
              sNo,
              complaint.title,
              getComplaintStatus(complaint.status),
              <Link to={`/university/complaint/${complaint._id}`}>
                <Button color='primary' variant='contained'>
                  Open
                </Button>
                ,
              </Link>,
            ],
          ];
          sNo++;
        }
      }
    });
    return res;
  };

  const getConsideredComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status === 2) {
        if (
          description === '' ||
          new RegExp(description, 'i').test(complaint.title)
        ) {
          res = [
            ...res,
            [
              sNo,
              complaint.title,
              <Link to={`/university/complaint/${complaint._id}`}>
                <Button color='primary' variant='contained'>
                  Open
                </Button>
                ,
              </Link>,
            ],
          ];
          sNo++;
        }
      }
    });
    return res;
  };

  const getNotConsideredComplaints = () => {
    let res = [];
    let sNo = 1;
    complaints.forEach((complaint) => {
      if (complaint.status === 3) {
        if (
          description === '' ||
          new RegExp(description, 'i').test(complaint.title)
        ) {
          res = [
            ...res,
            [
              sNo,
              complaint.title,
              <Link to={`/university/complaint/${complaint._id}`}>
                <Button color='primary' variant='contained'>
                  Open
                </Button>
                ,
              </Link>,
            ],
          ];
          sNo++;
        }
      }
    });
    return res;
  };

  useEffect(() => {
    getUserComplaints();
  }, [getUserComplaints]);

  return (
    <Fragment>
      <div className={classes.root}>
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              marginTop: '20px',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Fragment>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label='Search'
              variant='outlined'
              fullWidth={true}
              className={classes.input}
              margin='dense'
              style={{ marginBottom: '20px' }}
            />
            <AppBar position='static' color='default'>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                aria-label='full width tabs example'
              >
                <Tab label='Pending' {...a11yProps(0)} />
                <Tab label='Considered' {...a11yProps(1)} />
                <Tab label='Not considered' {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Table
                  tableHeaderColor='primary'
                  tableHead={['S.No.', 'Title', 'Status', 'Actions']}
                  tableData={
                    !loading && complaints.length > 0
                      ? getPendingComplaints()
                      : []
                  }
                />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Table
                  tableHeaderColor='primary'
                  tableHead={['S.No.', 'Title', 'Actions']}
                  tableData={
                    !loading && complaints.length > 0
                      ? getConsideredComplaints()
                      : []
                  }
                />
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Table
                  tableHeaderColor='primary'
                  tableHead={['S.No.', 'Title', 'Actions']}
                  tableData={
                    !loading && complaints.length > 0
                      ? getNotConsideredComplaints()
                      : []
                  }
                />
              </TabPanel>
            </SwipeableViews>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

ComplaintTabs.propTypes = {
  complaint: PropTypes.object.isRequired,
  getUserComplaints: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  complaint: state.complaint,
});

export default connect(mapStateToProps, { getUserComplaints })(ComplaintTabs);
