import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
// import styled from 'styled-components'

// const Button = styled.button`
//   background: Bisque;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid Chocolate;
//   border-radius: 3px;
// `

// const Input = styled.input`
//   margin: 0.25em;
// `

const Login = (props) => {
    const navigate = useNavigate()
  
    const onSubmit = (event) => {
      event.preventDefault()
      props.onLogin('mluukkai')
      navigate('/')
    }
    return (
        <div>
          <h2>login</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='formBasicUsername'>
                <Form.Label> username: </Form.Label>
            <Form.Control type='text' name='username' placeholder="mluukkai"/>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
            <Form.Label>password: </Form.Label>
            <Form.Control type='password' name='password' placeholder='******' />
            </Form.Group>
            <Button variant='primary' type='submit'>login</Button>
          </Form>

        </div>
      )
    }

export default Login