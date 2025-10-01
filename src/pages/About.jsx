import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import bgAbout from "../assets/image/bg_about.jpg";
import bgAboutMobile from "../assets/image/bg_about_mobile.jpg";

function About() {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind "sm" breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Background animation (skip on mobile)
  useEffect(() => {
    if (!isMobile) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 55, ease: "easeInOut", repeat: Infinity },
      });
    }
  }, [isMobile, controls]);

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${isMobile ? bgAboutMobile : bgAbout})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      animate={controls}
    >
      {/* Transparent Animated Header */}
      <motion.header
        className="w-full fixed top-0 left-0 z-20 bg-transparent py-3 sm:py-4"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex justify-center items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            About Us
          </h1>
        </div>
      </motion.header>

      {/* Content */}
      <div className="flex-grow flex justify-center items-center px-4 sm:px-6 md:px-10 py-20">
        <motion.div
          className="bg-black/40 backdrop-blur-md text-white p-6 sm:p-10 md:p-12 rounded-2xl w-full max-w-3xl shadow-2xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Who We Are
          </h2>
          <p className="mb-6 leading-relaxed text-base sm:text-lg">
            Welcome to our platform. We are dedicated to creating meaningful
            digital experiences that connect people with culture, travel, and
            knowledge. Our team works passionately to deliver solutions that
            make exploration and learning more engaging. With a focus on
            innovation and accessibility, we strive to bring people closer to
            the world around them.
          </p>

          {/* Contact Button */}
          <motion.a
            href="tel:+919876543210"
            className="inline-block bg-white text-black font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-xl shadow-lg mt-6 sm:mt-8 text-sm sm:text-base"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            📞 Contact Us
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default About;
