import React, { useRef, useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import marketData from "../data/home_market.json";

function MarketSection({ bgImage }) {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  // Intersection Observer
  const [inViewRef, inView] = useInView({ threshold: 0.3, triggerOnce: false });
  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // Scroll floating effect
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Scroll handler
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={setRefs}
      className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-4 sm:px-8 lg:px-16 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="text-center text-[#ad4146] max-w-6xl w-full"
        variants={textRevealVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Title + Subtitle + Paragraph */}
        <motion.div style={{ y: yRange }}>
          <motion.h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 py-3">
            Indian Marketplace
          </motion.h1>
          <motion.h2 className="text-base sm:text-lg lg:text-xl mb-3 font-medium text-gray-700">
            Buy authentic, handcrafted products inspired by India’s rich culture
          </motion.h2>
          <motion.p className="text-sm sm:text-base lg:text-base text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore a wide range of handcrafted products made by skilled artisans
            from across India. From traditional paintings and textiles to pottery
            and jewelry, each item reflects the rich cultural heritage and
            craftsmanship of its region.
          </motion.p>
        </motion.div>

        {/* Scrollable Product Row */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Left Arrow */}
          <motion.button
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 z-10 hidden sm:flex"
          >
            <ChevronLeft size={20} />
          </motion.button>

          {/* Product container */}
          <motion.div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 px-4 sm:px-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {marketData.map((item) => (
              <motion.div
                key={item.id}
                className={`
                  bg-white h-[260px] rounded-lg shadow-md overflow-hidden snap-start flex-shrink-0
                  hover:shadow-lg transition transform hover:-translate-y-1
                  w-[calc(100%/3-0.75rem)] sm:w-[calc(100%/4-1rem)]
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-28 sm:h-32 object-cover"
                />
                <div className="p-3 text-left">
                  <h3 className="text-sm font-semibold text-[#af4c0f] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {item.category} • {item.state}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">
                      ₹{item.price}
                    </span>
                    <span className="text-xs text-yellow-600">⭐ {item.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Arrow */}
          <motion.button
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 z-10 hidden sm:flex"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Explore More button */}
        <div className="mt-8">
          <motion.button
            onClick={() => navigate("/marketplace")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#af4c0f] text-white rounded-lg hover:bg-[#922f0a] transition text-sm font-medium shadow-md"
          >
            Explore Marketplace
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export default MarketSection;
