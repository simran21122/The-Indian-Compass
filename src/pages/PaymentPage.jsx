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
  Loader2
} from "lucide-react";
import qrImage from "../assets/image/QrCode.jpeg";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Dynamic Product Data from Location State
  const { product, total, paymentMethod, qty } = state || {};
  
  // ROBUST IMAGE MAPPING (image_url vs image)
  const imageUrl = product?.image_url || product?.image;

  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fallback for missing state
  if (!state) {
    return (
      <div className="min-h-screen bg-[#F5E6C8] flex flex-col items-center justify-center p-6 text-center font-sans tracking-tight">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md border-b-8 border-orange-600">
          <Info className="w-16 h-16 text-orange-600 mx-auto mb-6" />
          <h2 className="text-4xl font-serif font-black text-gray-900 mb-4">No Active Order</h2>
          <p className="text-gray-500 mb-10 font-medium italic text-lg leading-relaxed">The path to your Indian discovery was interrupted.</p>
          <button 
            onClick={() => navigate("/")}
            className="w-full py-5 bg-orange-600 text-white rounded-2xl shadow-lg hover:bg-orange-700 transition-all font-sans font-bold uppercase text-xs tracking-[0.3em]"
          >
            Explore Marketplace
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
    <div className="min-h-screen bg-[#F5E6C8] text-gray-900 pb-24 font-sans antialiased selection:bg-orange-100">
      {/* Premium Heritage Navbar */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-sans font-black group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black">Return / Modify</span>
          </button>
          <div className="flex items-center gap-3 bg-orange-50 px-5 py-2 rounded-full border border-orange-100">
            <Lock className="w-4 h-4 text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-700 px-1">Protected Gateway</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: PAYMENT FLOW (Spans 7) */}
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] shadow-[0_10px_50px_rgb(0,0,0,0.05)] p-10 sm:p-14 border border-white"
            >
              <div className="flex items-center gap-6 mb-14">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center shadow-inner">
                  <CreditCard className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-serif font-black tracking-tight text-gray-900">Final Step: Pay</h2>
                  <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em] font-sans">Heritage Payments via {paymentMethod}</p>
                </div>
              </div>

              {/* QR Section - Spacious */}
              <div className="bg-gray-50/50 border-2 border-dashed border-orange-100 rounded-[3rem] p-10 flex flex-col items-center gap-10">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl relative ring-8 ring-orange-100/20">
                  <img src={qrImage} alt="QR Code" className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-2xl" />
                </div>
                <div className="text-center group">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-3 italic">Total Amount to Settle</p>
                  <h4 className="text-7xl font-serif font-black text-gray-900 tracking-tighter">
                    <span className="text-orange-600 text-3xl mr-1 font-sans">₹</span>{total}
                  </h4>
                </div>
              </div>

              {/* Secure Inputs - Generous */}
              <div className="mt-14 space-y-8 font-sans">
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Transaction / UTR ID</label>
                    <span className="text-[9px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded uppercase">Required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 12-digit code"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="w-full bg-white border-2 border-gray-50 focus:border-orange-600 focus:ring-4 focus:ring-orange-100 rounded-2xl p-6 text-base font-bold shadow-sm transition-all placeholder:text-gray-200"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Success Screenshot</label>
                    <span className="text-[9px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded uppercase">JPG or PNG</span>
                  </div>
                  <label className="relative h-[80px] group block cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleScreenshotChange} className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer" />
                    <div className={`w-full h-full border-2 border-dashed ${screenshot ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} rounded-2xl flex items-center justify-between px-8 shadow-sm transition-all group-hover:border-orange-600`}>
                      <div className="flex items-center gap-4">
                        <Upload className={`w-6 h-6 ${screenshot ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className="text-xs font-black text-gray-500 truncate max-w-[220px]">
                          {screenshot ? screenshot.name : "Select from your device"}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-4 py-2 rounded-full uppercase tracking-widest border border-orange-100">Upload</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action - Massive Pill */}
              <button
                disabled={!utr || !screenshot || isSubmitting}
                onClick={handleConfirmPayment}
                className={`w-full py-7 rounded-3xl font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-4 group mt-12 font-sans
                  ${(!utr || !screenshot || isSubmitting) 
                    ? "bg-gray-100 text-gray-300 cursor-not-allowed shadow-none" 
                    : "bg-orange-600 text-white hover:bg-orange-700 hover:-translate-y-2 active:scale-95 shadow-orange-300/50"}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-[0.3em] text-sm">Seal & Settle Bounty</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Proof Preview Card */}
            <AnimatePresence>
              {screenshotPreview && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="bg-white p-10 rounded-[3rem] shadow-xl border border-white"
                >
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">Proof Verification Loaded</h5>
                  </div>
                  <img src={screenshotPreview} className="w-full h-auto rounded-[2rem] border-4 border-gray-50 shadow-inner bg-gray-50" alt="Receipt Preview" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: SPOTLIGHT - Spacious & Premium (Spans 5) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 space-y-10 lg:sticky lg:top-32"
          >
            <div className="bg-white rounded-[3.5rem] shadow-2xl border border-white overflow-hidden p-10">
              <h3 className="text-xl font-serif font-black text-gray-900 uppercase tracking-tight mb-10 border-b-4 border-orange-50 pb-5">Order Spotlight</h3>
              
              {/* LARGE Hero Image - Reintegrated Fix */}
              <div className="w-full aspect-square rounded-[3rem] overflow-hidden mb-10 shadow-inner ring-12 ring-gray-50/50">
                <img src={imageUrl} alt={product?.name} className="w-full h-full object-cover transform scale-100 hover:scale-110 transition-transform duration-1000" />
              </div>

              <div className="space-y-3 mb-10 font-sans">
                <h4 className="text-3xl font-serif font-black text-gray-900 leading-[1.1]">{product?.name}</h4>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-orange-200">Heritage Item</span>
                  <span className="text-[11px] text-gray-400 font-extrabold uppercase tracking-widest">Qty: {qty}</span>
                </div>
              </div>

              <div className="space-y-5 pt-10 border-t-2 border-dashed border-gray-100 font-sans">
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                  <span className="uppercase tracking-widest">Price Point</span>
                  <span className="text-gray-900 font-black">₹ {product?.price * qty}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                  <span className="uppercase tracking-widest">Global Partners</span>
                  <span className="text-green-600 font-black uppercase text-[10px] bg-green-50 px-3 py-1 rounded-full">Free Harvest Track</span>
                </div>
                <div className="pt-8 border-t-8 border-orange-50">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-700 font-black uppercase text-xs tracking-widest leading-none pb-2">Full Bounty</span>
                    <span className="text-6xl font-serif font-black text-orange-600 tracking-tighter leading-none">₹ {total}</span>
                  </div>
                  <p className="text-[10px] text-gray-300 italic mt-5 text-right font-medium">Verification follows instantly upon settlement.</p>
                </div>
              </div>

              {/* Trust Integrated - Premium Cards */}
              <div className="mt-12 space-y-5 font-sans">
                <div className="p-5 bg-orange-50/30 rounded-3xl flex items-start gap-4 border border-orange-100/50 transition-colors hover:bg-orange-50/50">
                  <ShieldCheck className="w-7 h-7 text-orange-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">Authentic Source Pledge</p>
                    <p className="text-[10px] font-bold text-gray-500 leading-relaxed italic">Direct cluster-to-buyer certified heritage.</p>
                  </div>
                </div>
                <div className="p-5 bg-orange-50/30 rounded-3xl flex items-start gap-4 border border-orange-100/50 transition-colors hover:bg-orange-50/50">
                  <Lock className="w-7 h-7 text-orange-600 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">Vault-Level Shielding</p>
                    <p className="text-[10px] font-bold text-gray-500 leading-relaxed italic">Your transaction path is 256-bit encrypted.</p>
                  </div>
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