import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/Context";

function Cart() {

  const navigate = useNavigate();
  const { cart, toggleCart } = useStore();

  // ✅ selected IDs only (simpler)
  const [selectedIds, setSelectedIds] = useState([]);

  // ✅ toggle checkbox
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ✅ selected products
  const selectedItems = cart.filter((item) =>
    selectedIds.includes(item.id)
  );

  const totalAmount = selectedItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#e8d5b5] p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        My Cart
      </h1>

      {cart.length === 0 ? (

        <div className="bg-white p-10 rounded-lg shadow text-center">
          <h2 className="text-xl text-gray-700">
            Your cart is empty 😔
          </h2>

          <button
            onClick={() => navigate("/marketplace")}
            className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg"
          >
            Shop Now
          </button>
        </div>

      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="md:col-span-2 space-y-4">

            {cart.map((item) => {

              const isChecked = selectedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow flex gap-4 items-center"
                >

                  {/* ✅ CHECKBOX */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSelect(item.id)}
                  />

                  {/* IMAGE */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="w-24 h-24 object-cover rounded cursor-pointer"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">

                    <h2
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="font-semibold text-gray-800 cursor-pointer hover:underline"
                    >
                      {item.name}
                    </h2>

                    <p className="text-green-600 font-bold mt-1">
                      ₹ {item.price}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.state}
                    </p>

                    <button
                      onClick={() => toggleCart(item)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white p-6 rounded-lg shadow h-fit">

            <h2 className="font-bold text-lg mb-4 text-gray-800">
              Price Details
            </h2>

            <div className="flex justify-between text-gray-700">
              <span>Price ({selectedItems.length})</span>
              <span>₹ {totalAmount}</span>
            </div>

            <div className="flex justify-between mt-2 text-gray-700">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-gray-900">
              <span>Total</span>
              <span>₹ {totalAmount}</span>
            </div>

            {/* ✅ PLACE ORDER */}
            <button
              disabled={selectedItems.length === 0}
              onClick={() =>
                navigate("/BuyNow", {
                  state: { items: selectedItems },
                })
              }
              className={`w-full mt-6 py-3 rounded-lg ${
                selectedItems.length === 0
                  ? "bg-gray-400"
                  : "bg-orange-600 hover:bg-orange-700"
              } text-white`}
            >
              Place Order
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;