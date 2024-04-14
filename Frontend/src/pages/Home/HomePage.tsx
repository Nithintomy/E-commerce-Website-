import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero";
import ProductCard from "../../components/ProductCard";
import { Toaster } from "react-hot-toast";
import { Product } from "../../interfaces/Products";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:5000/api/products?featured=true"
        );
        const featuredProducts = response.data.filter(
          (product) => product.featured
        );
        setFeaturedProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="font-sans">
      <Hero />
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
}

export default HomePage;
