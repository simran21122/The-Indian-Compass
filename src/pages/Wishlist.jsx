import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/Context"; // ✅ IMPORTANT

function Wishlist() {

  const navigate = useNavigate();

  // ✅ Get global state
  const { wishlist, toggleWishlist, toggleCart } = useStore();

  return (
  <div className="min-h-screen bg-[#f4e1c1] p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (

        <div className="bg-white p-10 rounded-lg shadow text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            Your wishlist is empty 💔
          </h2>

          <p className="text-gray-500 mt-2">
            Save items you like to see them here
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg"
          >
            Explore Products
          </button>

        </div>

      ) : (

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {wishlist.map((item) => (

            <div
              key={item.id}
             className="bg-white/90 backdrop-blur p-4 rounded-lg shadow hover:shadow-lg transition"
            >

              {/* IMAGE */}
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />

              {/* DETAILS */}
              <h2 className="font-semibold mt-3 text-gray-800">
                {item.name}
              </h2>

              <p className="text-green-600 font-bold mt-1">
                ₹ {item.price}
              </p>

              <p className="text-sm text-gray-500">
                {item.state}
              </p>

              <div className="flex gap-2 mt-4">

                {/* MOVE TO CART */}
                <button
                  onClick={() => toggleCart(item)}
                  className="flex-1 bg-orange-600 text-white py-2 rounded"
                >
                  Move to Cart
                </button>

                {/* REMOVE */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className="flex-1 border border-red-500 text-red-500 py-2 rounded"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;