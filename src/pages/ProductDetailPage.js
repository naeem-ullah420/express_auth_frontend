import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router'
import { ProductContext, useProduct } from '../contexts/ProductContext'

function ProductDetailPage() {
  const {productId} = useParams()
  const {products} = useProduct()

  const product = products.find((p) => p._id === productId)
  return (
    <div>ProductDetailPage {product.name}</div>
  )
}

export default ProductDetailPage