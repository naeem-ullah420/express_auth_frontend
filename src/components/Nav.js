import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">
          <NavLink to="/" style={{textDecoration:"none", color:"black"}}>E-commerce App</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {props.userdata.name}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;