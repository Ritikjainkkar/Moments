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