import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

function Login() {
  return (
    <Container fluid>
        <Row style={{height:'100vh'}}>
            <Col md={4}>
                <h2 align="center" className='pt-4'>Login</h2>
                <Form className='pt-4'>
                    <Form.Control type="email" className='mt-4' placeholder="Enter your email" />
                    <Form.Control type="password" className='mt-4' placeholder="Enter your password" />
                    <Button variant="primary" className='mt-4' type="submit">Login</Button>
                </Form>
            </Col>
            <Col style={{background:'blue'}} md={8}>Col2</Col>
        </Row>
    </Container>
  )
}

export default Login