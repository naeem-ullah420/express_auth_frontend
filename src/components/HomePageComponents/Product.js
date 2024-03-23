import React from "react";
import { Badge, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../../store/CartContext";

function Product({ product }) {
  const {storeProducts,
    addProduct,
    removeProduct} = useCartContext()

  let storeProduct = product
  
  const storeProductIndex = storeProducts.findIndex(sp => sp._id === product._id)

  if(storeProductIndex!==-1) {
    storeProduct = storeProducts[storeProductIndex]
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
          <NavLink to={`/product/${product._id}`}>{storeProduct.name}</NavLink>
        </Card.Title>
        <Card.Text>
          <div>
            <b>Category: </b> <Badge bg="secondary">{storeProduct.category_id.name}</Badge>
          </div>
          <div>
            <b>Price:</b> {storeProduct.price}$
          </div>
          <div>
            <b>Description:</b> {storeProduct.description}
          </div>
        </Card.Text>
        {!storeProduct.quantity ? (<Button variant="primary" onClick={() => addProduct(product)} className="w-100">Add to Cart</Button>) : (
          <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={() => removeProduct(product)}>-</Button>
          <span>{storeProduct.quantity}</span>
          <Button variant="primary" onClick={() => addProduct(product)}>+</Button>
        </div>
        )}
        
        
      </Card.Body>
    </Card>
  );
}

export default Product;
