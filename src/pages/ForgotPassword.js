import React, { useState } from "react";
import { Button, InputGroup, Stack } from "react-bootstrap";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const failedNotify = (m) => toast.error(m);
  const successfulNotify = (m) => toast.success(m);

  const initial_payload = {
    email: "",
  };

  const [ForgotPasswordPayload, setForgotPasswordPayload] = useState(initial_payload);

  const handleChange = (e) => {
    let value = e.target.value;
    setForgotPasswordPayload({
      ...ForgotPasswordPayload,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ForgotPasswordPayload: ", ForgotPasswordPayload);
    // submit ForgotPassword request
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/auth/forgotPassword`,
        data: ForgotPasswordPayload,
      });
      console.log("response: ", response.data.token);
      successfulNotify("ForgotPassword Successful");
      setForgotPasswordPayload(initial_payload);
      // navigate("/");
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
        <Col className="pt-4 px-5 mt-5" md={5}>
          <Form className="py-4 px-2" onSubmit={handleSubmit}>
            <h2 className="text-center">ForgotPassword</h2>
            <Form.Group className="mb-3 mt-5">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Your Email"
                name="email"
                value={ForgotPasswordPayload.email}
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
                  ForgotPassword
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
              <NavLink to="/login">Back to login?</NavLink>
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

export default ForgotPassword;
