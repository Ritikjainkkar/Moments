import * as api from '../api';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = {
      type: 'FETCH_ALL',
      payload: data
    }
    dispatch(action);
  } catch (err) {
    console.log(err)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const data = await api.createPost(post);
    console.log(data)
    dispatch({type: 'CREATE', payload: post})
  } catch (err) {
    console.log(err);
  }
}