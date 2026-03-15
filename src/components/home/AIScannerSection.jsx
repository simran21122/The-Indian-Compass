import React, { useRef, useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function AIScannerSection({ bgImage }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  // Intersection Observer
  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // Scroll motion effect
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

  return (
    <section
      ref={setRefs}
      className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div className="text-center text-[#ad4146] max-w-3xl mt-24">
        {/* Floating Title */}
        <motion.div style={{ y: yRange }}>
          <motion.h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 py-3 sm:py-5">
            AI Scanner
          </motion.h1>
          <motion.h2 className="text-xl sm:text-2xl lg:text-3xl mb-6 font-medium">
            Discover the World Through Your Lens
          </motion.h2>
        </motion.div>

        {/* Content + CTA */}
        <motion.div
          variants={textRevealVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
            Upload or scan pictures of historical monuments, cultural crafts, or
            even hidden local gems. Our AI instantly identifies, analyzes, and
            shares fascinating details, helping you explore places with a deeper
            understanding and appreciation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/AIScanner")}
              className="w-32 sm:w-36 lg:w-40 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition"
            >
              Start Scanning
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AIScannerSection;
