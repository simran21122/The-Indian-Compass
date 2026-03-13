import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

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
const product = location.state?.product;

const [step, setStep] = useState(1);

const [customer, setCustomer] = useState({
name: "",
phone: "",
address: "",
city: "",
state: "",
pin: "",
});

const [paymentMethod, setPaymentMethod] = useState("");

const [qty, setQty] = useState(1);

if (!product) {
return (
<div className="flex items-center justify-center h-screen text-black text-xl">
No product selected
</div>
);
}

const handleChange = (e) => {
setCustomer({
...customer,
[e.target.name]: e.target.value,
});
};

const placeOrder = () => {
alert("Order Placed Successfully!");
};

const total = product.price * qty;

return (

<div
className="min-h-screen bg-cover bg-center flex items-center justify-center p-10"
style={{ backgroundImage: `url(${heritageBg})` }}
>

<div className="absolute inset-0 bg-white/30"></div>

<motion.div
className="relative grid lg:grid-cols-3 gap-8 max-w-6xl w-full bg-white p-10 rounded-2xl shadow-xl text-black"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
>

{/* LEFT SECTION */}

<div className="lg:col-span-2">

<div className="flex justify-between mb-8 font-semibold">

<span className={step === 1 ? "text-orange-700" : ""}>1 Address</span>
<span className={step === 2 ? "text-orange-700" : ""}>2 Payment</span>
<span className={step === 3 ? "text-orange-700" : ""}>3 Review</span>

</div>

{/* ADDRESS */}

{step === 1 && (

<div className="space-y-4">

<h2 className="text-2xl font-bold">
Delivery Address
</h2>

<input
name="name"
placeholder="Full Name"
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<input
name="phone"
placeholder="Phone Number"
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<input
name="address"
placeholder="Address"
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<div className="grid grid-cols-2 gap-4">

<input
name="city"
placeholder="City"
onChange={handleChange}
className="border p-3 rounded"
/>

<input
name="state"
placeholder="State"
onChange={handleChange}
className="border p-3 rounded"
/>

</div>

<input
name="pin"
placeholder="Pincode"
onChange={handleChange}
className="w-full border p-3 rounded"
/>

<button
onClick={() => setStep(2)}
className="w-full bg-orange-700 text-white py-3 rounded"
>
Continue to Payment
</button>

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
onClick={() => setStep(3)}
className="w-1/2 bg-orange-700 text-white py-3 rounded"
>
Review Order
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

<button
onClick={placeOrder}
className="w-full mt-6 bg-green-600 text-white py-3 rounded"
>
Place Order
</button>

</div>

)}

</div>

{/* RIGHT SIDE ORDER SUMMARY */}

<div className="bg-gray-50 p-6 rounded-xl">

<h3 className="font-bold mb-4">
Order Summary
</h3>

<img
src={product.image_url}
className="w-full h-40 object-cover rounded"
/>

<p className="mt-3 font-semibold">
{product.name}
</p>

<p className="text-gray-700">
₹ {product.price}
</p>

{/* Quantity */}

<div className="flex justify-between mt-4">

<span>Qty</span>

<div className="flex gap-2">

<button
className="border px-3"
onClick={() => qty > 1 && setQty(qty - 1)}
>
-
</button>

<span>{qty}</span>

<button
className="border px-3"
onClick={() => setQty(qty + 1)}
>
+
</button>

</div>

</div>

<hr className="my-4" />

<div className="flex justify-between">
<span>Price</span>
<span>₹ {product.price * qty}</span>
</div>

<div className="flex justify-between">
<span>Delivery</span>
<span className="text-green-600">Free</span>
</div>

<hr className="my-4" />

<div className="flex justify-between font-bold">
<span>Total</span>
<span>₹ {total}</span>
</div>

</div>

</motion.div>

</div>

);
}

export default BuyNow;