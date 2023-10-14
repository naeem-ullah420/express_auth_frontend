import React, { useState } from 'react'
import NavBar from '../components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'


function HomePage() {
  return (
    <>
    <Container fluid>
        <Row >
            <Col md={3} className='bg-primary'>1 of 2</Col>
            <Col md={9} className='bg-danger'>2 of 2</Col>
        </Row>
    </Container>
    </>
  )
}

export default HomePage