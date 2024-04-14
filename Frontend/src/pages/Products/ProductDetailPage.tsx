import React from "react"
import ProductDetail from "../../components/ProductDetail"
import { useParams } from "react-router-dom";


function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <ProductDetail productId={id ?? ""}/>
    </div>
  )
}

export default ProductDetailPage
