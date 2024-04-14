import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice/authSlice";

function Hero() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to add a product");
      return;
    }

    if (!productName || !description || !price || !imageFile) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (imageFile) {
      const imageData = new FormData();
      imageData.append("file", imageFile);
      imageData.append("upload_preset", "Ecommerce_product");
      imageData.append("cloud_name", "nithin7176");

      try {
        // Upload image to Cloudinary
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/nithin7176/image/upload",
          imageData
        );
        const imageUrl = cloudinaryResponse.data.url;

        const productData = {
          productName,
          description,
          price,
          featured,
          imageUrl,
        };

        await axiosInstance.post("/products", productData);

        setProductName("");
        setDescription("");
        setPrice("");
        setImageFile(null);
        setFeatured(false);

        setIsModalOpen(false);

        toast.success("Product added successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Please select an image!");
    }
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to Our Ecommerce Store
            </h1>

            <p className="mb-5">
              Don't miss out on exclusive deals and discounts. Sign up now to
              stay updated on the latest offers and promotions.
            </p>
            <button
              className="btn btn-neutral"
              onClick={() =>
                user
                  ? setIsModalOpen(true)
                  : toast.error("Please login to add products")
              }
            >
              {" "}
              Add Products
            </button>
            
          </div>
        </div>
        <dialog
          id="my_modal_3"
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
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-base font-medium text-[#07074D]">
                  Product Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name"
                  required
                  className="w-full mb-2 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-2">
                <label className="block text-base font-medium text-[#07074D]">
                  Price
                </label>
                <input
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label className="block text-base font-medium text-[#07074D]">
                  Description
                </label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Product Image
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                    }
                  }}
                  accept="image/*"
                />
              </div>
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  Featured
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Hero;
