import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotifications } from "../reducers/notificationReducer";
import {Form, Button} from 'react-bootstrap'
import { useRef } from "react";

const CreateNewForm = () => {
  const dispatch = useDispatch()

  const createNewBlog = (event) => {
    event.preventDefault();

const titleInput = event.target.titleInput.value;
const authorInput = event.target.authorInput.value;
const urlInput = event.target.urlInput.value

event.target.titleInput.value = ""
event.target.authorInput.value = ""
event.target.urlInput.value = ""

    const newBlog = {
      title: titleInput,
      author: authorInput,
      url: urlInput
    };
    dispatch(createBlog(newBlog));
    dispatch(setNotifications(`${titleInput} is added by ${authorInput}!`, 5))
  };

  return (
    <div>
      <h2>Create new </h2>
      <Form onSubmit={createNewBlog} id="createForm">
        <Form.Group>
        <Form.Label> title:</Form.Label>
          <Form.Control type="text" id="titleInput" name="Title"/>

        <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            id="authorInput"
            name="Author"/>
        <Form.Label>url:</Form.Label>
          <Form.Control  id="urlInput" name='Url'/>
     
        <Button variant= "primary" type="submit" id="create">
          create
        </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CreateNewForm;
