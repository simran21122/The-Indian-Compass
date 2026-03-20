import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import phonepeLogo from "../assets/image/phonepe.png";
import gpayLogo from "../assets/image/gpay.svg";
import paytmLogo from "../assets/image/paytm.png";
import amazonPayLogo from "../assets/image/amazonpay.png";
import codLogo from "../assets/image/cod.png";

import heritageBg from "../assets/image/indian-heritage-bg.png";

const payments = [
  { name: "PhonePe", logo: phonepeLogo },
  { name: "GPay", logo: gpayLogo },
  { name: "Paytm", logo: paytmLogo },
  { name: "Amazon Pay", logo: amazonPayLogo },
  { name: "Cash on Delivery", logo: codLogo },
];

function BuyNow() {

  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-black text-xl">
        No product selected
      </div>
    );
  }

  const total = product.price * qty;

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  /* DELIVERY DATES */

  const orderDate = new Date();

  const shippedDate = new Date(orderDate);
  shippedDate.setDate(orderDate.getDate() + 2);

  const outForDeliveryDate = new Date(orderDate);
  outForDeliveryDate.setDate(orderDate.getDate() + 4);

  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 5);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  /* PLACE ORDER */

  const placeOrder = () => {

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    const order = {
      id: Date.now(),
      product,
      qty,
      total,
      date: orderDate.toISOString(),
      shippedDate: shippedDate.toISOString(),
      outForDeliveryDate: outForDeliveryDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      paymentMethod,
      customer
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(order);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setOrderSuccess(true);
  };

  /* SUCCESS PAGE */

  if (orderSuccess) {

    return (
<div className="min-h-screen flex items-center justify-center bg-[#e8d5b5] relative">

  {/* soft overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>

  <motion.div
    initial={{ scale: 0.85, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="relative bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md w-full text-black"
  >

    {/* 🎉 ICON */}
    <div className="text-6xl mb-3 animate-bounce">🎉</div>

    {/* TITLE */}
    <h2 className="text-3xl font-bold text-green-600 mb-2">
      Order Confirmed!
    </h2>

    <p className="text-gray-600 mb-6">
      Arriving by <b>{formatDate(deliveryDate)}</b>
    </p>

    {/* 🔥 PRODUCT CARD (IMPROVED) */}
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-5 rounded-2xl shadow-inner text-left mb-6 border border-orange-200">

      <div className="flex items-center gap-4">

        <img
          src={product.image_url || "/placeholder.png"}
          className="w-16 h-16 rounded-lg object-cover shadow"
        />

        <div>
          <p className="font-semibold text-gray-800">
            {product.name}
          </p>

          <p className="text-sm text-gray-500">
            Qty: {qty}
          </p>
        </div>

      </div>

      {/* PRICE HIGHLIGHT */}
      <div className="mt-4 flex justify-between items-center">

        <span className="text-gray-600">Total Paid</span>

        <span className="text-xl font-bold text-green-600">
          ₹ {total}
        </span>

      </div>

    </div>

    {/* 🔘 BUTTONS */}
    <div className="flex flex-col gap-3">

      <button
        onClick={() => setShowOrderDetails(!showOrderDetails)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow"
      >
        View Order Details
      </button>

      <button
        onClick={() => navigate("/marketplace")}
        className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl shadow"
      >
        Continue Shopping
      </button>

      <button
        onClick={() => navigate("/myorders")}
        className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl shadow"
      >
        My Orders
      </button>

    </div>

    {/* 🔽 DETAILS EXPAND */}
    {showOrderDetails && (

      <div className="mt-6 p-5 border rounded-xl bg-gray-50">

  <h3 className="font-bold mb-6 text-center">
    Delivery Timeline
  </h3>

  {/* LABELS */}
  <div className="flex justify-between text-xs text-gray-600 mb-2">
    <span>Placed</span>
    <span>Shipped</span>
    <span>Out</span>
    <span>Delivered</span>
  </div>

  {/* PROGRESS BAR */}
  <div className="flex items-center">

    {/* STEP 1 */}
    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
    <div className="flex-1 h-1 bg-green-600"></div>

    {/* STEP 2 */}
    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
    <div className="flex-1 h-1 bg-yellow-500"></div>

    {/* STEP 3 */}
    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
    <div className="flex-1 h-1 bg-gray-300"></div>

    {/* STEP 4 */}
    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>

  </div>

  {/* DATES */}
  <div className="flex justify-between text-xs mt-3 text-gray-500">
    <span>{formatDate(orderDate)}</span>
    <span>{formatDate(shippedDate)}</span>
    <span>{formatDate(outForDeliveryDate)}</span>
    <span>{formatDate(deliveryDate)}</span>
  </div>

</div>

    )}

  </motion.div>

</div>
    

    );
  }

  /* CHECKOUT PAGE */
  if (showScanner) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e8d5b5]">

      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">

        <h2 className="text-2xl font-bold mb-4">
          Scan & Pay ({paymentMethod})
        </h2>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=mahesh@upi&pn=Mahesh&am=${total}`}
          alt="QR Code"
          className="mx-auto mb-4"
        />

        <p className="text-gray-600 mb-4">
          Scan this QR using {paymentMethod}
        </p>

        <button
          onClick={() => {
            setShowScanner(false);
            setStep(3);
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          I Have Paid
        </button>

      </div>

    </div>
  );
}

  return (

    

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-10"
      style={{ backgroundImage: `url(${heritageBg})` }}
    >

      <div className="absolute inset-0 bg-white/40"></div>

      <motion.div
        className="relative grid lg:grid-cols-3 gap-8 max-w-6xl w-full bg-white p-10 rounded-2xl shadow-xl text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* LEFT SIDE */}

        <div className="lg:col-span-2">

          <div className="flex justify-between mb-8 font-semibold">

            <span className={step === 1 ? "text-orange-700" : ""}>1 Address</span>
            <span className={step === 2 ? "text-orange-700" : ""}>2 Payment</span>
            <span className={step === 3 ? "text-orange-700" : ""}>3 Review</span>

          </div>

          {/* ADDRESS */}

          {step === 1 && (

            <div className="space-y-4">

              <h2 className="text-2xl font-bold">Delivery Address</h2>

              <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-3 rounded"/>
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full border p-3 rounded"/>
              <input name="address" placeholder="Address" onChange={handleChange} className="w-full border p-3 rounded"/>

              <div className="grid grid-cols-2 gap-4">
                <input name="city" placeholder="City" onChange={handleChange} className="border p-3 rounded"/>
                <input name="state" placeholder="State" onChange={handleChange} className="border p-3 rounded"/>
              </div>

              <input name="pin" placeholder="Pincode" onChange={handleChange} className="w-full border p-3 rounded"/>

              <div className="flex gap-4">

                <button
                  onClick={() => navigate(-1)}
                  className="w-1/2 border py-3 rounded"
                >
                  Back
                </button>

                <button
  onClick={() => {
    if (
      !customer.name ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.state ||
      !customer.pin
    ) {
      alert("Please fill all address details");
      return;
    }
    setStep(2);
  }}
  className="w-1/2 bg-orange-700 text-white py-3 rounded"
>
  Continue
</button>

              </div>

            </div>

          )}

          {/* PAYMENT */}

          {step === 2 && (

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-2 gap-4">

                {payments.map((p) => (

                  <button
                    key={p.name}
                    onClick={() => setPaymentMethod(p.name)}
                    className={`flex items-center gap-3 border p-4 rounded-lg ${
                      paymentMethod === p.name
                        ? "bg-green-500 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >

                    <img src={p.logo} className="w-6 h-6" />

                    {p.name}

                  </button>

                ))}

              </div>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => setStep(1)}
                  className="w-1/2 border py-3 rounded"
                >
                  Back
                </button>

                <button
                  onClick={() => {
  if (paymentMethod === "Cash on Delivery") {
    setStep(3);
  } else {
    setShowScanner(true);
  }
}}
                  className="w-1/2 bg-orange-700 text-white py-3 rounded"
                >
                  Review
                </button>

              </div>

            </div>

          )}

          {/* REVIEW */}

          {step === 3 && (

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Review Order
              </h2>

              <div className="border p-5 rounded mb-4">
                <p><b>Name:</b> {customer.name}</p>
                <p><b>Phone:</b> {customer.phone}</p>
                <p><b>Address:</b> {customer.address}</p>
              </div>

              <div className="border p-5 rounded">
                <p><b>Payment:</b> {paymentMethod}</p>
              </div>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => setStep(2)}
                  className="w-1/2 border py-3 rounded"
                >
                  Back
                </button>

                <button
                  onClick={placeOrder}
                  className="w-1/2 bg-green-600 text-white py-3 rounded"
                >
                  Place Order
                </button>

              </div>

            </div>

          )}

        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-gray-50 p-6 rounded-xl">

          <h3 className="font-bold mb-4">Order Summary</h3>

          <img
            src={product.image_url || "/placeholder.png"}
            className="w-full h-40 object-cover rounded"
          />

          <p className="mt-3 font-semibold">{product.name}</p>

          <div className="flex justify-between mt-4">
            <span>Qty</span>

            <div className="flex gap-2">
              <button className="border px-3" onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <span>{qty}</span>
              <button className="border px-3" onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <hr className="my-4"/>

          <div className="flex justify-between">
            <span>Price</span>
            <span>₹ {product.price * qty}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Delivery</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>

          <hr className="my-4"/>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default BuyNow;