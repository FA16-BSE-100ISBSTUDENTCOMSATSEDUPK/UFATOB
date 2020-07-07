import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../../components/Grid/GridItem.js';
import GridContainer from '../../../components/Grid/GridContainer.js';
import Table from '../../../components/Table/Table.js';
import Card from '../../../components/Card/Card.js';
import CardHeader from '../../../components/Card/CardHeader.js';
import CardBody from '../../../components/Card/CardBody.js';
import { Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllBlockchains, fixBlockchain } from '../../../actions/blockchain';
import { Link } from 'react-router-dom';

import styles from '../../../assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const Blockchain = ({
  blockchain: { loading, blockchains },
  getAllBlockchains,
  fixBlockchain,
}) => {
  const classes = useStyles();

  const getStatus = (status) => {
    if (status) {
      return 'Valid';
    } else {
      return 'Invalid';
    }
  };

  const getBlockchains = () => {
    let res = [];
    let sNo = 1;
    blockchains.forEach((blockchain) => {
      res = [
        ...res,
        [
          sNo,
          blockchain.currentNodeUrl.name,
          blockchain.currentNodeUrl.email,
          getStatus(blockchain.validChain),
          <Fragment>
            <Link to={`/hec/blockchain/${blockchain.currentNodeUrl.id}`}>
              <Button color='primary' variant='contained'>
                View
              </Button>
            </Link>
            {!blockchain.validChain ? (
              <Button
                color='primary'
                variant='contained'
                style={{ backgroundColor: 'green', marginLeft: '5px' }}
                onClick={() => fixBlockchain(blockchain.currentNodeUrl.id)}
              >
                Fix
              </Button>
            ) : (
              ''
            )}
          </Fragment>,
        ],
      ];
      sNo++;
    });
    return res;
  };

  useEffect(() => {
    getAllBlockchains();
  }, [getAllBlockchains]);

  return (
    <Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Blockchains</h4>
              <p className={classes.cardCategoryWhite}>
                Below is a list of all the network nodes and their chain status
              </p>
            </CardHeader>
            {loading ? (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <Fragment>
                <CardBody>
                  <Table
                    tableHeaderColor='primary'
                    tableHead={[
                      'S.No.',
                      'Name',
                      'Email',
                      'Chain status',
                      'Actions',
                    ]}
                    tableData={
                      !loading && blockchains.length > 0 ? getBlockchains() : []
                    }
                  />
                </CardBody>
              </Fragment>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </Fragment>
  );
};

Blockchain.propTypes = {
  blockchain: PropTypes.object.isRequired,
  getAllBlockchains: PropTypes.func.isRequired,
  fixBlockchain: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blockchain: state.blockchain,
});

export default connect(mapStateToProps, { getAllBlockchains, fixBlockchain })(
  Blockchain
);
