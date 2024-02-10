import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCartContext } from "../contexts/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import axios from "axios";
import OrderSummaryComponent from "../components/CartPageComponents/OrderSummaryComponent";

function CartPage() {
  let { products, addProduct, removeProduct } = useCartContext();
  const navigate = useNavigate()

  
  const checkout_payment = async () => {
  
    const payload = {
      "cart_items" : products.map(p => ({
        'product_id' : p._id,
        'quantity' : p.quantity,
        'name' : p.name,
      }))
    }

    console.log(payload)


    let response = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/payment/createPaymentIntent`,
      headers: { 
        'token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data : payload
    })
  
     navigate(`/checkout/${response.data.data.payment_intent_response.client_secret}`)
  }

  let CartProduct = (product) => {
    return (
      <Container fluid className="px-0 my-2">
        <Row>
          <Col md={2}>
            <img
              width="100%"
              height="100%"
              src={product.image_url}
              alt={product.image}
            />
          </Col>
          <Col md={9}>
            <h5><NavLink to={`/product/${product._id}`}>{product.name}</NavLink></h5>
            <p>{product.description}</p>
            <Button
              variant="danger"
              id="button-addon2"
              onClick={() => removeProduct(product)}
            >
              -
            </Button>
            <span className="mx-4">{product.quantity}</span>
            <Button
              variant="primary"
              id="button-addon2"
              onClick={() => addProduct(product)}
            >
              +
            </Button>
          </Col>
          <Col md={1}>
            <h5>{product.price} $</h5>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container className="mt-3" fluid>
      {products.length ? (
        <Container fluid>
          <Row>
            <Col md={9}>
                <h4>Shopping Cart ({products.length} items)</h4>
                {products.map((product) => {
                    return (
                    <Row>
                        <Col>{CartProduct(product)}</Col>
                    </Row>
                    );
                })}
            </Col>
            <Col>
                <OrderSummaryComponent products={products}/>
                <Button className="w-100" onClick={() => checkout_payment()}>CheckOut</Button>
            </Col>
          </Row>

        </Container>
      ) : (
        <h4>Currently no product is present in the Cart</h4>
      )}
    </Container>
  );
}

export default CartPage;
