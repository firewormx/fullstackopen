import CreateNewForm from "./CreateNewForm";
import BlogList from "./BlogList";
import { useRef } from "react";
import Togglable from "./Togglable";

const Home = () => {
  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <CreateNewForm />
    </Togglable>
  );

  return (
    <div>
      {blogForm()}
      <BlogList />
    </div>
  );
};
export default Home;