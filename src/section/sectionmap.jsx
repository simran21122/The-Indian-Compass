import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence, useViewportScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import indiamap from "../image/indiamap.png";

function SectionMaps({ bgImage }) {
  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef(null);

  const [inViewRef, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Combine refs
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

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      ref={setRefs}
      className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20 pb-10 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <AnimatePresence>
        <motion.div
          className="max-w-6xl w-full mt-24"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          exit="hidden"
        >
          {/* Title + Subtitle with scroll float */}
          <motion.div
            className="text-center mb-10"
            style={{ y: yRange }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ad4146] mb-4"
            >
              Interactive Maps
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-900 leading-relaxed"
              variants={textRevealVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Dive into India’s cultural and geographical diversity with our
              interactive maps. Explore states, landmarks, and hidden gems with
              a simple click.
            </motion.p>
          </motion.div>

          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left column - details */}
            <motion.div
              className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl text-center lg:text-left"
              variants={leftColumnVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.h3
                className="text-2xl font-semibold text-[#af4c0f] mb-4"
                variants={textRevealVariants}
              >
                Why Use Interactive Maps?
              </motion.h3>
              <motion.p
                className="text-gray-800 mb-6"
                variants={textRevealVariants}
              >
                Our interactive maps let you explore India like never before.
                Zoom into specific states, uncover cultural heritage sites,
                navigate natural wonders, and learn detailed information about
                every region.
              </motion.p>
              <motion.button
                onClick={() => navigate("/map")}
                className="w-44 h-12 rounded-xl text-white text-lg bg-[#af4c0f] hover:bg-[#e67530] transition"
                variants={textRevealVariants}
              >
                Interactive Map
              </motion.button>
            </motion.div>

            {/* Right column - image */}
            <motion.div
              className="flex justify-center"
              variants={rightColumnVariants}
              initial="hidden"
              animate={controls}
            >
              <img
                src={indiamap}
                alt="Interactive Map Preview"
                className="hidden lg:block rounded-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default SectionMaps;
