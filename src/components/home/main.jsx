import React, { useRef, useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function Main({ bgImage }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  // Intersection Observer for inner content reveal
  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // Scroll position for floating title/subtitle
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
        {/* Title + Subtitle with scroll float */}
        <motion.div style={{ y: yRange }}>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 py-3 sm:py-5"
          >
            The Indian Compass
          </motion.h1>
          <motion.h2
            className="text-xl sm:text-2xl lg:text-3xl mb-6 font-medium"
          >
            Your Cultural and Spiritual Guide to India
          </motion.h2>
        </motion.div>

        {/* Paragraph and button with scroll reveal */}
        <motion.div
          variants={textRevealVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
            India’s culture and heritage are a vibrant tapestry woven with
            traditions, festivals, art, music, and philosophy that span thousands
            of years...
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate("/about")}
              className="w-28 sm:w-32 lg:w-36 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition"
            >
              About Us
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Main;
