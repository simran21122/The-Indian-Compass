// ./src/components/Discovery.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import discoverData from "../../data/home_discover.json";

function DiscoverSection({ bgImage }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  // Intersection Observer
  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // Scroll animation
  const { scrollY } = useViewportScroll();
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setElementHeight(rect.height);
    }
  }, [ref]);

  const yRange = useTransform(
    scrollY,
    [elementTop - window.innerHeight, elementTop + elementHeight],
    [-20, 20]
  );

  const textRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Auto slider logic
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === discoverData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={setRefs}
      className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-4 sm:px-8 lg:px-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div className="text-center text-[#ad4146] max-w-3xl">
        {/* Title + Subtitle + Paragraph */}
        <motion.div style={{ y: yRange }}>
          <motion.h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 py-3">
            Discover India’s Heritage
          </motion.h1>
          <motion.h2 className="text-base sm:text-lg lg:text-xl mb-4 font-medium text-gray-700">
            Explore cultural treasures, from ancient monuments to vibrant festivals
          </motion.h2>

          {/* New paragraph section */}
          <motion.p
            className="text-sm sm:text-base lg:text-lg mb-6 text-gray-600 max-w-2xl mx-auto"
            variants={textRevealVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            India’s heritage is a rich tapestry of history, art, and traditions.
            From majestic forts and palaces to folk arts and local cuisines, every
            corner tells a story that has been preserved through generations.
            Dive into the culture, witness the vibrant festivals, and experience
            the timeless beauty of this incredible land.
          </motion.p>
        </motion.div>

        {/* Slider */}
        <motion.div
          className="relative w-full max-w-2xl mx-auto"
          variants={textRevealVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="overflow-hidden rounded-xl shadow-lg relative h-72 sm:h-80 lg:h-96">
            {discoverData.map((item, index) => (
              <motion.div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-full flex flex-col justify-end text-white p-6 transition-opacity duration-700 bg-cover bg-center rounded-xl ${
                  index === currentIndex ? "opacity-100 relative" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${item.image_url})`,
                }}
              >
                <div className="bg-black/40 p-4 rounded-lg">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base mb-1">{item.description}</p>
                  <p className="text-xs text-gray-200 italic">
                    {item.category} • {item.state}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {discoverData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex
                    ? "bg-[#af4c0f]"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </motion.div>

        {/* Explore More button below slider */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/discover")}
            className="px-6 py-3 bg-[#af4c0f] text-white rounded-lg hover:bg-[#922f0a] transition text-base font-medium shadow-md"
          >
            Explore More
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default DiscoverSection;
