import React from "react";
import { motion } from "framer-motion";

function ContactUs({ bgImage }) {
  return (
    <section
      className="flex justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20 py-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="w-full max-w-4xl flex flex-col lg:flex-row 
     bg-orange-300 backdrop-blur-xl 
     p-6 sm:p-8 rounded-2xl shadow-xl 
     border border-white/20 gap-6 relative mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Left Side: Contact Details */}
        <motion.div
          className="flex-1 text-[#ad4146] space-y-4 relative z-10"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/90">
            Have questions or want to reach out? We'd love to hear from you.
          </p>
          <div className="space-y-2 text-sm sm:text-base text-white/90">
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Phone:</strong> +91 12345 67890</p>
            <p><strong>Address:</strong> 123, India Street, Delhi</p>
          </div>
        </motion.div>

        {/* Right Side: Message Form */}
        <motion.div
          className="flex-1 relative z-10"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <form className="flex flex-col gap-4">
            {["Your Name", "Your Email"].map((labelText, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-white/90 font-medium text-sm">{labelText}</label>
                <input
                  type={labelText.includes("Email") ? "email" : "text"}
                  placeholder=""
                  className="w-full p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ad4146] transition"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-white/90 font-medium text-sm">Your Message</label>
              <textarea
                rows="4"
                placeholder=""
                className="w-full p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ad4146] transition"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full sm:w-auto h-10 sm:h-12 lg:h-14 rounded-xl text-white text-sm sm:text-base bg-[#af4c0f] hover:bg-[#e67530] shadow-lg transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ContactUs;
