import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qrImage from "../assets/image/QrCode.jpeg";

function PaymentPage() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const { product, total, paymentMethod, customer, qty } = state || {};

  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="col-span-2 bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-4">
            Complete Payment
          </h2>

          <p className="text-gray-600 mb-4">
            Pay using {paymentMethod}
          </p>

          {/* QR */}
          <div className="flex flex-col items-center border p-6 rounded mb-6">
            <img src={qrImage} className="w-52 h-52 mb-4" />
            <p className="text-green-600 font-bold text-xl">
              ₹ {total}
            </p>
          </div>

          {/* UTR */}
          <input
            type="text"
            placeholder="Enter UTR Number"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          {/* Screenshot */}
          <input
            type="file"
            onChange={(e) => setScreenshot(e.target.files[0])}
            className="w-full border p-2 rounded mb-4"
          />

          {/* BUTTON */}
          <button
            onClick={() => {
              if (!utr || !screenshot) {
                alert("Fill all details");
                return;
              }

              navigate("/buynow", {
  state: {
    product,
    total,
    paymentMethod,
    customer,
    qty,
    utr,
    screenshot: URL.createObjectURL(screenshot),
    step: 3,   // ✅ VERY IMPORTANT
  },
});
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded w-full"
          >
            Confirm Payment
          </button>

        </div>

        {/* RIGHT SIDE (SUMMARY) */}
        <div className="bg-white p-6 rounded shadow h-fit">

          <h3 className="font-bold mb-4">Price Details</h3>

          <div className="flex justify-between mb-2">
            <span>Price</span>
            <span>₹ {product?.price * qty}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="my-3"/>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PaymentPage;