import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

function SideBar({setSearch}) {
  return (
    <Container fluid>
        <Row className='py-2'>
            <Col md={12} style={{padding:"0px"}}>
                <h4>Filters</h4>
                <Form.Control type='search' name="search" className='mt-3' onChange={(e) => setSearch(e.target.value)} placeholder='search products....'></Form.Control>    
            </Col>
        </Row>
    </Container>
  )
}

export default SideBar