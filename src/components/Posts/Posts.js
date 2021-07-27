import React from 'react'
import {useSelector} from 'react-redux'
import Post from './post/Post'
import useStyles from './styles';
import { Grid, CircularProgress} from '@material-ui/core'

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { isLoading, posts } = useSelector((state) => state.posts);
  if(!posts.length && !isLoading) 
    return 'No Posts'
  return(
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {
          posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId = {setCurrentId} />
            </Grid>
          ))
        }
      </Grid>
    )
  );
}

export default Posts;