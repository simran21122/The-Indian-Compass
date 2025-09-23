"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import landmarks from "../data/landmarks.json"

function Landing() {
  const [currentLandmark, setCurrentLandmark] = useState(0)
  const [animatedText, setAnimatedText] = useState("")
  const [showSecondLine, setShowSecondLine] = useState(false)

  // Typewriter Effect
  useEffect(() => {
    const firstLineText = "Explore India’s Wonders"
    let currentIndex = 0

    const typeWriter = setInterval(() => {
      if (currentIndex <= firstLineText.length) {
        setAnimatedText(firstLineText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeWriter)
        setTimeout(() => setShowSecondLine(true), 300)
      }
    }, 100)

    return () => clearInterval(typeWriter)
  }, [])

  // Auto-switch landmarks (loop with fade+slide)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLandmark((prev) => (prev + 1) % landmarks.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden paisley-pattern">
      {/* Background Images with Smooth Fade + Blur + Zoom */}
<div className="absolute inset-0 z-0 overflow-hidden">
  {landmarks.map((landmark, index) => (
    <img
      key={index}
      src={landmark.image || "/placeholder.svg"}
      alt={landmark.name}
      className={`w-full h-full object-cover absolute inset-0 transition-all duration-[2000ms] ease-in-out
        ${index === currentLandmark 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-105"}
        blur-sm`}
    />
  ))}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Floating Mandala Decoration */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20 mandala-rotate hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-balance">
            <span className="inline-block">
              {animatedText}
              <span className="animate-pulse">|</span>
            </span>
            <span
              className={`block text-orange-400 transition-all duration-1000 transform ${
                showSecondLine ? "translate-y-0 opacity-100 animate-bounce-in" : "translate-y-4 opacity-0"
              }`}
            >
              The Indian Compass
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-pretty">
            India’s culture and heritage are a rich tapestry of traditions, festivals, art, music, and philosophy
            spanning thousands of years. From grand temples and monuments to folk art and local customs, Indian culture
            celebrates unity in diversity, spirituality, and creativity, offering timeless wisdom that continues to
            inspire generations.
          </p>

          {/* Navigate with <Link> */}
          <div className="flex justify-center items-center mb-12">
            <Link to="/login">
              <button className="relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl group overflow-hidden">
                <span className="absolute inset-0 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors"></span>
                <span className="relative flex items-center">
                  Get Started
                  <ChevronRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </span>
              </button>
            </Link>
          </div>

          {/* Landmark Indicator */}
          <div className="text-white/80 text-sm">
            <p className="mb-2">Currently featuring</p>
            <p className="font-semibold text-accent">{landmarks[currentLandmark].name}</p>
            <p className="text-xs">{landmarks[currentLandmark].location}</p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Landing
