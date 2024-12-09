import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

const AdminNavBar = ({ adminName }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      {/* Top Horizontal Bar */}
      <Navbar bg="light" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand>
            <h5>Welcome, {adminName || "Admin"}!</h5>
          </Navbar.Brand>
          <Button
            variant="outline-dark"
            className="d-lg-none"
            onClick={toggleSidebar}
          >
            Menu
          </Button>
          <Button
            variant="outline-dark"
            className="d-none d-lg-block"
            onClick={handleLogout}
          >
            <BoxArrowRight /> Logout
          </Button>
        </Container>
      </Navbar>

      {/* Vertical Navigation Bar */}
      <div className="d-flex">
        {/* Sidebar for Desktop */}
        <div
          className="d-none d-lg-flex flex-column bg-light vh-100 border-end"
          style={{ width: "250px" }}
        >
          <Nav className="flex-column p-3">
            <Nav.Item>
              <Nav.Link as={Link} to="/admin-dashboard" className="text-dark">
                Dashboard
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/manage-blogs" className="text-dark">
                Manage Blogs
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/manage-users" className="text-dark">
                Manage Users
              </Nav.Link>
              <Outlet/>
            </Nav.Item>
          </Nav>
        </div>

        {/* Sidebar for Mobile */}
        <Offcanvas
          show={showSidebar}
          onHide={toggleSidebar}
          placement="start"
          className="bg-light"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Admin Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/admin-dashboard"
                  className="text-dark"
                  onClick={toggleSidebar}
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/manage-blogs"
                  className="text-dark"
                  onClick={toggleSidebar}
                >
                  Manage Blogs
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/manage-users"
                  className="text-dark"
                  onClick={toggleSidebar}
                >
                  Manage Users
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content Area */}
        <div className="flex-grow-1 p-4">
          {/* Render child components for routes here */}
          <h5>This is the admin main content area.</h5>
        </div>
      </div>
    </>
  );
};

export default AdminNavBar;
