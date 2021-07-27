import * as api from '../api';
import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING} from '../constants/actionTypes'

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data }  = await api.fetchPost(id);
    const action = {
      type: FETCH_POST,
      payload: data
    }
    dispatch({type: END_LOADING})
    dispatch(action);
  } catch (err) {
    console.log(err)
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data }  = await api.fetchPosts(page);
    const action = {
      type: FETCH_ALL,
      payload: data
    }
    dispatch({type: END_LOADING})
    dispatch(action);
  } catch (err) {
    console.log(err)
  }
}


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    const action = {
      type: FETCH_BY_SEARCH,
      payload: data
    }
    dispatch({type: END_LOADING})
    dispatch(action);
  } catch (err) {
    console.log(err)
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data } = await api.createPost(post);
    history.push(`/posts/${data._id}`)
    dispatch({type: END_LOADING})
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
