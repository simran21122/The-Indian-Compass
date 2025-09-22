import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  toggleWishlist,
  toggleCart,
  wishlist = new Set(),
  cart = new Set(),
  index,
}) {
  const isInWishlist = wishlist.has(product.id);
  const isInCart = cart.has(product.id);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product-detail", { state: { product, artist, wishlist, cart } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        onClick={handleClick}
        className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white group cursor-pointer overflow-hidden rounded-lg"
      >
        {/* Product Image */}
        <div className="relative">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          {/* Wishlist Button */}
          <button
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
              isInWishlist ? "bg-red-500" : "bg-white/80"
            } hover:opacity-90`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist ? "text-white fill-white" : "text-gray-600"
              }`}
            />
          </button>

          {/* Badges */}
          {product.badges?.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {product.badges.slice(0, 2).map((b, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-1 rounded ${
                    badgeColors[b] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {b.replace("_", " ")}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          {/* Product Name */}
          <h3
            className="text-lg font-medium break-words text-orange-600"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Location & Rating */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {product.state}
            </div>
            {product.rating > 0 && (
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                {product.rating} ({product.total_reviews})
              </div>
            )}
          </div>

          {/* Artist Info */}
          {artist && (
            <div className="flex items-center space-x-2 mb-4 p-2 bg-gray-200 rounded-lg">
              <Users className="w-3 h-3 text-black" />
              <span className="text-xs font-medium text-black">
                {artist.name}
              </span>
              {artist.verified && (
                <Verified className="w-3 h-3 text-blue-500" />
              )}
            </div>
          )}

          {/* Price & Cart */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 text-green-600">
              <IndianRupee className="w-4 h-4" />
              <span className="font-bold">
                {product.price.toLocaleString()}
              </span>
            </div>
            <button
              className={`px-2 py-1 rounded text-white ${
                isInCart
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-blue-500 to-blue-600"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleCart(product.id);
              }}
            >
              <ShoppingCart className="w-3 h-3 inline mr-1" />{" "}
              {isInCart ? "Added" : "Add to Cart"}
            </button>
          </div>

          {/* Shipping & Authenticity */}
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Truck className="w-3 h-3 mr-1" />
              {product.shipping_time || "5-7 days"}
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
