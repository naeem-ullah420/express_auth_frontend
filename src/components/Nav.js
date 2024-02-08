import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as Icon from 'react-bootstrap-icons';
import { Button, Badge } from 'react-bootstrap';
import { useCartContext } from '../contexts/CartContext';
import axios from 'axios';

function NavBar(props) {
  const navigate = useNavigate();
  const {products} = useCartContext();

  const logout = () => {
    axios({
      method: 'get',
      url: `http://localhost:8000/api/auth/logout`,
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(function (response) {
      // navigate("/login");
      localStorage.clear()
      window.location = "/login"
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <NavLink to="/" style={{textDecoration:"none", color:"black"}}>E-commerce App</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav.Link className="me-auto">
            <NavLink to="/orders" style={{'textDecoration': 'none', 'color':'black'}}>Orders</NavLink>
          </Nav.Link>
          {products.length ? <Navbar.Text>
            <NavLink to="/productsCart">
              <Button variant="light" size="md">
                <Icon.CartCheck size={20}></Icon.CartCheck>
                <Badge bg="secondary" style={{top:'-10px'}}>{products.length}</Badge>
              </Button>
            </NavLink>
          </Navbar.Text> : ""}
          <NavDropdown title={props.userdata.name} align="end" id="basic-nav-dropdown">
              <NavDropdown.Item>Settings</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;