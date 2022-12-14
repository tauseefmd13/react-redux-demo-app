import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  posts: [],
  post: {},
  status: 'idle',
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({search = "", pageNumber = 1}) => {
  const response = await axios.get(`/posts?search=${search}&page=${pageNumber}`).then((response) => {
    // console.log('Success',response);
    return response;
  }).catch((error) => {
    console.log('Error',error);
  });
  return response.data;
})

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async ({ postId }) => {
  const response = await axios.get(`/posts/${postId}`).then((response) => {
    // console.log('Success',response);
    return response;
  }).catch((error) => {
    console.log('Error',error);
  });
  return response.data;
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toLocaleDateString()
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content, user } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.user = user
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      console.log("Pending");
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!",payload);
      state.status = 'succeeded';
      state.posts = payload;
      return state;
    },
    [fetchPosts.rejected]: (state) => {
      console.log("Rejected!");
      state.status = 'failed';
      state.error = '';
    },

    [fetchPostById.pending]: (state) => {
      console.log("Pending");
    },
    [fetchPostById.fulfilled]: (state, { payload }) => {
      console.log("Fetched Single Post Successfully!",payload);
      state.post = payload;
      return state;
    },
    [fetchPostById.rejected]: (state) => {
      console.log("Rejected!");
    },
  },
})

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;

export const selectSinglePost = (state) => state.posts.post;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);
