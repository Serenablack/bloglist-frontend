import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateFunc, deleteFunc }) => {
  const [button, setButton] = useState("view");
  const [visible, setVisible] = useState(false);
  const [blogObj, setBlogObj] = useState(blog);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateFunc(updatedBlog);
    setBlogObj(updatedBlog);
  };

  const removeBlog = () => {
    deleteFunc(blog);
  };

  return (
    <div style={blogStyle}>
      <div id="blogshown">
        {blog.title} {blog.author}
        <button
          type="submit"
          onClick={() => {
            button === "hide" ? setButton("view") : setButton("hide");
            toggleVisibility();
          }}
        >
          {button}
        </button>
      </div>

      <div style={showWhenVisible} className="togglableForm">
        <p>{blog.url}</p>
        <p>
          {blogObj.likes}
          <button id="like-button" onClick={increaseLikes}>
            like
          </button>
        </p>
        {/* <p>{blogObj.user.username}</p> */}
        <div>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  updateFunc: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};

export default Blog;
