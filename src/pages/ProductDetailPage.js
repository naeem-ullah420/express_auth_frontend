import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router'
import { ProductContext, useProduct } from '../contexts/ProductContext'
import { Col, Container, Row } from 'react-bootstrap'
import { useCartContext } from '../contexts/CartContext'

function ProductDetailPage() {
  const {productId} = useParams()
  const {products} = useProduct()
  const {products: cartProducts} = useCartContext()
  let product = products.find((p) => p._id === productId)

  if(!product) {
    product = cartProducts.find((p) => p._id === productId)
  }
  
  return (
    <Container className='mt-5'>
      <Row>
        <Col md={12}>
        {/* {JSON.stringify(product)} */}
          <img src={product.image_url} width="100%" height="500px" />
        </Col>
        <Col md={12} className='mt-2'>
          <b>
            Title: {product.name.toUpperCase()}
          </b>
        </Col>
        <Col md={12}>
          Description: {product.description}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailPage