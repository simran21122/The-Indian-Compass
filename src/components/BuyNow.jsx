import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  CreditCard,
  ClipboardCheck,
  CheckCircle,
  ShoppingBag,
  Package,
  Truck,
  Minus,
  Plus,
} from "lucide-react";

import phonepeLogo from "../assets/image/phonepe.png";
import gpayLogo from "../assets/image/gpay.svg";
import paytmLogo from "../assets/image/paytm.png";
import amazonPayLogo from "../assets/image/amazonpay.png";
import codLogo from "../assets/image/cod.png";

const payments = [
  { name: "PhonePe", logo: phonepeLogo },
  { name: "GPay", logo: gpayLogo },
  { name: "Paytm", logo: paytmLogo },
  { name: "Amazon Pay", logo: amazonPayLogo },
  { name: "Cash on Delivery", logo: codLogo },
];

const stepInfo = [
  { num: 1, label: "Address", icon: MapPin },
  { num: 2, label: "Payment", icon: CreditCard },
  { num: 3, label: "Review", icon: ClipboardCheck },
];

function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const initialStep = location.state?.step || 1;

  const [step, setStep] = useState(initialStep);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [qty, setQty] = useState(location.state?.qty || 1);
  const [paymentMethod, setPaymentMethod] = useState(location.state?.paymentMethod || "");
  const [utr, setUtr] = useState(location.state?.utr || "");
  const [screenshot, setScreenshot] = useState(location.state?.screenshot || null);

  const [customer, setCustomer] = useState(location.state?.customer || {
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5E6C8] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm">
          <ShoppingBag className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Product Selected</h2>
          <p className="text-sm text-gray-500 mb-5">Please select a product first.</p>
          <button
            onClick={() => navigate("/marketplace")}
            className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors"
          >
            Browse Marketplace
          </button>
        </div>
      </div>
    );
  }

  const total = product.price * qty;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
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
      customer,
      utr,
      screenshot: screenshot ? (typeof screenshot === 'string' ? screenshot : URL.createObjectURL(screenshot)) : null,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    setOrderSuccess(true);
  };

  /* ========= SUCCESS PAGE ========= */
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#F5E6C8] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Order Confirmed!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Estimated delivery by <b className="text-gray-700">{formatDate(deliveryDate)}</b>
          </p>

          {/* Product Card */}
          <div className="bg-orange-50 p-4 rounded-xl text-left mb-5 border border-orange-100">
            <div className="flex items-center gap-3">
              <img
                src={product.image_url || "/placeholder.png"}
                className="w-14 h-14 rounded-lg object-cover shadow-sm"
                alt={product.name}
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm truncate">{product.name}</p>
                <p className="text-xs text-gray-500">Qty: {qty}</p>
              </div>
              <span className="text-lg font-black text-orange-600">₹{total}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => setShowOrderDetails(!showOrderDetails)}
              className="py-3 rounded-xl font-bold text-sm border-2 border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              {showOrderDetails ? "Hide" : "View"} Order Details
            </button>
            <button
              onClick={() => navigate("/marketplace")}
              className="py-3 rounded-xl font-bold text-sm bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-sm"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/myorders")}
              className="py-3 rounded-xl font-bold text-sm bg-gray-800 text-white hover:bg-gray-900 transition-colors"
            >
              My Orders
            </button>
          </div>

          {/* Timeline Expand */}
          {showOrderDetails && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 p-4 rounded-xl bg-orange-50 border border-orange-100 text-left"
            >
              <h3 className="font-bold text-sm mb-4 text-center text-gray-800">Delivery Timeline</h3>
              <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">
                <span>Placed</span>
                <span>Shipped</span>
                <span>Out</span>
                <span>Delivered</span>
              </div>
              <div className="flex items-center">
                <div className="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                <div className="flex-1 h-1 bg-orange-600"></div>
                <div className="w-3.5 h-3.5 bg-orange-600 rounded-full"></div>
                <div className="flex-1 h-1 bg-orange-300"></div>
                <div className="w-3.5 h-3.5 bg-orange-300 rounded-full"></div>
                <div className="flex-1 h-1 bg-gray-200"></div>
                <div className="w-3.5 h-3.5 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex justify-between text-[10px] mt-2 text-gray-500 font-medium">
                <span>{formatDate(orderDate)}</span>
                <span>{formatDate(shippedDate)}</span>
                <span>{formatDate(outForDeliveryDate)}</span>
                <span>{formatDate(deliveryDate)}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  /* ========= CHECKOUT PAGE ========= */
  return (
    <div className="min-h-screen bg-[#F5E6C8]">
      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-orange-600 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Back</span>
          </button>
          <h1 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Checkout</h1>
          <div className="w-16"></div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 min-h-[calc(100vh-52px)] flex flex-col justify-center">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-6">
          {stepInfo.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s.num
                    ? "bg-orange-600 text-white"
                    : "bg-gray-200 text-gray-400"
                    }`}
                >
                  {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${step >= s.num ? "text-orange-700" : "text-gray-400"
                    }`}
                >
                  {s.label}
                </span>
              </div>
              {i < stepInfo.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors ${step > s.num ? "bg-orange-600" : "bg-gray-200"
                    }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* LEFT SIDE - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

              {/* ===== STEP 1: ADDRESS ===== */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <h2 className="text-lg font-bold text-gray-900">Delivery Address</h2>
                  </div>

                  <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 px-4 py-3 rounded-xl text-sm transition-all placeholder:text-gray-300"
                  />
                  <input
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 px-4 py-3 rounded-xl text-sm transition-all placeholder:text-gray-300"
                  />
                  <input
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 px-4 py-3 rounded-xl text-sm transition-all placeholder:text-gray-300"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                      className="border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 px-4 py-3 rounded-xl text-sm transition-all placeholder:text-gray-300"
                    />
                    <input
                      name="state"
                      placeholder="State"
                      onChange={handleChange}
                      className="border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 px-4 py-3 rounded-xl text-sm transition-all placeholder:text-gray-300"
                    />
                  </div>

                  <input
                    name="pin"
                    placeholder="Pincode"
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 px-4 py-3 rounded-xl text-sm transition-all placeholder:text-gray-300"
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => navigate(-1)}
                      className="w-1/2 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
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
                      className="w-1/2 py-3 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors shadow-sm"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* ===== STEP 2: PAYMENT ===== */}
              {step === 2 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    <h2 className="text-lg font-bold text-gray-900">Select Payment Method</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {payments.map((p) => (
                      <button
                        key={p.name}
                        onClick={() => setPaymentMethod(p.name)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-sm font-bold text-left ${paymentMethod === p.name
                          ? "border-orange-500 bg-orange-50 text-orange-800 shadow-sm"
                          : "border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/30 text-gray-700"
                          }`}
                      >
                        <img src={p.logo} className="w-7 h-7 object-contain" alt={p.name} />
                        <span>{p.name}</span>
                        {paymentMethod === p.name && (
                          <CheckCircle className="w-4 h-4 text-orange-600 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="w-1/2 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (paymentMethod === "Cash on Delivery") {
                          setStep(3);
                        } else {
                          navigate("/payment", {
                            state: {
                              product,
                              total,
                              paymentMethod,
                              customer,
                              qty,
                            },
                          });
                        }
                      }}
                      className={`w-1/2 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm ${paymentMethod
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed"
                        }`}
                      disabled={!paymentMethod}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* ===== STEP 3: REVIEW ===== */}
              {step === 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <ClipboardCheck className="w-5 h-5 text-orange-600" />
                    <h2 className="text-lg font-bold text-gray-900">Review Order</h2>
                  </div>

                  {/* Product Details */}
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-3">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-3">Product Details</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-bold text-gray-800">{product?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price</span>
                        <span className="font-bold text-gray-800">₹{product?.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quantity</span>
                        <span className="font-bold text-gray-800">{qty}</span>
                      </div>
                      <div className="flex justify-between border-t border-orange-200 pt-2 mt-1">
                        <span className="font-bold text-gray-700">Total</span>
                        <span className="font-black text-orange-600">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-3">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-3">Shipping To</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-bold text-gray-800">{customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-bold text-gray-800">{customer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Address</span>
                        <span className="font-bold text-gray-800 text-right max-w-[60%]">{customer.address}, {customer.city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">State / PIN</span>
                        <span className="font-bold text-gray-800">{customer.state} - {customer.pin}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Payment</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Method</span>
                      <span className="font-bold text-gray-800">{paymentMethod}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setStep(2)}
                      className="w-1/2 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      className="w-1/2 py-3 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-colors shadow-sm"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Order Summary */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.png"}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-5">
                <h3 className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-3">Order Summary</h3>
                <p className="font-bold text-gray-900 text-sm mb-3">{product.name}</p>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center gap-1">
                    <button
                      className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 transition-colors"
                      onClick={() => qty > 1 && setQty(qty - 1)}
                    >
                      <Minus className="w-3 h-3 text-gray-500" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{qty}</span>
                    <button
                      className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 transition-colors"
                      onClick={() => setQty(qty + 1)}
                    >
                      <Plus className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5" /> Price
                    </span>
                    <span className="font-bold text-gray-800">₹{product.price * qty}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" /> Delivery
                    </span>
                    <span className="font-bold text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t-2 border-orange-100">
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Total</span>
                  <span className="text-xl font-black text-orange-600">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BuyNow;