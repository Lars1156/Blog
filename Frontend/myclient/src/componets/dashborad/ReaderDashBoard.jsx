import React, { useState, useEffect  } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import axios from "axios";

const ReaderDashBoard = () =>{
const [blogs , setBlogs] = useState([]);
const [likes , setLikes ] = useState('');
const [commite , setCommite] = useState('');
const [error , setError]  = useState('')
useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const response = await axios.get("http://localhost:4007/api/getAllblog");
        if (response.data.success) {
          setBlogs(response.data.blogs);
        } else {
          setError(response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs.");
      }
    };

    fetchAllBlog();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

// Handle the Likes for the Blogs By the Id 
const handleLike = async(blogId)=>{
    try {
        const isLiked = likes.includes(blogId);
        if (isLiked) {
          setLikes((prev) => prev.filter((id) => id !== blogId));
        } else {
          setLikes((prev) => [...prev, blogId]);
        }
        await axios.post('',{blogId});

    } catch (error) {
          console.error("Error liking the blog:", error);
    }
};
// Handlled the Commite to the Blogs Using Id's

const handleCommite = async(blogId)=>{
    try {
        if (!commite.trim()) return alert("Comment cannot be empty");
         await axios.post('',{blogId , commite});
        setCommite('');
      alert('Commite Added Successfully ');
    } catch (error) {
        console.error("Error commenting on the blog:", error);
    }
}
  return(
     <Container fluid>
      <Row>
        {blogs.map((blog) => (
          <Col md={6} lg={4} key={blog._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  By {blog.author?.userName || "Unknown Author"}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
     </Container>
  )
}
export default ReaderDashBoard;