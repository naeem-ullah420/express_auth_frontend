import React, { useContext, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { CartContext, useCartContext } from "../../contexts/CartContext";

function Product({ product }) {

  // const [quantity, setQuantity] = useState(0);
  // const [selectedProduct, setSelectedProduct] = useState(null)

  const {
    products,
    addProduct,
    removeProduct
  } = useCartContext()

  let storeProductIndex = products.findIndex(p => p._id === product._id)

  let storeProduct = product

  console.log("storeProductIndex: ",storeProductIndex)
  if(storeProductIndex !== -1) {
    console.log("storeProduct: ", storeProduct)
    storeProduct = products[storeProductIndex]
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        style={{ height: "200px" }}
        src={storeProduct.image_url}
      />
      <Card.Body>
        <Card.Title>
          <NavLink to={`/product/${storeProduct._id}`}>{storeProduct.name}</NavLink>
        </Card.Title>
        <Card.Text>
          <div>
            <b>Category: </b> <Badge bg="secondary">{storeProduct.category_id.name}</Badge>
          </div>
          <div>
            <b>Price: </b> {storeProduct.price}$
          </div>
          <div>
            <b>Description: </b>{storeProduct.description}
          </div>
        </Card.Text>
        {!storeProduct.quantity && <Button variant="primary" className="w-100" onClick={() => addProduct(product)}>Add to Cart</Button>}
        {storeProduct.quantity >= 1 && <Container className="d-flex justify-content-between align-items-center">
          <Button variant="danger" id="button-addon2" onClick={() => removeProduct(product)}>
            -
          </Button>
          <p>
            {storeProduct.quantity}
          </p>
          <Button variant="primary" id="button-addon2" onClick={() => addProduct(product)}>
            +
          </Button>
        </Container>}
      </Card.Body>
    </Card>
  );
}

export default Product;
