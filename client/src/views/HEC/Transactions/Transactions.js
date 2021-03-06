import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import TransactionTabs from './TransactionTabs';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { verfiyAllTransactions } from '../../../actions/blockchain';

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

const Transactions = ({ verfiyAllTransactions }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Link to='/hec/create-transaction'>
            <Button color='primary' variant='contained'>
              Create new transaction
            </Button>
          </Link>
          <Button
            color='primary'
            variant='contained'
            style={{ backgroundColor: 'green', marginLeft: '5px' }}
            onClick={() => verfiyAllTransactions()}
          >
            Verify all transactions
          </Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Transactions</h4>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the pending and verified transactions
              </p>
            </CardHeader>
            <CardBody>
              <TransactionTabs />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

Transactions.propTypes = {
  verfiyAllTransactions: PropTypes.func.isRequired,
};

export default connect(null, { verfiyAllTransactions })(Transactions);
