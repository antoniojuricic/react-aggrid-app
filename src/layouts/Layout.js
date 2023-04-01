import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-2">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>RealEstate</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Listings</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/agents">
              <Nav.Link>Agents</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/owners">
              <Nav.Link>Owners</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/companies">
              <Nav.Link>Companies</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/clients">
              <Nav.Link>Clients</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="ml-1 mr-1">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
