import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { Col, Container, Row, Badge, Button } from "react-bootstrap";
import { useCartContext } from "../store/CartContext";

function ProductDetailPage() {
  const {storeProducts,
    addProduct,
    removeProduct} = useCartContext()

  const { productId } = useParams();
  const {
    loading: productsApiLoading,
    data: productsApidata,
    error: productsApiError,
  } = useApi(
    "GET",
    `http://localhost:8000/api/product/read?page=1&product_id=${productId}`
  );

  const [product, setProduct] = useState("");

  let storeProduct = product

  const storeProductIndex = storeProducts.findIndex(sp => sp._id === product?._id)

  if(storeProductIndex!==-1) {
    storeProduct = storeProducts[storeProductIndex]
  }

  useEffect(() => {
    setProduct(productsApidata?.data?.products[0]);
  }, [productsApiLoading]);

  return (
    <Container fluid>
      {product ? (
        <>
        <Row>
          <Col>
            <h4 align="center">Product Detail</h4>
            <h4>{product.name}</h4>
            <img src={product.image_url} height="400px" />
            <div className="mt-2">
              <b>Category: </b>{" "}
              <Badge bg="secondary">{product.category_id.name}</Badge>
            </div>
            <div className="mt-2">
              <b>Price:</b> {product.price}$
            </div>
            <div className="mt-2">
              <b>Description:</b> {product.description}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-md-2 mt-2">
          {!storeProduct.quantity ? (<Button variant="primary" onClick={() => addProduct(product)} className="w-100">Add to Cart</Button>) : (
          <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={() => removeProduct(product)}>-</Button>
          <span>{storeProduct.quantity}</span>
          <Button variant="primary" onClick={() => addProduct(product)}>+</Button>
        </div>
        )}
          </Col>
        </Row>
        </>
      ) : (
        <Row>loading....</Row>
      )}
    </Container>
  );
}

export default ProductDetailPage;
