// AddToCart.tsx

import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../features/userSlice/authSlice";
import axiosInstance from "../../services/axiosInstance";

interface AddToCartProps {
  productId: string;
}

function AddToCart({ productId }: AddToCartProps) {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const addToCart = async (productId: string, token: string | null) => {
    try {
      if (!user) {
        toast.error("Please log in to add the product to your cart.");
        return;
      }

      await axiosInstance.post(`/cart/add`, {
        productId: productId,
        quantity: 1,
      });
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again later.");
    }
  };

  return (
    <button
      onClick={() => addToCart(productId, token)}
      className="btn btn-outline btn-warning"
    >
      Add to Cart
      <AddShoppingCartIcon />
    </button>
  );
}

export default AddToCart;
