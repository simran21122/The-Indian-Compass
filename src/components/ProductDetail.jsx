import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  Star,
  MapPin,
  Package,
  Tag,
  ChevronLeft,
  ChevronRight,
  Zap,
  BadgeCheck,
} from "lucide-react";
import productDetails from "../data/productDetails.json";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productDetails.find((p) => p.id === parseInt(id));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const images = product ? product.images : [];

  if (!product)
    return (
      <div className="min-h-screen bg-[#f4e1c1] flex items-center justify-center">
        <p className="text-xl text-[#ad4146] font-semibold">Product not found!</p>
      </div>
    );

  const handleBuyNow = () => {

  const productForCheckout = {
    ...product,
    image_url: product.images?.[0] || product.image_url || ""
  };

  navigate("/buynow", {
    state: { product: productForCheckout }
  });

};

  const avgRating =
    product.reviews.length > 0
      ? (
        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      ).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-[#fdf6ee]">
      {/* Breadcrumb */}
      <div className="px-4 py-2 flex items-center gap-2 text-sm text-[#8b5e3c]">
        <span className="hover:text-[#e67530] cursor-pointer" onClick={() => navigate("/marketplace")}>
          Marketplace
        </span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-[#e67530] cursor-pointer">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#ad4146] font-medium">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="px-2">
        <div className="bg-white rounded-xl shadow-sm border border-[#f0dcc4] grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* LEFT COLUMN - Images + Action Buttons + Extra Info */}
          <div className="lg:col-span-2 p-4 lg:border-r border-[#f0dcc4]">
            {/* Image Section */}
            <div className="flex flex-col gap-3">
              {/* Main Image */}
              <div className="relative bg-[#fdf6ee] rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[selectedImageIndex]}
                    src={images[selectedImageIndex] || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-[350px] lg:h-[450px] object-cover rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Wishlist */}
                <button
                  onClick={() => setSaved(!saved)}
                  className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${saved
                    ? "bg-[#ad4146] text-white"
                    : "bg-white/90 text-[#8b5e3c] hover:text-[#ad4146]"
                    }`}
                >
                  <Heart
                    className={`w-5 h-5 ${saved ? "fill-white" : ""}`}
                  />
                </button>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-[#e67530] text-white text-xs px-3 py-1 rounded-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Slide Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#2c0d01]" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-[#2c0d01]" />
                    </button>
                  </>
                )}

                {/* Dot Indicators + Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === selectedImageIndex
                          ? "bg-white w-4"
                          : "bg-white/50 hover:bg-white/80"
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Horizontal Scrollable Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg cursor-pointer border-2 overflow-hidden transition-all ${idx === selectedImageIndex
                      ? "border-[#e67530] shadow-md scale-105"
                      : "border-[#f0dcc4] hover:border-[#d4956b]"
                      }`}
                    onClick={() => setSelectedImageIndex(idx)}
                    whileHover={{ scale: 1.08 }}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsInCart(!isInCart)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-lg shadow-md transition-all ${isInCart
                  ? "bg-[#f0dcc4] text-[#8b5e3c] border-2 border-[#d4956b]"
                  : "bg-[#e67530] text-white hover:bg-[#d4650a]"
                  }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isInCart ? "ADDED TO CART" : "ADD TO CART"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ad4146] text-white py-4 rounded-lg font-bold text-lg shadow-md hover:bg-[#943840] transition-all"
              >
                <Zap className="w-5 h-5" />
                BUY NOW
              </motion.button>
            </div>

            {/* Delivery & Authenticity - below buttons */}
            <div className="mt-5 bg-[#fdf6ee] rounded-xl border border-[#f0dcc4] p-4 space-y-4">
              <h4 className="font-bold text-[#2c0d01] text-sm">Delivery & Services</h4>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#e67530] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#2c0d01]">
                    {product.shipping_time || "5-7 days"} Delivery
                  </p>
                  <p className="text-xs text-[#8b5e3c]">Free shipping on this item</p>
                </div>
              </div>
              <hr className="border-[#f0dcc4]" />
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#e67530] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#2c0d01]">100% Authentic</p>
                  <p className="text-xs text-[#8b5e3c]">Verified artisan craftsmanship</p>
                </div>
              </div>
              <hr className="border-[#f0dcc4]" />
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-5 h-5 text-[#e67530] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#2c0d01]">Quality Assured</p>
                  <p className="text-xs text-[#8b5e3c]">Handpicked & inspected before dispatch</p>
                </div>
              </div>
            </div>

            {/* Artisan Promise */}
            <div className="mt-4 bg-gradient-to-br from-[#f4e1c1] to-[#fdf6ee] rounded-xl border border-[#e6cfa8] p-4">
              <h4 className="font-bold text-[#2c0d01] text-sm mb-2">🪷 The Indian Compass Promise</h4>
              <p className="text-xs text-[#5a3825] leading-relaxed">
                Every product is sourced directly from skilled artisans across India. Your purchase supports their livelihood and helps preserve centuries-old craft traditions.
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-xs text-[#8b5e3c]">
                  <MapPin className="w-3 h-3 text-[#e67530]" />
                  {product.origin}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#8b5e3c]">
                  <Package className="w-3 h-3 text-[#e67530]" />
                  Handcrafted
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Product Info */}
          <div className="lg:col-span-3 p-6 lg:p-8">
            {/* Product Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-[#8b5e3c] mb-1">{product.category}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#2c0d01]">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1 bg-[#e67530] text-white text-sm font-bold px-2.5 py-1 rounded-md">
                  {avgRating}
                  <Star className="w-3.5 h-3.5 fill-white" />
                </span>
                <span className="text-[#8b5e3c] text-sm">
                  {product.reviews.length} Review{product.reviews.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#2c0d01]">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-[#8b5e3c]">{product.currency}</span>
              </div>
            </motion.div>

            <hr className="my-5 border-[#f0dcc4]" />

            {/* Available Offers */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="font-bold text-[#2c0d01] mb-3">Available Offers</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#e67530] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#5a3825]">
                    <span className="font-semibold">Special Price:</span> Get extra 10% off on orders above ₹1000
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#e67530] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#5a3825]">
                    <span className="font-semibold">Free Delivery:</span> On all authentic handicraft items
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Tag className="w-4 h-4 text-[#e67530] mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-[#5a3825]">
                    <span className="font-semibold">Partner Offer:</span> Support local artisans with every purchase
                  </p>
                </div>
              </div>
            </motion.div>

            <hr className="my-5 border-[#f0dcc4]" />

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h3 className="font-bold text-[#2c0d01] mb-3">Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-[#fdf6ee] p-3 rounded-lg">
                  <MapPin className="w-4 h-4 text-[#e67530] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#8b5e3c]">Origin</p>
                    <p className="text-sm font-semibold text-[#2c0d01]">{product.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#fdf6ee] p-3 rounded-lg">
                  <Package className="w-4 h-4 text-[#e67530] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#8b5e3c]">Dimensions</p>
                    <p className="text-sm font-semibold text-[#2c0d01]">{product.dimensions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#fdf6ee] p-3 rounded-lg">
                  <Package className="w-4 h-4 text-[#e67530] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#8b5e3c]">Weight</p>
                    <p className="text-sm font-semibold text-[#2c0d01]">{product.weight}</p>
                  </div>
                </div>
                {product.inStock !== undefined && (
                  <div className="flex items-center gap-3 bg-[#fdf6ee] p-3 rounded-lg">
                    <BadgeCheck className="w-4 h-4 text-[#e67530] flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#8b5e3c]">Availability</p>
                      <p className={`text-sm font-semibold ${product.inStock ? "text-[#e67530]" : "text-[#ad4146]"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <hr className="my-5 border-[#f0dcc4]" />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="font-bold text-[#2c0d01] mb-3">Description</h3>
              <p className="text-sm text-[#5a3825] leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            {/* Materials & Craft */}
            {product.materials && product.materials.length > 0 && (
              <>
                <hr className="my-5 border-[#f0dcc4]" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <h3 className="font-bold text-[#2c0d01] mb-3">Materials & Craft</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f4e1c1] text-[#8b5e3c] text-sm px-4 py-2 rounded-full font-medium border border-[#e6cfa8]"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            <hr className="my-5 border-[#f0dcc4]" />


            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#2c0d01]">
                  Ratings & Reviews
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#2c0d01]">{avgRating}</span>
                  <Star className="w-5 h-5 text-[#e67530] fill-[#e67530]" />
                </div>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-hide">
                {product.reviews.map((review, idx) => (
                  <motion.div
                    key={idx}
                    className="p-4 bg-[#fdf6ee] rounded-lg border border-[#f0dcc4]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#e67530] flex items-center justify-center text-white text-sm font-bold">
                          {review.user.charAt(0)}
                        </div>
                        <span className="font-semibold text-[#2c0d01]">{review.user}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-[#e67530] text-white text-xs font-bold px-2 py-0.5 rounded-md">
                        {review.rating}
                        <Star className="w-3 h-3 fill-white" />
                      </span>
                    </div>
                    <p className="text-sm text-[#5a3825]">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
