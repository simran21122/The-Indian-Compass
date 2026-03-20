import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/Context";
import {
  Heart,
  ShoppingCart,
  MapPin,
  Star,
  Users,
  Verified,
  IndianRupee,
  Truck,
  Shield,
} from "lucide-react";

 // ✅ IMPORTANT

const badgeColors = {
  authentic: "bg-green-100 text-green-800",
  handmade: "bg-blue-100 text-blue-800",
  featured: "bg-purple-100 text-purple-800",
  bestseller: "bg-orange-100 text-orange-800",
  eco_friendly: "bg-emerald-100 text-emerald-800",
};

function ProductCard({
  product,
  artist,
  index,
}) {

  const navigate = useNavigate();

  // ✅ USE GLOBAL CONTEXT
  const { cart, wishlist, toggleCart, toggleWishlist } = useStore();

  // ✅ FIXED LOGIC (ARRAY)
  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate("/buynow", {
      state: { product },
    });
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >

      <div
        onClick={handleClick}
        className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer"
      >

        {/* IMAGE */}
        <div className="relative">

          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover"
          />

          {/* ❤️ WISHLIST */}
          <button
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
              isInWishlist ? "bg-red-500" : "bg-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product); // ✅ FULL PRODUCT
            }}
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist
                  ? "text-white fill-white"
                  : "text-gray-600"
              }`}
            />
          </button>

          {/* BADGES */}
          {product.badges?.length > 0 && (
            <div className="absolute top-3 left-3 flex gap-1">
              {product.badges.slice(0, 2).map((b, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded ${
                    badgeColors[b] || "bg-gray-100"
                  }`}
                >
                  {b.replace("_", " ")}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* CONTENT */}
        <div className="p-4">

          <h3 className="font-semibold text-orange-600">
            {product.name}
          </h3>

          {/* STATE + RATING */}
          <div className="flex justify-between text-sm text-black mt-1">

            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {product.state}
            </div>

            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 mr-1" />
              {product.rating}
            </div>

          </div>

          {/* ARTIST */}
          {artist && (
            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded mt-3">
              <Users className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-500">
                {artist.name}
              </span>
              {artist.verified && (
                <Verified className="w-3 h-3 text-blue-500" />
              )}
            </div>
          )}

          {/* PRICE */}
          <div className="flex items-center mt-4 text-green-600">
            <IndianRupee className="w-4 h-4" />
            <span className="font-bold">
              {product.price}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 mt-4">

            {/* 🛒 CART */}
            <button
              className="flex-1 bg-blue-600 text-white py-2 rounded"
              onClick={(e) => {
                e.stopPropagation();
                toggleCart(product); // ✅ FULL PRODUCT
              }}
            >
              <ShoppingCart className="w-4 h-4 inline mr-1" />
              {isInCart ? "Added" : "Cart"}
            </button>

            {/* BUY NOW */}
            <button
              className="flex-1 bg-orange-600 text-white py-2 rounded"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

          </div>

          {/* SHIPPING */}
          <div className="flex justify-between text-xs text-gray-500 mt-3">

            <div className="flex items-center">
              <Truck className="w-3 h-3 mr-1" />
              {product.shipping_time}
            </div>

            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Authentic
            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );
}

export default ProductCard;