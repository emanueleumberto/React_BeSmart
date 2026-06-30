import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavbarComponent() {

  const {utente, logout} = useAuth()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {!utente ? (<Navbar.Text>
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </Navbar.Text>) : (
            <Navbar.Text> 
              <NavLink className="nav-link" to="/profile">Ciao {utente.nome} </NavLink>
              <Button variant="dark" onClick={logout}>Logout</Button>
            </Navbar.Text>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
