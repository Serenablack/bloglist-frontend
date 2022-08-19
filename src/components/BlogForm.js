import { React, useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ addfunc }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogAdd = (event) => {
    event.preventDefault();
    addfunc({
      title,
      url,
      author,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={blogAdd}>
        <div>
          title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <button
          id="create-button"
          onClick={() => {
            "clicked";
          }}
        >
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addfunc: PropTypes.func.isRequired,
};

export default BlogForm;
