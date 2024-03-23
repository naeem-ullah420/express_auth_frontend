import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useCategories } from '../../store/CategoriesContext'

function SideBar({handleSearch, search_text}) {
  const {categories} = useCategories()
  return (
    <Container fluid>
        <Row className='py-2'>
            <Col md={12} style={{padding:"0px"}}>
                <h4>Filters</h4>
                <Form.Control type='search' value={search_text} name="search" className='mt-3' placeholder='search products....' onChange={(e) => handleSearch(e.target.value)}></Form.Control>    
            </Col>
            <Col md={12} className='mt-2' style={{padding:"0px"}}>
            <h4>Categories</h4>
            <ul>
              <li>All</li>
              {/* <li>electronics (2)</li> */}
                {categories.map((category)=> {
                  return <li>{category.name}</li>
                })}
            </ul>
            </Col>
        </Row>
    </Container>
  )
}

export default SideBar