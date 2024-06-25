import { useState } from "react";

const CreateNewForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNewBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };

    addBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create new </h2>
      <form onSubmit={createNewBlog} id="createForm">
        <div>
          title:
          <input
            className="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            className="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            className="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateNewForm;
