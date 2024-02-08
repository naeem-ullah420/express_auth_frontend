import React from "react";

function OrderSummaryComponent({products}) {
  const get_total = () => {
    return products.reduce((prev, curr) => {
        return prev + (curr.price * curr.quantity)
    }, 0)
  }

  return (
    <>
      <h4>Order Summary</h4>
      <div style={{ backgroundColor: "#f1f1f1" }} className="p-2">
        <h6>{products.length} products</h6>
        <table style={{ width: "100%" }}>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <td>
                    ({product.name}) x {product.quantity}
                  </td>
                  <td>{product.quantity * product.price}$</td>
                </tr>
              );
            })}
            <tr style={{ borderTop: "0.5px solid black" }}>
              <td>
                <h6>Total</h6>
              </td>
              <td>
                <h6>{get_total()}$</h6>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderSummaryComponent;
