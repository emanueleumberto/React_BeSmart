import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>         
            <NavLink className="nav-link" to="/prodotti">Prodotti</NavLink>    
            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
