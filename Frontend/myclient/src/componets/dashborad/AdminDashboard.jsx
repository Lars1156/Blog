import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { BoxArrowRight } from 'react-bootstrap-icons'; // Icon for logout

const AdminDashboard = () => {
  const navigate = useNavigate();

 
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home page
  };

  return (
    <Container fluid>
      <Row className="bg-dark text-white py-3">
        <Col md={10}>
          <h4>Welcome Admin</h4>
        </Col>
        <Col md={2} className="d-flex justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>
            <BoxArrowRight /> Logout
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={3} className="bg-light vh-100">
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
            </Nav.Item>
          </Nav>
        </Col>

        <Col md={9}>
          {/* Content Area */}
          <div className="p-4">
            <h3>Dashboard Content</h3>
            {/* Add your dashboard content here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
