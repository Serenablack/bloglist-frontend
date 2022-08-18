import { useState } from "react";
// import PropTypes from "prop-types";

const Blog = ({ blog, updateFunc }) => {
  const [button, setButton] = useState("view");
  const [visible, setVisible] = useState(false);
  // const [blogObj, setBlogObj] = useState(blog);

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
    // const updatedBlog = {
    //   ...blog,
    //   likes: blog.likes + 1,
    // };
    // updateFunc(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
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

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button id="like-button" onClick={increaseLikes}>
            like
          </button>
        </p>
        <p>{blog.user.username}</p>
      </div>
    </div>
  );
};

// BlogForm.propTypes = {
// updateFunc: PropTypes.func.isRequired,
// blog: PropTypes.object.isRequired,
// author: PropTypes.string.isRequired,
// };

export default Blog;
