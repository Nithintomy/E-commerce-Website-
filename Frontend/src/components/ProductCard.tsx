import React from "react";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AddToCart from "./cart/AddToCart";
import { Product } from "../interfaces/Products";

interface ProductCardProps {
  product: Product;
}
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

function ProductCard({ product }: ProductCardProps) {
  const truncatedDescription = truncateText(product.description, 50);
  return (
    <>
      <div key={product._id} className="w-full">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="rounded-xl w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {product.productName}
              {product.featured && (
                <div className="badge badge-success">popular</div>
              )}
            </h2>
            <p className="text-gray-700 text-base mb-4">
              {truncatedDescription}
            </p>

            <div className="text-gray-900 font-bold text-lg">
              Price: {product.price} 
              <span className="text-xs text-gray-600"> /-</span>{" "}
              
            </div>
            <div className="card-actions justify-end">
              {product.featured ? (
                <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                  Featured
                </span>
              ) : (
                <span className="bg-gray-500 text-white py-1 px-2 rounded-full text-xs">
                  Regular
                </span>
              )}
            </div>
            <div className="card-actions">
              <Link to={`/product/${product._id}`} className="inline-block">
                <button className="btn btn-outline btn-success flex items-center">
                  <span>Details</span>
                  <BsEyeFill className="ml-1" />
                </button>
              </Link>

              <AddToCart productId={product._id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
