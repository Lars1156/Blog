import React,  {useState} from "react";
import {Container, Row, Col, Form, Button, Card, Alert} from 'react-bootstrap';
import axios from 'axios';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import {useNavigate} from 'react-router-dom';

const LoginPage = () => { 
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[showPassword , setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
             const response = await axios.post('http://localhost:4007/api/login' , {email , password});
             localStorage.setItem('token', response.data.token);
             const user = response.data.role
             console.log(user)
             if(response.data.success){
                setSuccess('Login Successfull');
             };
             if(response.data.error){
                setError('Invalid Email or Password');
             }
            //  rerender the role wise components DashBorads
            navigate('/author-dashboard');
          
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
            setSuccess('');
        }
    }

    return(
        <div>
                     <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row>
          <Col md={12}>
            <Card className="p-4 shadow-lg">
              <Card.Body>
                <h3 className="text-center mb-4">Login to Your Account</h3>

                {/* Success Message */}
                {success && <Alert variant="success">{success}</Alert>}

                {/* Error Message */}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                  {/* Email Field */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-field">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        className="password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeSlash /> : <Eye />}
                      </Button>
                    </div>
                  </Form.Group>

                  {/* Login Button */}
                  <Button variant="dark" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>

                {/* Register Link */}
                <div className="mt-3 text-center">
                  <span>Don't have an account? </span>
                  <Button variant="link" onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Styles for Password Field */}
      <style jsx>{`
        .password-field {
          position: relative;
          display: flex;
        }
        .password-toggle-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
        }
      `}</style>
    </div>
        </div>
    )
}

export default LoginPage;