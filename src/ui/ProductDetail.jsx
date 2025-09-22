import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart, IndianRupee } from "lucide-react";

// Import products and artists data
import productsData from "../data/products.json";
import artistsData from "../data/artists.json";

// Import all product images manually
import p1 from "../image/Productimg/p1.png";
import p2 from "../image/productimg/p2.png";
import p3 from "../image/productimg/p3.jpg";
import p4 from "../image/productimg/p4.png";
import p5 from "../image/productimg/p5.jpg";
import p6 from "../image/productimg/p6.png";
import p7 from "../image/productimg/p7.jpg";
import p8 from "../image/productimg/p8.jpg";
import p9 from "../image/productimg/p9.jpg";
import p10 from "../image/productimg/p10.jpg";
import p11 from "../image/productimg/p11.jpg";
import p12 from "../image/productimg/p12.png";

// Map product id → image
const productImages = {
  1: p1,
  2: p2,
  3: p3,
  4: p4,
  5: p5,
  6: p6,
  7: p7,
  8: p8,
  9: p9,
  10: p10,
  11: p11,
  12: p12,
};

function ProductDetail({ toggleWishlist, toggleCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get product either from state (fast) or fallback to JSON (direct access)
  const stateProduct = location.state?.product;
  const product =
    stateProduct || productsData.find((p) => p.id === parseInt(id));

  const artist = artistsData.find((a) => a.id === product?.artist_id);

  const wishlist = location.state?.wishlist || new Set();
  const cart = location.state?.cart || new Set();

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const isInWishlist = wishlist.has(product.id);
  const isInCart = cart.has(product.id);

  return (
    <div className="min-h-screen bg-[#f4e1c1] p-6 md:p-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={productImages[product.id]}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-green-600 font-bold text-xl">
                <IndianRupee className="w-5 h-5" />{" "}
                {product.price.toLocaleString()}
              </div>
              <button
                className={`px-4 py-2 rounded text-white ${
                  isInCart ? "bg-gray-400" : "bg-blue-600"
                }`}
                onClick={() => toggleCart?.(product)}
              >
                <ShoppingCart className="w-4 h-4 inline mr-1" />{" "}
                {isInCart ? "Added" : "Add to Cart"}
              </button>
              <button className="px-4 py-2 rounded text-white bg-gradient-to-r from-orange-500 to-orange-600">
                Buy Now
              </button>
            </div>

            <button
              className={`px-3 py-1 rounded-full mb-4 ${
                isInWishlist ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => toggleWishlist?.(product)}
            >
              <Heart className="w-4 h-4 inline mr-1" />{" "}
              {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
            </button>

            {artist && (
              <div className="p-4 bg-gray-200 rounded mb-4">
                <p className="font-medium">Artist: {artist.name}</p>
                <p className="text-sm text-gray-600">{artist.bio}</p>
              </div>
            )}

            <div className="p-4 bg-gray-100 rounded">
              <h2 className="font-semibold mb-2">Product History</h2>
              <p className="text-gray-700 text-sm">
                {product.history ||
                  "No detailed history available for this craft."}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Shipping Time: {product.shipping_time}
              </p>
              <p className="mt-1 text-sm text-yellow-600">
                ⭐ {product.rating} ({product.total_reviews} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
