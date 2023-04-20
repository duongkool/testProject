/* eslint-disable no-mixed-operators */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useContext} from "react"
import { UserContext } from '../context/UserContext';

const Header = (props) => {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext);


  const handleLogout = () => {
    if (localStorage.token) { 
      logout()
      navigate("/")
      toast.success("log out sussces")
    }

  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink className="navbar-brand" to="/">
            Base-React
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            {(user && user.auth === true || window.location.pathname === '/') &&
             
              <>
                <Nav className="me-auto"> 
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.auth === true && <span className="nav-link">Wellcome {user.email}</span>}
                  <span></span>
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true 
                      ? 
                      <NavDropdown.Item className="nav-link" onClick={() =>handleLogout()}>Logout</NavDropdown.Item> 
                      :
                      <NavLink className="nav-link" to="/login">
                      Login
                      </NavLink>
                    }
                  </NavDropdown>
                </Nav>
              </>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
