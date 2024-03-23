import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useCategories } from '../../store/CategoriesContext'
import { useProducts } from '../../store/ProductContext'

function SideBar({handleSearch, search_text}) {
  const {categories} = useCategories()
  const {selectedCategory, setSelectedCategory, setPage} = useProducts()

  const handleCategoryFilter = (category_id) => {
    setSelectedCategory(category_id)
    setPage(1)
  }

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
              <li className={`cursor-pointer ${!selectedCategory  ? 'fw-bold text-primary': ''}`} onClick={() => handleCategoryFilter("")}>All</li>
              {/* <li>electronics (2)</li> */}
                {categories.map((category)=> {
                  return <li className={`cursor-pointer ${selectedCategory === category._id ? 'fw-bold text-primary': ''}`} onClick={() => handleCategoryFilter(category._id)}>{category.name} ({category.product_count})</li>
                })}
            </ul>
            </Col>
        </Row>
    </Container>
  )
}

export default SideBar