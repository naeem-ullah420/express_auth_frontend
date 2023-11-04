import React from 'react'
import { useParams } from 'react-router'

function ProductDetailPage() {
  const {productId} = useParams()
  return (
    <div>ProductDetailPage {productId}</div>
  )
}

export default ProductDetailPage