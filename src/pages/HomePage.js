import React, { useState } from 'react'
import NavBar from '../components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddProduct from '../components/AddProduct'


function HomePage() {
  let products = [
    {"title": "Product 1", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 2", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 3", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 4", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 5", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 6", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 7", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 8", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
    {"title": "Product 9", "description": "This is the product description", "image": "https://blog.hubspot.com/hs-fs/hubfs/product-life-cycle_0.webp?width=595&height=400&name=product-life-cycle_0.webp"},
  ]


  return (
    <>
    <Container fluid>
        <Row >
            <Col xs={2} className='bg-primary'>1 of 2</Col>
            <Col md={10} className='p-2'>
              <AddProduct/>
              <div className='clearfix'></div>
              <Row>
                {products.map(p => {
                  return (
                    <Col style={{ minWidth: '280px' }} md={3} className='p-2'>
                      <Card>
                        <Card.Img variant="top" src={p.image} />
                        <Card.Body>
                          <Card.Title>{p.title}</Card.Title>
                          <Card.Text>
                            {p.description}
                          </Card.Text>
                          <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })}
              </Row>

            </Col>
        </Row>
    </Container>
    </>
  )
}

export default HomePage