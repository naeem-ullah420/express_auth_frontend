import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

function SideBar() {
  return (
    <Container fluid>
        <Row className='py-2'>
            <Col md={12} style={{padding:"0px"}}>
                <h4>Filters</h4>
                <Form.Control type='search' name="search" className='mt-3' placeholder='search products....'></Form.Control>    
            </Col>
        </Row>
    </Container>
  )
}

export default SideBar