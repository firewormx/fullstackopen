import { useSelector, useDispatch } from "react-redux"
import { createComment, initializeComments } from "../reducers/commentReducer"
import { setNotifications } from "../reducers/notificationReducer"
import {Button, Form} from 'react-bootstrap'
import { useEffect } from "react"


const Comment = ({id}) => {
    const comments = useSelector(({comments}) => comments )
    const dispatch = useDispatch()

useEffect(() => {
    dispatch(initializeComments(id))
},[dispatch, id])

    const handleComment = async(event) => {
     event.preventDefault()
     const commentInput = event.target.commentInput.value

     event.target.commentInput.value = ""
     dispatch(createComment(id, commentInput))
     dispatch(setNotifications(`new comment' ${commentInput}' added!`, 3))
    }

    const fontSize = {
        fontSize: 20
    }
    const margin = {
        margin: 10
    }

    return (
        <div>
            <Form  onSubmit={handleComment}>
           <em><Form.Label style={fontSize}>Comments</Form.Label></em>
          <Form.Control type="text" name="commentInput" />
                <Button type="submit" variant="primary" style={margin}>add comment</Button>
            <ul>
                {comments.map(comment =>  <li key={comment.id}>{comment.content}</li>
                )}
            </ul>
            </Form>
        </div>
    )
}
export default Comment