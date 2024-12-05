import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios'; // Axios import for API calls

const HomePage = () => {
  // State to store blogs data
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch blogs from the backend API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Replace this with your actual backend URL
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data); // Set the blog data to state
        setLoading(false); // Set loading state to false once data is fetched
      } catch (err) {
        console.error(err);
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs(); // Call the fetchBlogs function on component mount
  }, []);

  // Show loading spinner if the blogs are being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an error fetching the blogs
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Blog List Section */}
      <Container>
        <Row>
          {blogs.map((blog) => (
            <Col sm={12} md={6} lg={4} key={blog._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={blog.image || 'https://via.placeholder.com/500x300'} />
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.excerpt}</Card.Text>
                  <Button variant="primary" href={`/blog/${blog._id}`}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
