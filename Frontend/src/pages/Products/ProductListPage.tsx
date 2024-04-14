import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../../components/ProductList";

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="font-sans">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
