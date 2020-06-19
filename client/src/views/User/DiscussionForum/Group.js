import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getGroupById } from '../../../actions/group';
import { createNewPost, getAllPosts } from '../../../actions/post';
import PropTypes from 'prop-types';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import PostItem from './PostItem';

const Group = ({
  getGroupById,
  match,
  group: { loading, group },
  auth,
  post,
  createNewPost,
  getAllPosts,
}) => {
  const [formData, setFormData] = useState({
    description: '',
  });

  const { description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createNewPost(group._id, formData);
    setFormData({ description: '' });
  };

  useEffect(() => {
    getGroupById(match.params.id);
    getAllPosts(match.params.id);
  }, [getGroupById, match.params.id]);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant='h5' style={{ marginBottom: '10px' }}>
            <i className='fas fa-user'></i>{' '}
            {!loading && group !== null ? group.name : ''}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div>{!loading && group !== null ? group.description : ''}</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <form onSubmit={(e) => onSubmit(e)}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  name='description'
                  value={description}
                  onChange={(e) => onChange(e)}
                  label='Post description'
                  variant='outlined'
                  fullWidth={true}
                  margin='dense'
                  multiline
                  rows={5}
                  style={{ marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  style={{ marginBottom: '10px' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {!post.loading && post.posts.length > 0 ? (
            post.posts.map((post) => (
              <div key={post._id}>
                <PostItem post={post} auth={auth} />
              </div>
            ))
          ) : (
            <Typography variant='h6' style={{ marginBottom: '10px' }}>
              No posts found
            </Typography>
          )}
        </Grid>
      </Grid>
      {/* <section className={styles.section}>
        <SideNav styles={styles} />

        <div
          className={`${styles.content} ${
            !auth.displaySideNav ? styles.side_nav_hidden : ''
          }`}
        >
          <Alert />
          <div className={styles.heading}>
            {!loading && group !== null ? group.name : ''}
          </div>
          <div className={styles.sub_heading}>
            {!loading && group !== null ? group.description : ''}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!loading &&
              auth.user !== null &&
              group !== null &&
              group.admin._id !== auth.user._id &&
              group.members
                .map((member) => member.user._id)
                .indexOf(auth.user._id) > -1 && (
                <div>
                  <Button
                    className='my-2'
                    style={{ float: 'right' }}
                    onClick={() =>
                      removeMemberFromGroup(group._id, auth.user._id)
                    }
                  >
                    Leave group
                  </Button>
                </div>
              )}
            <div>
              <GroupNavigationTabs
                group={group}
                auth={auth}
                post={post}
                styles={styles}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer styles={styles} /> */}
    </Fragment>
  );
};

Group.propTypes = {
  getGroupById: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  createNewPost: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getGroupById,
  createNewPost,
  getAllPosts,
})(Group);
