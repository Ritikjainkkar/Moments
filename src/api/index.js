import axios from 'axios'

const url = 'http://localhost:3000/post'

export const fetchPosts = () => axios.get(url);