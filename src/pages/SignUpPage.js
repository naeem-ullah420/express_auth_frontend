import React, { useState } from 'react'
import { Button, InputGroup } from 'react-bootstrap';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

function SignUp() {
const failedNotify = (m) => toast.error(m)
const successfulNotify = (m) => toast.success(m)


  const [signUpPayload, setSignUpPayload] = useState({
    "email":"",
    "name":"",
    "password":"",
    "confirm_password":""
  })

  const handleChange = (e) => {
    setSignUpPayload({
        ...signUpPayload,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("signUpPayload: ",signUpPayload)
    // submit signup request
    try {
        const response = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/auth/signup',
            data : signUpPayload
        })
        console.log("response: ", response)
        successfulNotify("SignUp Successful")
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
          <Form className='py-4 px-2' onSubmit={handleSubmit} style={{
            // border:"2px solid #BFBFBF"
            boxShadow:"7px 11px 49px -1px rgba(0,0,0,0.57);"
          }}>
            <h2 className='text-center'>Sign Up</h2>
            <Form.Control type='text' placeholder='Your Name' name='name' className='mt-4' value={signUpPayload.name} onChange={handleChange} />
            <Form.Control type='email' placeholder='Your Email' name="email" className='mt-4' value={signUpPayload.email} onChange={handleChange}/>
            <Form.Control type='password' placeholder='Password' name="password" className='mt-4' value={signUpPayload.password} onChange={handleChange}/>
            <Form.Control type='password' placeholder='Repeat Password' name='confirm_password' value={signUpPayload.confirm_password} className='mt-4' onChange={handleChange} />
            <Form.Check label="I agree all statements in Terms of Services" className='mt-4'></Form.Check>
            <Button variant="primary" type='submit' className='mt-4 align-self-center'>Register</Button>
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