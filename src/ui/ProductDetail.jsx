import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Truck, Shield } from "lucide-react";
import productDetails from "../data/productDetails.json"; // adjust path

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productDetails.find((p) => p.id === parseInt(id));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [saved, setSaved] = useState(false); // For Save button
  const images = product ? product.images : [];

  if (!product)
    return (
      <p className="text-center mt-20 text-xl text-red-500">Product not found!</p>
    );

  const handlePrev = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBuyNow = () => {
    navigate("/buynow", { state: { product } }); // Navigate to BuyNow page
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-12">
      {/* Left: Image Carousel */}
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[selectedImageIndex]}
            src={images[selectedImageIndex]}
            alt={product.name}
            className="w-full h-[550px] md:h-[600px] object-cover rounded-3xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Save (Heart) Button on top-right */}
        <button
          onClick={() => setSaved(!saved)}
          className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition ${
            saved ? "bg-red-500" : "bg-white"
          } hover:scale-105`}
        >
          <Heart className={`w-6 h-6 ${saved ? "text-white" : "text-gray-600"}`} />
        </button>

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              ▶
            </button>
          </>
        )}

        {/* Thumbnails */}
        <div className="flex gap-4 mt-6 overflow-x-auto">
          {images.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              className={`w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl cursor-pointer border-2 ${
                idx === selectedImageIndex
                  ? "border-blue-500 scale-110"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImageIndex(idx)}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <motion.div
        className="space-y-4 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-orange-600">{product.name}</h1>
        <p className="text-lg text-gray-600">{product.description}</p>
        <p className="text-3xl font-bold text-blue-600">
          {product.currency} {product.price.toLocaleString()}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
          <p>Origin: <span className="font-medium text-gray-700">{product.origin}</span></p>
          <p>Dimensions: <span className="font-medium text-gray-700">{product.dimensions}</span></p>
          <p>Weight: <span className="font-medium text-gray-700">{product.weight}</span></p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 sticky top-6 z-20">
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
          >
            <ShoppingCart size={24} /> Add to Cart
          </motion.button>

          {/* Buy Now Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-2xl shadow hover:bg-green-600 transition"
            onClick={handleBuyNow}
          >
            Buy Now
          </motion.button>
        </div>

        {/* Shipping & Authenticity */}
        <div className="flex gap-6 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4" /> {product.shipping_time || "5-7 days"}
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" /> Authentic
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <motion.div
                key={idx}
                className="p-4 bg-gray-50 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <p className="font-medium">{review.user}</p>
                <p className="text-yellow-500 text-lg">{"⭐".repeat(review.rating)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
