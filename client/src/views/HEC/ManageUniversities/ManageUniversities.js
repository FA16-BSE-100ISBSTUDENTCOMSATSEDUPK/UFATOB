import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getAllUniversities,
  deleteUniversity,
} from '../../../actions/university';
import Moment from 'react-moment';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const ManageUniversities = ({
  university: { loading, universities },
  getAllUniversities,
  deleteUniversity,
}) => {
  const classes = useStyles();

  const getUniversities = () => {
    let res = [];
    let sNo = 1;
    universities.forEach((university) => {
      res = [
        ...res,
        [
          sNo,
          university.name,
          university.email,
          <Moment format='DD-MMM-YYYY'>{university.date}</Moment>,
          <IconButton onClick={() => deleteUniversity(university._id)}>
            <Close />
          </IconButton>,
        ],
      ];
      sNo++;
    });
    return res;
  };

  useEffect(() => {
    getAllUniversities();
  }, [getAllUniversities]);

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Link to='/hec/create-university'>
            <Button color='primary' variant='contained'>
              <i className='fas fa-building' style={{ marginRight: '5px' }}></i>
              Add new university
            </Button>
          </Link>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Manage Universities</h4>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the registered universities
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor='primary'
                tableHead={['S.No.', 'Name', 'Email', 'Created at', 'Actions']}
                tableData={
                  !loading && universities.length > 0 ? getUniversities() : []
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

ManageUniversities.propTypes = {
  university: PropTypes.object.isRequired,
  getAllUniversities: PropTypes.func.isRequired,
  deleteUniversity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  university: state.university,
});

export default connect(mapStateToProps, {
  getAllUniversities,
  deleteUniversity,
})(ManageUniversities);
