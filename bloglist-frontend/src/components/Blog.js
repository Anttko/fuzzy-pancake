import React from "react";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useField("text");
  const comments = blog.comments;

  const userBlog = user && blog.user && user.username === blog.user.username;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonRemove = {
    color: "black",
    backgroundColor: "red",
    borderRadius: 4,
  };

  const like = async () => {
    const info = `you liked ${blog.title}`;
    dispatch(likeBlog(blog));
    dispatch(setNotification(info, 5));
  };

  const removeBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title}`)) {
      const info = `you removed ${blog.title}`;
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(info, 5));
      navigate("/blogs/");
    } else {
      const cancel = `deleting blog cancelled`;
      dispatch(setNotification(cancel, 5));
    }
  };
  const handleComment = async (event) => {
    event.preventDefault();
    const addedComment = {
      ...blog,
      comments: blog.comments.concat(comment.value),
      user: blog.user.id
    }
    dispatch(commentBlog(addedComment));
    comment.reset()
  };

  if (user === null) {
    return null;

  }

  return (
    <div style={blogStyle}>
     
      <h2>{blog.title}</h2>
      <div className="title">{blog.title}</div>
      <div className="author">{blog.author}</div>
      <div className="url">{blog.url}</div>
      <div className="likes">
        LIKES: {blog.likes}
        <button id="likeButton" onClick={() => like()}>
          like
        </button>
        {userBlog === true && <button style={buttonRemove} onClick={removeBlog}>remove blog</button>}

        <h2>comments</h2>
        <form onSubmit={handleComment}>
          <input
            id="commentInput"
            type={comment.type}
            value={comment.value}
            placeholder="add comment"
            onChange={comment.onChange}
          />
          <button type="submit">add</button>
          <button
            type="button"
            onClick={() => {
              comment.reset();
            }}
          >
            reset
          </button>
        </form>
        <ul>
          {comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;

