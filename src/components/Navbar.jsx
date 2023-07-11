import { Link } from "react-router-dom";
import Menu from 'react-bootstrap/Navbar'

import useApplicationData from '../hooks/useApplicationData';

import NavbarItem from './NavbarItem';
import Logout from './Login/Logout';

import '../stylesheets/Navbar.scss';

export default function Navbar(props) {

  const { handleLogout } = useApplicationData();

  return (

    <div className="Navbar">
      <Menu expand="lg">
        <Menu.Toggle aria-controls="basic-Menu-nav" />
        <Menu.Collapse id="basic-Menu-nav">
          <Link to="/">
            <NavbarItem>Home</NavbarItem>
          </Link>
          {props.cookies.user ?
            <>
              <Link to="/videos">
                <NavbarItem>My videos</NavbarItem>
              </Link>
              <Link to="/categories">
                <NavbarItem>My categories</NavbarItem>
              </Link>
              <Link to="/">
                <Logout onClick={handleLogout}>Log out</Logout>
              </Link>
            </>
            :
            <>
              <Link to="/register">
                <NavbarItem>Register</NavbarItem>
              </Link>
              <Link to="/login">
                <NavbarItem>Log in</NavbarItem>
              </Link>
            </>
          }
        </Menu.Collapse>
      </Menu>



    </div>

  );
}