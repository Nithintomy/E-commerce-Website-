import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AddToCart from "./cart/AddToCart";
import { Product } from "../interfaces/Products";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice/authSlice";
import { DotLoader  } from 'react-spinners';

interface ProductDetailProps {
  productId: string;
}

function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [featured, setFeatured] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(response.data);
        if (response.data) {
          setProductName(response.data.productName);
          setDescription(response.data.description);
          setPrice(response.data.price.toString());
          setFeatured(response.data.featured);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const EditProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const productData = {
        productName,
        description,
        price: parseFloat(price), // Parse price to a number
        featured,
      };
      const response = await axiosInstance.put(
        `/products/${productId}`,
        productData
      );
      console.log(response, "response");
      setProduct((prevProduct) => {
        if (!prevProduct) return null;
        return {
          ...prevProduct,
          ...productData,
        };
      });
      setProductName("");
      setDescription("");
      setPrice("");
      setFeatured(false);
      setIsModalOpen(false);
      console.log("Product updated successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      toast.success("Product deleted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!product) {
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <DotLoader color="#36d7b7" size={100} />
  </div>
  }

  return (
    <section className="text-gray-600 dark:text-white body-font overflow-hidden">
      <div className="container px-5 py-12 mx-auto">
        <div className="lg:w-2/3 w-full mx-auto flex flex-wrap">
          <img
            className="lg:w-1/2 w-full  h-80 object-cover object-center rounded"
            src={product.imageUrl}
            alt={product.productName}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl font-medium mb-1">
              {product.productName}
            </h1>
           <h6 className="underline mb-3"> PRODUCT DETAILS</h6>
            <p className="leading-relaxed mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              
              <span className="font-medium text-gray-900">
                Price: ${product.price} /-
              </span>
            </div>
            <div className="flex space-x-4">
              <button
              onClick={() => user ? setIsModalOpen(true) : toast.error("Please login to edit the product.")}
                className="btn btn-outline btn-primary"
              >
                Edit Product
              </button>

              <AddToCart productId={product._id} />

              <button
                onClick={() => user ? deleteProduct() : toast.error("Please login to delete the product.")}
                className="btn btn-outline btn-error"
              >
               <AutoDeleteIcon/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog
        id="my_modal_4"
        className="modal"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="modal-box w-3/5 h-4/5 flex justify-center items-center">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>
          <form onSubmit={EditProduct} className="w-full">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product Name"
                required
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Description"
                className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="featured"
                className="mr-2"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700"
              >
                Featured
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-purple-600"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </section>
  );
}

export default ProductDetail;
