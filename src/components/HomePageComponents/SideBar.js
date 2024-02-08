import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useCategoriesContext } from '../../contexts/CategoriesContext'
import { useProduct } from '../../contexts/ProductContext'

function SideBar({search, setSearch}) {
  const {categories} = useCategoriesContext()
  let {category:selectedCategory, setCategory, setPage} = useProduct()

  const handleCategoryFilter = (category) => {
    setPage(1)
    setCategory(category)
  }

  return (
    <Container fluid>
        <Row className='py-2'>
            <Col md={12} style={{padding:"0px"}}>
                <h5>Filters</h5>
                <Form.Control type='search' name="search" className='mt-3' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search products....'></Form.Control>    
            </Col>
            <Col md={12} style={{padding:"0px"}} className='mt-2'>
                <h5>Categories</h5>
                <ul>
                  <li className={`cursor-pointer
                    ${!selectedCategory ? 'fw-bold text-decoration-underline text-primary' : ''}
                  `}  onClick={() => {handleCategoryFilter('')}}>All</li>
                {categories ? categories.map(category => {
                  return <li className={`cursor-pointer
                    ${selectedCategory._id === category._id ? 'fw-bold text-decoration-underline text-primary' : ''}
                  `} key={category._id} 
                  onClick={() => {handleCategoryFilter(category)}}
                  >
                    {category.name} ({category.product_count})
                    </li>
                }) : ""}
                </ul>

            </Col>
        </Row>
    </Container>
  )
}

export default SideBar