import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';


function Product({product}) {
  return (
    <Card>
        <Card.Img variant="top" style={{height:"200px"}} src={product.image_url} />
        <Card.Body>
            <Card.Title>
              <NavLink to={`/product/${product._id}`}>{product.name}</NavLink>
            </Card.Title>
            <Card.Text>
            {product.description}
            </Card.Text>
            <Button variant="primary">Add to Cart</Button>
        </Card.Body>
    </Card>
  )
}

export default Product