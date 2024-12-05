import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Logo and Title */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/path-to-blog-icon.png"
            alt="Blog Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
          {' '}
          My Blog
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible content */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Link to="/login">
              <Button variant="outline-light">
                Login
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BlogNavbar;
