import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import emptyCartImage from "../../assets/empty-cart.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../features/userSlice/authSlice";
import { updateCartCount } from "../../features/cartSlice/cartSlice";
import axiosInstance from "../../services/axiosInstance";


function ShoppingCart() {
  const [cartItems, setCartItems] = useState<any[]>([]); // Update the type to any[]
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get("/cart");
        console.log(response, "responsess");
        dispatch(updateCartCount(response.data.length))
        setCartItems(response.data);
      
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [token]);

  const totalCost = cartItems.reduce(
    (total, item) => total + (item?.product?.price || 0) * (item?.quantity || 0), // Ensure properties are accessed safely
    0
  );

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, config);
      console.log(response.data, "deleted Successfully");
  
      dispatch(updateCartCount(response.data.length));
      setCartItems(cartItems.filter(item => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  

  const handleIncrementQuantity = async (itemId: string) => { // Add type for itemId
    try {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: (item.quantity || 0) + 1, // Ensure quantity is accessed safely
          };
        }
        return item;
      });
      
      setCartItems(updatedCartItems);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:5000/api/cart/${itemId}`,
        { quantity: (cartItems.find((item) => item._id === itemId)?.quantity || 0) + 1 },
        config
      );
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const handleDecrementQuantity = async (itemId: string) => { // Add type for itemId
    try {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === itemId && (item.quantity || 0) > 1) { // Ensure quantity is accessed safely
          return {
            ...item,
            quantity: (item.quantity || 0) - 1, // Ensure quantity is accessed safely
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:5000/api/cart/${itemId}`,
        { quantity: (cartItems.find((item) => item._id === itemId)?.quantity || 0) - 1 },
        config
      );
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };


  return (
    <div className="container mx-auto mt-10">
      {cartItems.length === 0 ? (
        <div className="text-center mb-10">
          <img src={emptyCartImage} alt="Empty Cart" className="mx-auto" />
          <p className="text-gray-500">Your shopping cart is empty</p>
          
              <Link
                to={"/products"}
                className="font-semibold text-indigo-600 text-sm mt-10"
              >
               
                Continue Shopping
              </Link>
           
        </div>
      ) : (
        <div className="sm:flex shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {cartItems?.length} Items
              </h2>
            </div>
            {cartItems.map((item, index) => ( // Add index to map function
              <div key={index} className="py-8 border-t border-gray-50"> {/* Use index as key */}
                <div className="flex items-center">
                  <div className="w-1/4 flex justify-center">
                    <img
                      src={item?.product?.imageUrl}
                      alt={item?.product?.productName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-3/4 pl-4 uppercase">
                    <p className="text-xl text-gray-800 mb-4 font-semibold">
                     Name : {item?.product?.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Price: ${item?.product?.price}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <p className="text-sm text-gray-600 mr-2">Quantity:</p>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            className="text-gray-600 px-2 py-1 focus:outline-none"
                            onClick={()=>handleDecrementQuantity(item?._id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                              ></path>
                            </svg>
                          </button>
                          <p className="px-4 py-1">{item?.quantity}</p>
                          <button
                            className="text-gray-600 px-2 py-1 focus:outline-none"
                            onClick={()=>handleIncrementQuantity(item?._id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        title="Remove from Cart"
                        onClick={()=>handleRemoveFromCart(item?._id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <span>
              <Link
                to={"/products"}
                className="flex font-semibold text-indigo-600 text-sm mt-10"
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </span>
          </div>
          <div id="summary" className="w-full sm:w-1/4 md:w-1/2 px-8 py-10">
            <h1 className="font-normal text-2xl border-b pb-8">Order Summary</h1>
            <div className="mt-10 mb-5">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-semibold text-sm uppercase">
                    Item {index + 1} 
                  </span>
                 
                  <span className="font-semibold text-sm">
                    ${(item?.product?.price || 0) * (item?.quantity || 0)} {/* Ensure properties are accessed safely */}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalCost}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
