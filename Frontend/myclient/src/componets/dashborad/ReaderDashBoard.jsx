import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const ReaderDashboard = ({ token }) => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState([]);

  // Fetch all blogs
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4007/api/getAllBlog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data.blogs);
        console.log("Fetched Blogs:", response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchAllBlogs();
  }, [token]);

  // Handle like functionality
  const handleLike = async (blogId) => {
    try {
      const isLiked = likes.includes(blogId);

      // Optimistically update the UI
      if (isLiked) {
        setLikes((prev) => prev.filter((id) => id !== blogId));
      } else {
        setLikes((prev) => [...prev, blogId]);
      }

      // Send like request
      await axios.post(`http://localhost:4007/api/${blogId}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`Blog ${isLiked ? "unliked" : "liked"} successfully.`);
    } catch (error) {
      console.error("Error liking the blog:", error);

      // Revert UI change in case of error
      if (likes.includes(blogId)) {
        setLikes((prev) => [...prev, blogId]);
      } else {
        setLikes((prev) => prev.filter((id) => id !== blogId));
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Reader Dashboard</h2>
      <Row>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Col md={4} className="mb-4" key={blog._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.content.substring(0, 100)}...</Card.Text>
                  <Card.Text>
                    <strong>Author:</strong> {blog.author?.userName || "Unknown"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Likes:</strong> {blog.likes.length}
                  </Card.Text>
                  <Button
                    variant={likes.includes(blog._id) ? "success" : "outline-primary"}
                    onClick={() => handleLike(blog._id)}
                  >
                    {likes.includes(blog._id) ? "Unlike" : "Like"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No blogs available to display.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ReaderDashboard;
