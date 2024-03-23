import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { Badge, Button, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { useCartContext } from '../store/CartContext';

function NavBar(props) {
  const nagivate = useNavigate()
  const {storeProducts} = useCartContext()
  const logout = () => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/api/auth/logout',
      headers: { 
        'token': localStorage.getItem('token')
      }
    };
    
    axios(config)
    .then(function (response) {
      localStorage.clear()
      nagivate("/login")
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <NavLink to="/" style={{textDecoration:"none", color:"black"}}>
            E-commerce App
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Nav.Link>
          Orders
        </Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          {storeProducts.length ? (<Navbar.Text>
            <NavLink to="/productsCart">
              <Button variant="light" size="md">
                <Icon.CartCheck size={20}></Icon.CartCheck>
                <Badge bg="secondary" style={{top:'-10px'}}>{storeProducts.length}</Badge>
              </Button>
            </NavLink>
          </Navbar.Text>) : ""}
        
          {/* <Navbar.Text>
            {props.userdata.name}
          </Navbar.Text> */}
          <NavDropdown title={props.userdata.name} align="end" id="basic-nav-dropdown">
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
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