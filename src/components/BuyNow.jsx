import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, User, Mail, MapPin, Phone } from "lucide-react";
import phonepeLogo from "../assets/image/phonepe.png";
import gpayLogo from "../assets/image/gpay.svg";
import paytmLogo from "../assets/image/paytm.png";
import amazonPayLogo from "../assets/image/amazonpay.png";
import codLogo from "../assets/image/cod.png";

const countries = ["India", "United States", "Canada", "United Kingdom", "Australia"];
const digitalPayments = [
  { name: "PhonePe", logo: phonepeLogo },
  { name: "GPay", logo: gpayLogo },
  { name: "Paytm", logo: paytmLogo },
  { name: "Amazon Pay", logo: amazonPayLogo },
  { name: "Cash on Delivery", logo: codLogo },
];

const BuyNow = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    country: "India",
    notes: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
    method: "Card",
  });

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handlePaymentMethod = (method) => {
    setPayment({ ...payment, method });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Successful via ${payment.method}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-7xl bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Side: Customer Details */}
        <div className="p-8 bg-gradient-to-b from-blue-500 to-blue-400 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Customer Details</h2>
          <form className="space-y-4">
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-3">
              <User className="text-white w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customer.name}
                onChange={handleCustomerChange}
                className="w-full bg-transparent placeholder-white text-white focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-3">
              <Mail className="text-white w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={customer.email}
                onChange={handleCustomerChange}
                className="w-full bg-transparent placeholder-white text-white focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-3">
              <Phone className="text-white w-5 h-5" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={handleCustomerChange}
                className="w-full bg-transparent placeholder-white text-white focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 bg-white/20 rounded-xl p-3">
              <MapPin className="text-white w-5 h-5" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={customer.address}
                onChange={handleCustomerChange}
                className="w-full bg-transparent placeholder-white text-white focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={customer.city}
                onChange={handleCustomerChange}
                className="w-1/2 bg-white/20 placeholder-white text-white rounded-xl p-3 focus:outline-none"
              />
              <input
                type="text"
                name="state"
                placeholder="State / Province"
                value={customer.state}
                onChange={handleCustomerChange}
                className="w-1/2 bg-white/20 placeholder-white text-white rounded-xl p-3 focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                name="pin"
                placeholder="Pin Code"
                value={customer.pin}
                onChange={handleCustomerChange}
                className="w-1/2 bg-white/20 placeholder-white text-white rounded-xl p-3 focus:outline-none"
              />
              <select
                name="country"
                value={customer.country}
                onChange={handleCustomerChange}
                className="w-1/2 bg-white/20 placeholder-white text-white rounded-xl p-3 focus:outline-none"
              >
                {countries.map((c) => (
                  <option key={c} value={c} className="text-black">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="notes"
              placeholder="Additional Notes / Instructions"
              value={customer.notes}
              onChange={handleCustomerChange}
              className="w-full bg-white/20 placeholder-white text-white rounded-xl p-3 focus:outline-none resize-none h-24"
            />
          </form>
        </div>

        {/* Right Side: Payment */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Payment</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {payment.method === "Card" && (
              <>
                <div className="flex items-center gap-3 border rounded-xl p-3">
                  <CreditCard className="text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    className="w-full focus:outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    className="w-1/2 border rounded-xl p-3 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    className="w-1/2 border rounded-xl p-3 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on Card"
                  value={payment.nameOnCard}
                  onChange={handlePaymentChange}
                  className="w-full border rounded-xl p-3 focus:outline-none"
                />
              </>
            )}

            {/* Digital Wallet Options */}
            <div className="mt-4">
              <p className="text-gray-600 font-medium mb-2">Or pay with:</p>
              <div className="flex gap-4 flex-wrap">
                {digitalPayments.map((method) => (
                  <button
                    key={method.name}
                    type="button"
                    onClick={() => handlePaymentMethod(method.name)}
                    className={`flex items-center gap-2 py-2 px-4 rounded-xl border shadow hover:scale-105 transition ${
                      payment.method === method.name
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                    } ${method.name === "Cash on Delivery" ? "w-full justify-center" : ""}`}
                  >
                    <img src={method.logo} alt={method.name} className="w-6 h-6" />
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-green-600 transition mt-4"
            >
              Pay Now
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyNow;
