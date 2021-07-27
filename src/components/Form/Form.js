import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
  const history = useHistory();
  const [postData, setPostData] = useState({  title:'', message:'', tags:'', selectedFile:'' });
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId): null)

  useEffect((e) => {
    if(post) setPostData(post);
  }, [currentId, post])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  }

  const clear = () => {
    setPostData({ title:'', message:'', tags:'', selectedFile:'' });
    setCurrentId(null);
  }

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper} elevation={6}> 
        <Typography variant="h6" align="center">
          Please Sign In to post and like other's status.
        </Typography>
      </Paper>
    )
  }

  return(
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a new Post</Typography>
        <TextField 
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value})}
        />
        <TextField 
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value})}
        />
        <TextField 
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false}
            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
          />
        </div>
        <div className={classes.container}>
          <Button
            className={classes.buttonSubmit} 
            variant="contained" 
            color="primary"
            size="large"
            type="submit"
            onClick={handleSubmit}
            fullWidth > 
            Submit</Button>
          <Button
            className={classes.buttonSubmit} 
            variant="contained" 
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth > 
            Clear</Button>
        </div>
      </form>
    </Paper>
  );
}

export default Form;