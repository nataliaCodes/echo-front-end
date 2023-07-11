import { Redirect } from "react-router-dom";

import useApplicationData from '../../hooks/useApplicationData';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import Button from '../shared/Button';

export default function Register(props) {

  //handling all user state from within useApplicationData
  const { state, handleFormChange, handleRegisterSubmit } = useApplicationData();

  if (state.redirect) {
    return <Redirect to={state.redirect} />;
  }

  return (
    <div className="Register">
      <div className="content-container">
        {state.error && 
          <>
            <Alert variant="danger">
              <p>{state.error}</p>
            </Alert><br />
          </>
        }
        <div className="register-form">
          <Form onSubmit={e => handleRegisterSubmit(e)} noValidate>
            <Form.Group controlId="first_name">
              <Form.Label>
                First name:&nbsp;&nbsp;
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={state.firstName}
                onChange={handleFormChange}
                noValidate
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>
                Last name:&nbsp;&nbsp;
              <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleFormChange}
                  noValidate
                ></Form.Control>
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>
                Email:&nbsp;&nbsp;
              <Form.Control
                  type="email"
                  name="email"
                  onChange={handleFormChange}
                  noValidate
                ></Form.Control>
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>
                Password:&nbsp;&nbsp;
              <Form.Control
                  type="password"
                  name="password"
                  onChange={handleFormChange}
                  noValidate
                ></Form.Control>
              </Form.Label>
            </Form.Group>
            <Button type="submit" onClick={handleRegisterSubmit} onKeyPress={(e) => { e.target.keyCode === 13 && e.preventDefault() }}>Register</Button>
          </Form>
        </div>
      </div>
    </div>

  );
}