import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useCartContext } from "../store/CartContext";

function CartPage() {
  let { storeProducts, addProduct, removeProduct } = useCartContext();
  let cartProduct = (product) => {
    return (
      <Row className="my-2">
        <Col md={2}>
          <img width="100%" height="100px" src={product.image_url} />
        </Col>
        <Col md={8}>
          <div>
            <b>{product.name}</b>
          </div>
          <div className="my-2">{product.description}</div>
          <Button variant="danger" onClick={() => removeProduct(product)}>
            -
          </Button>
          <span className="mx-4">{product.quantity}</span>
          <Button variant="primary" onClick={() => addProduct(product)}>
            +
          </Button>
        </Col>
        <Col md={2}>
          <b>{product.price}$</b>
        </Col>
      </Row>
    );
  };

  let getTotal = () => {
    return storeProducts.reduce((oldValue, newValue) => {
      return oldValue + newValue.price * newValue.quantity;
    }, 0);
  };

  return (
    <>
      {storeProducts.length ? (
        <Container fluid className="mt-4">
          <Row>
            <Col md={9}>
              <h4> Shopping Cart ({storeProducts.length} items) </h4>
              {/* Cart Product */}
              {storeProducts.map((product) => {
                return cartProduct(product);
              })}
            </Col>
            <Col md={3}>
              <h4>Order Summary</h4>
              <div style={{ background: "#f1f1f1" }} className="p-2">
                <p>3 products</p>
                <table width="100%">
                  <thead>
                    <tr style={{ borderBottom: "1px solid black" }}>
                      <th>Product(s)</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <tr>
                    <td>(Clothing 2) x 1</td>
                    <td>40$</td>
                  </tr> */}
                    {storeProducts.map((product) => {
                      return (
                        <tr>
                          <td>
                            ({product.name}) x {product.quantity}
                          </td>
                          <td>{product.price * product.quantity}$</td>
                        </tr>
                      );
                    })}
                    <tr style={{ borderTop: "1px solid black" }}>
                      <td>
                        <b>Total</b>
                      </td>
                      <td>
                        <b>{getTotal()}$</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button variant="primary" className="w-100">
                Checkout
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <h4 className="mt-4" align="center">Currently, your cart is empty</h4>
      )}
    </>
  );
}

export default CartPage;
