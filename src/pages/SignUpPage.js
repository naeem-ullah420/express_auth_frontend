import React, { useState } from 'react'
import { Button, InputGroup } from 'react-bootstrap';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import {NavLink, useNavigate} from 'react-router-dom'

function SignUp() {
const navigate = useNavigate();
const failedNotify = (m) => toast.error(m)
const successfulNotify = (m) => toast.success(m)

  const initial_payload = {
    "email":"",
    "name":"",
    "password":"",
    "confirm_password":"",
    "accept_terms_and_conditions":false,
  }

  const [signUpPayload, setSignUpPayload] = useState(initial_payload)

  const handleChange = (e) => {

    let value = e.target.value

    if(e.target.name == "accept_terms_and_conditions") {
      value = e.target.checked
    }

    setSignUpPayload({
        ...signUpPayload,
        [e.target.name] : value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("signUpPayload: ",signUpPayload)
    // submit signup request
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`,
            data : signUpPayload
        })
        console.log("response: ", response)
        successfulNotify("SignUp Successful")
        setSignUpPayload(initial_payload)
        navigate("/login")
    } catch (error) {
        failedNotify(error.response.data.message)
    }
  }

  return (
    <Container fluid >
      <Row style={{
        height: "100vh"
      }}>
        <Col className="pt-4 px-5" md={5}>
          <Form className='py-4 px-2' onSubmit={handleSubmit}>
            <h2 className='text-center'>Sign Up</h2>
            <Form.Control type='text' placeholder='Your Name' name='name' className='mt-4' value={signUpPayload.name} onChange={handleChange} />
            <Form.Control type='email' placeholder='Your Email' name="email" className='mt-4' value={signUpPayload.email} onChange={handleChange}/>
            <Form.Control type='password' placeholder='Password' name="password" className='mt-4' value={signUpPayload.password} onChange={handleChange}/>
            <Form.Control type='password' placeholder='Repeat Password' name='confirm_password' value={signUpPayload.confirm_password} className='mt-4' onChange={handleChange} />
            <Form.Check label="I agree all statements in Terms of Services" className='mt-4' name='accept_terms_and_conditions' checked={signUpPayload.accept_terms_and_conditions} onChange={handleChange} required></Form.Check>
            <Row>
              <Col className="d-flex justify-content-center">
              <Button
                  variant="primary"
                  type="submit"
                  className="align-self-center w-100 my-3"
                >
                  Register
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <NavLink to="/login">Already have account?</NavLink>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={7} className="d-flex justify-content-center align-items-center">
          <Image width="400px" height="400px" src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' />
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp