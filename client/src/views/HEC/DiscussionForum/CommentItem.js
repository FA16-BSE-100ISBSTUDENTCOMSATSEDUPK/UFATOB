import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/post';
import { Button, Typography, Grid, TextField } from '@material-ui/core';

const CommentItem = ({ comment, auth, deleteComment, post }) => {
  return (
    <Fragment>
      <Grid
        container
        style={{
          backgroundColor: '#e6e6e6',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '10px',
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link
            to={`/profile/${comment.user._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={comment.user.avatar}
              alt=''
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              {comment.user.name}
            </div>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginBottom: '5px' }}>{comment.description}</div>
          <div>
            {auth.user._id === comment.user._id && (
              <Button
                color='primary'
                variant='contained'
                onClick={() => deleteComment(post._id, comment._id)}
                style={{ backgroundColor: 'red' }}
              >
                Delete
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
      {/* <Row className={styles.list_item}>
        <Col xs={12} md={3}>
          <Link to={`/profile/${comment.user._id}`}>
            <img src={comment.user.avatar} alt='' className='round-img' />
            <div className={styles.user_name}>{comment.user.name}</div>
          </Link>
        </Col>
        <Col xs={12} md={9}>
          <p>{comment.description}</p>
          <div className='my-1'>
            {auth.user !== null &&
              (auth.user._id === comment.user._id ||
                auth.user._id === post.group.admin) && (
                <button
                  className='btn btn-danger'
                  onClick={() => deleteComment(post._id, comment._id)}
                >
                  Delete comment
                </button>
              )}
          </div>
        </Col>
      </Row> */}
    </Fragment>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default connect(null, {
  deleteComment,
})(CommentItem);
