import React, { useEffect, useState } from "react";
import bgNewImg from "../image/landing_bg.jpg";
import mobileViewBg from "../image/landing_bg_mobile.jpg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const fullText = "  The Indian Compass";
  const [text, setText] = useState("");
  const [bgImage, setBgImage] = useState(bgNewImg); // default desktop background
  const navigate = useNavigate();

  useEffect(() => {
    // Typing effect
    let index = 0;
    setText("");
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update background based on screen size
    const updateBg = () => {
      if (window.innerWidth < 768) {
        setBgImage(mobileViewBg);
      } else {
        setBgImage(bgNewImg);
      }
    };

    updateBg(); // run once on mount
    window.addEventListener("resize", updateBg);

    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image with stronger blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm brightness-75"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      {/* Text container with semi-transparent box */}
      <div className="relative z-10 flex flex-col items-center text-center h-full px-4 sm:px-6 md:px-12 lg:px-24 py-20 sm:py-32 lg:py-48 justify-center">
        <div className="px-4 py-6 sm:px-8 sm:py-10 bg-black/40 backdrop-blur-md rounded-xl">
          {/* Typing text */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 whitespace-nowrap text-shadow">
            {text.split(" ").map((word, i) =>
              word === "Indian" ? (
                <span
                  key={i}
                  className="relative inline-block px-1 sm:px-2 -skew-x-12 bg-orange-600 bg-opacity-90"
                >
                  {word}
                </span>
              ) : (
                <span key={i} className="inline-block mr-1 sm:mr-2">
                  {word}
                </span>
              )
            )}
            <span className="border-r-2 sm:border-r-4 border-white animate-caret ml-1">&nbsp;</span>
          </h1>

          <h2 className="text-black text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-wide opacity-0 animate-fade-in px-2">
            Your Cultural and Spiritual Guide to India
          </h2>

          <p className="max-w sm:max-w-4xl mt-4 sm:mt-6 text-white text-sm sm:text-base md:text-lg lg:text-2xl leading-relaxed opacity-0 animate-fade-in-delayed">
            India’s culture and heritage are a vibrant tapestry woven with traditions,
            festivals, art, music, and philosophy that span thousands of years. From the
            grandeur of ancient temples and monuments to the simplicity of folk art and
            local customs, Indian culture embodies unity in diversity. It celebrates
            spirituality, harmony, and creativity, offering the world a timeless treasure
            of wisdom and values that continue to inspire generations.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-md border border-orange-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition duration-300 ease-in-out shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
          .heritage-font { font-family: 'Pacifico', cursive; }
          .text-shadow { text-shadow: 1px 1px 4px rgba(0,0,0,0.6); }
          @keyframes caret { 0%, 100% { border-color: transparent; } 50% { border-color: white; } }
          .animate-caret { animation: caret 1s steps(1) infinite; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 2s ease forwards; animation-delay: 1500ms; }
          .animate-fade-in-delayed { animation: fadeIn 2s ease forwards; animation-delay: 2500ms; }
        `}
      </style>
    </div>
  );
};

export default Landing;
