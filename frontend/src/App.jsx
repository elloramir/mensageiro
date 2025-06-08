import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Sistema de Pedidos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated && (
                <Nav.Link as={Link} to="/pedidos">Pedidos</Nav.Link>
              )}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <Nav.Link onClick={() => {
                  localStorage.removeItem('access_token');
                  window.location.href = '/login';
                }}>Sair</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default App;