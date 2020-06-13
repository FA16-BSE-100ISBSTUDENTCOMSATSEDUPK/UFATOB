import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Table from 'components/Table/Table.js';
import { connect } from 'react-redux';
import {
  getUniversityRequests,
  forwardRequest,
} from '../../../actions/request';
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

const RequestTabs = ({
  request: { requests, loading },
  getUniversityRequests,
  forwardRequest,
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

  const getQueuedRequests = () => {
    let res = [];
    let sNo = 1;
    requests.forEach((request) => {
      if (request.status === 0) {
        res = [
          ...res,
          [
            sNo,
            request.title,
            <Fragment>
              <Link to={`/university/request/${request._id}`}>
                <Button color='primary' variant='contained'>
                  Open
                </Button>
              </Link>
              <Button
                color='primary'
                variant='contained'
                onClick={() => forwardRequest(request._id)}
                style={{ backgroundColor: 'green', marginLeft: '5px' }}
              >
                Forward
              </Button>
            </Fragment>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  const getForwardedRequests = () => {
    let res = [];
    let sNo = 1;
    requests.forEach((request) => {
      if (request.status === 1) {
        res = [
          ...res,
          [
            sNo,
            request.title,
            <Link to={`/university/request/${request._id}`}>
              <Button color='primary' variant='contained'>
                Open
              </Button>
              ,
            </Link>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  const getAcceptedRequests = () => {
    let res = [];
    let sNo = 1;
    requests.forEach((request) => {
      if (request.status === 2) {
        res = [
          ...res,
          [
            sNo,
            request.title,
            <Link to={`/university/request/${request._id}`}>
              <Button color='primary' variant='contained'>
                Open
              </Button>
              ,
            </Link>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  const getRejectedRequests = () => {
    let res = [];
    let sNo = 1;
    requests.forEach((request) => {
      if (request.status === 3) {
        res = [
          ...res,
          [
            sNo,
            request.title,
            <Link to={`/university/request/${request._id}`}>
              <Button color='primary' variant='contained'>
                Open
              </Button>
              ,
            </Link>,
          ],
        ];
      }
      sNo++;
    });
    return res;
  };

  useEffect(() => {
    getUniversityRequests();
  }, [getUniversityRequests]);

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            <Tab label='Queue' {...a11yProps(0)} />
            <Tab label='Forwarded' {...a11yProps(1)} />
            <Tab label='Accepted' {...a11yProps(2)} />
            <Tab label='Rejected' {...a11yProps(3)} />
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
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && requests.length > 0 ? getQueuedRequests() : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && requests.length > 0 ? getForwardedRequests() : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && requests.length > 0 ? getAcceptedRequests() : []
              }
            />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Table
              tableHeaderColor='primary'
              tableHead={['S.No.', 'Title', 'Actions']}
              tableData={
                !loading && requests.length > 0 ? getRejectedRequests() : []
              }
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Fragment>
  );
};

RequestTabs.propTypes = {
  request: PropTypes.object.isRequired,
  getUniversityRequests: PropTypes.func.isRequired,
  forwardRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, {
  getUniversityRequests,
  forwardRequest,
})(RequestTabs);
