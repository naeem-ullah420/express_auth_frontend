import React, { useState } from "react";
import { Button, InputGroup, Stack } from "react-bootstrap";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, NavLink, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const params = useParams()
  const failedNotify = (m) => toast.error(m);
  const successfulNotify = (m) => toast.success(m);

  const initial_payload = {
    password: "",
    confirm_password: "",
  };

  const [ResetPasswordPayload, setResetPasswordPayload] = useState(initial_payload);

  const handleChange = (e) => {
    let value = e.target.value;
    setResetPasswordPayload({
      ...ResetPasswordPayload,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ResetPasswordPayload: ", ResetPasswordPayload);
    // submit ResetPassword request
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/auth/resetPassword/" + params.token,
        data: ResetPasswordPayload,
      });
      console.log("response: ", response.data.token);
      successfulNotify("ResetPassword Successful");
      setResetPasswordPayload(initial_payload);
      navigate("/login");
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
            <h2 className="text-center">ResetPassword</h2>
            <Form.Group className="mb-3 mt-5">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="New Password"
                name="password"
                value={ResetPasswordPayload.email}
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Confirm Password"
                name="confirm_password"
                value={ResetPasswordPayload.email}
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
                  ResetPassword
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

export default ResetPassword;
