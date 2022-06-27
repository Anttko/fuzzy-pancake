import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      const sortedBlogs = action.payload;
      sortedBlogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
      return sortedBlogs;
    },
    updateLikes(state, action) {
      const likedBlog = action.payload;
      const id = likedBlog.id;

      return state.map((b) => (b.id === id ? likedBlog : b))
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((p) => p.id !== id);
    },
    loadComment(state, action) {
      const commentedBlog = action.payload;
      const id = commentedBlog.id;
      return state.map((b) => (b.id === id ? commentedBlog : b))
    },
  },
});

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likesAdd = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    const blogToChange = await blogService.update(blog.id, likesAdd);
    dispatch(updateLikes(blogToChange));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlogs(newBlog));
  };
};
export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id).then(dispatch(removeBlog(id)));
  };
};

export const commentBlog = (blog) => {
  return async (dispatch) => {

    blogService.update(blog.id, blog).then((updatedBlog) => {
      dispatch(loadComment(updatedBlog));
      dispatch(setNotification(`commented blog`, 5))
    })

  };
};

export const { appendBlogs, setBlogs, updateLikes, removeBlog, loadComment } =
  blogSlice.actions;
export default blogSlice.reducer;
