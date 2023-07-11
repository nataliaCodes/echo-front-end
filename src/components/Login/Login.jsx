import { Redirect } from "react-router-dom";

import useApplicationData from '../../hooks/useApplicationData';

import Form from 'react-bootstrap/Form';
import Button from '../shared/Button';

export default function Login(props) {

  //handling all user state from within useApplicationData
  const { state, handleFormChange, handleLoginSubmit } = useApplicationData();

  if (state.redirect) {
    return <Redirect to={state.redirect} />;
  }

  return (
    <div className="Login">
      <div className="content-container">
        <div>
          {state.error && <Form.Text>{state.error}</Form.Text>}
        </div><br />
        <div className="login-form">
          <Form onSubmit={e => handleLoginSubmit(e)}>
            <Form.Group controlId="formEmail">
              <Form.Label>
                Email:&nbsp;&nbsp;
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleFormChange}
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
                ></Form.Control>
              </Form.Label>
            </Form.Group>
            {/* <input variant="outline-dark" type="submit" name="log in" value="Log in" /> */}
            <Button type="submit" onClick={handleLoginSubmit} onKeyPress={(e) => { e.target.keyCode === 13 && e.preventDefault() }}>Log in</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}