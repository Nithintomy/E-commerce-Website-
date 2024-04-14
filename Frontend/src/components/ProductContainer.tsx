// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import HomePage from "../pages/Home/HomePage";
// import ProductList from "./ProductList";
// import { Product } from "../interfaces/Products";

// function ProductContainer() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get<Product[]>("http://localhost:5000/api/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <HomePage products={products} />
//       <ProductList products={products} />
//     </div>
//   );
// }

// export default ProductContainer;
