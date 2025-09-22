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
        <div className="relative">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}

          <button
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
              isInWishlist ? "bg-red-500" : "bg-white/80"
            } hover:opacity-90`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist ? "text-white fill-white" : "text-gray-600"
              }`}
            />
          </button>

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

        <div className="p-4">
          <h3
            className="text-lg font-medium break-words text-orange-600"
            title={product.name}
          >
            {product.name}
          </h3>

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
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
