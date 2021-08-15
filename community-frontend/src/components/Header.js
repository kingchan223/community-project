import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            HOME
          </Link>
          <Nav className="me-auto">
            <Link to="/join" className="nav-link">
              JOIN
            </Link>
            <Link to="/login" className="nav-link">
              LOGIN
            </Link>
            <Link to="/user/1" className="nav-link">
              My Page
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Header;
