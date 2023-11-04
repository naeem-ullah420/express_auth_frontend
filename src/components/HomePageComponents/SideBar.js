import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

function SideBar({handleSearch, search_text}) {

  return (
    <Container fluid>
        <Row className='py-2'>
            <Col md={12} style={{padding:"0px"}}>
                <h4>Filters</h4>
                <Form.Control type='search' value={search_text} name="search" className='mt-3' placeholder='search products....' onChange={(e) => handleSearch(e.target.value)}></Form.Control>    
            </Col>
        </Row>
    </Container>
  )
}

export default SideBar