import React, { useState } from "react";
import { Button, InputGroup, Stack } from "react-bootstrap";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const failedNotify = (m) => toast.error(m);
  const successfulNotify = (m) => toast.success(m);

  const initial_payload = {
    email: "",
    password: "",
  };

  const [LoginPayload, setLoginPayload] = useState(initial_payload);

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name == "accept_terms_and_conditions") {
      value = e.target.checked;
    }

    setLoginPayload({
      ...LoginPayload,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LoginPayload: ", LoginPayload);
    // submit Login request
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        data: LoginPayload,
      });
      console.log("response: ", response.data.token);
      localStorage.setItem("token", response.data.token)
      successfulNotify("Login Successful");
      setLoginPayload(initial_payload);
      navigate("/");
    } catch (error) {
      failedNotify(error.response.data.message);
    }
  };

  return (
    <Container fluid>
      <Row
        style={{
          height: "100vh",
        }}
      >
        <Col className="pt-4 px-5" md={5}>
          <Form className="py-4 px-2" onSubmit={handleSubmit}>
            <h2 className="text-center">Login</h2>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Your Email"
                name="email"
                value={LoginPayload.email}
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="w-100">
                <span className="mr-auto">Password</span>
                <NavLink to="/forgotPassword" className="float-end">Forgot Password</NavLink>
              </Form.Label>
              <Form.Control 
                type="password"
                placeholder="Password"
                name="password"
                value={LoginPayload.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Row>
              <Col className="d-flex justify-content-center">
              <Button
                  variant="primary"
                  type="submit"
                  className="align-self-center w-100"
                >
                  Login
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
              <NavLink to="/signup">Not Already registered ?</NavLink>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col
          md={7}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            width="400px"
            height="400px"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
