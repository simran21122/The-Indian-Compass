import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  CreditCard, 
  ChevronLeft, 
  CheckCircle, 
  Upload, 
  Info, 
  ShieldCheck, 
  ArrowRight,
  Loader2,
  Package,
  Truck
} from "lucide-react";
import qrImage from "../assets/image/QrCode.jpeg";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { product, total, paymentMethod, qty } = state || {};
  const imageUrl = product?.image_url || product?.image;

  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback for missing state
  if (!state) {
    return (
      <div className="min-h-screen bg-[#F5E6C8] flex flex-col items-center justify-center p-4 text-center font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm border-b-4 border-orange-600">
          <Info className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Order</h2>
          <p className="text-gray-500 mb-6 text-sm">Your order session has expired or is invalid.</p>
          <button 
            onClick={() => navigate("/")}
            className="w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-sans font-bold uppercase text-xs tracking-widest"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleConfirmPayment = () => {
    if (!utr || !screenshot) {
      alert("Please provide both the Transaction ID (UTR) and a screenshot of your success page.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/buynow", {
        state: { ...state, utr, screenshot: URL.createObjectURL(screenshot), step: 3 },
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5E6C8] text-gray-900">
      {/* Compact Navbar */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-gray-500 hover:text-orange-600 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Back</span>
          </button>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            <Lock className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700">Secure Payment</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* LEFT: PAYMENT FLOW (Spans 7) */}
          <div className="lg:col-span-7 space-y-5">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">via {paymentMethod}</p>
                </div>
              </div>

              {/* QR + Amount : Side by side on larger, stacked on smaller */}
              <div className="bg-gray-50 border border-orange-100 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5">
                <div className="bg-white p-3 rounded-xl shadow-md ring-4 ring-orange-50 shrink-0">
                  <img src={qrImage} alt="QR Code" className="w-40 h-40 object-contain rounded-lg" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Scan & Pay</p>
                  <h4 className="text-4xl font-black text-gray-900 tracking-tight">
                    <span className="text-orange-600 text-xl mr-0.5">₹</span>{total}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1.5">Scan with any UPI app to pay</p>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="mt-6 space-y-4 font-sans">
                {/* UTR Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Transaction / UTR ID</label>
                    <span className="text-[9px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded uppercase">Required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 12-digit UTR code"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-xl px-4 py-3 text-sm font-medium transition-all placeholder:text-gray-300"
                  />
                </div>
                
                {/* Screenshot Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 px-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Payment Screenshot</label>
                    <span className="text-[9px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded uppercase">JPG / PNG</span>
                  </div>
                  <label className="relative block cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleScreenshotChange} className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" />
                    <div className={`w-full border ${screenshot ? 'border-green-400 bg-green-50' : 'border-dashed border-gray-200 bg-white'} rounded-xl flex items-center justify-between px-4 py-3 transition-all hover:border-orange-400`}>
                      <div className="flex items-center gap-3">
                        <Upload className={`w-4 h-4 ${screenshot ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className="text-xs font-bold text-gray-500 truncate max-w-[200px]">
                          {screenshot ? screenshot.name : "Choose file from device"}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full uppercase tracking-wider border border-orange-100 shrink-0">Upload</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Screenshot Preview (inline, compact) */}
              <AnimatePresence>
                {screenshotPreview && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Uploaded Proof</span>
                    </div>
                    <img src={screenshotPreview} className="w-full max-h-48 object-contain rounded-xl border border-gray-100 bg-gray-50" alt="Receipt Preview" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                disabled={!utr || !screenshot || isSubmitting}
                onClick={handleConfirmPayment}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 group mt-6 font-sans
                  ${(!utr || !screenshot || isSubmitting) 
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                    : "bg-orange-600 text-white hover:bg-orange-700 active:scale-[0.98] shadow-lg shadow-orange-200/50"}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-widest">Confirm Payment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* RIGHT: ORDER SUMMARY (Spans 5) */}
          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 lg:sticky lg:top-20 space-y-5"
          >
            {/* Order Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Product Image - compact header */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={product?.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="bg-orange-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Heritage Item</span>
                </div>
              </div>

              <div className="p-5">
                {/* Product Info */}
                <h4 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{product?.name}</h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-4">Qty: {qty} · via {paymentMethod}</p>

                {/* Price Breakdown */}
                <div className="space-y-2.5 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center text-gray-500">
                    <span className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5" />
                      <span>Price ({qty} item{qty > 1 ? 's' : ''})</span>
                    </span>
                    <span className="font-bold text-gray-800">₹{product?.price * qty}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500">
                    <span className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Delivery</span>
                    </span>
                    <span className="font-bold text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-orange-100">
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-black text-orange-600">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges - Compact */}
            <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
              <div className="flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-xl border border-orange-100/50 hover:bg-orange-50 transition-colors">
                <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Authentic Source</p>
                  <p className="text-[10px] text-gray-400 leading-snug">Direct cluster-to-buyer certified heritage</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-orange-50/50 rounded-xl border border-orange-100/50 hover:bg-orange-50 transition-colors">
                <Lock className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">Encrypted Payment</p>
                  <p className="text-[10px] text-gray-400 leading-snug">256-bit SSL secured transaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;