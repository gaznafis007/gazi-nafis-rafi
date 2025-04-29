"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useAnimationControls, useMotionValue, useTransform } from "framer-motion"

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const controls = useAnimationControls()
  const containerRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  // Mouse movement for interactive elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [0, 300], [10, -10])
  const rotateY = useTransform(mouseX, [0, 300], [-10, 10])

  const welcomeTexts = ["Welcome to my portfolio", "Exploring creativity", "Showcasing my work", "Thanks for visiting"]

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  // Simulate loading progress
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10
        return next > 100 ? 100 : next
      })
    }, 300)

    return () => clearInterval(timer)
  }, [])

  // Cycle through welcome texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % welcomeTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Trigger pulse animation periodically
  useEffect(() => {
    if (mounted) {
      const interval = setInterval(() => {
        controls.start({
          scale: [1, 1.05, 1],
          transition: { duration: 2, ease: "easeInOut" },
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [controls, mounted])

  // Letters for animated name
  const nameLetters = "Gazi Nafis Rafi".split("")

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background patterns and gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
              "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
              "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
              "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </div>

      {/* Content container with glassmorphism effect */}
      <motion.div
        className="relative z-10 w-full max-w-md px-8 py-12 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformPerspective: "1000px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo/Avatar */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/50 shadow-lg"
          animate={controls}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            GNR
          </div>

          {/* Animated ring */}
          <motion.div
            className="absolute -inset-1 rounded-full border-2 border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Animated name */}
        <motion.h1
          className="text-center font-bold text-3xl sm:text-4xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.08,
                type: "spring",
                stiffness: 200,
              }}
              className={letter === " " ? "mr-2" : ""}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Welcome message with text cycling */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentTextIndex}
            className="text-center text-gray-800 mb-8 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {welcomeTexts[currentTextIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress text */}
        <div className="flex justify-between text-sm text-gray-700">
          <span>Loading portfolio</span>
          <motion.span
            key={Math.floor(progress)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.floor(progress)}%
          </motion.span>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 mx-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const size = Math.random() * 60 + 20
          const xPos = Math.random() * 100
          const delay = Math.random() * 5
          const duration = Math.random() * 15 + 10
          const opacity = Math.random() * 0.15 + 0.05

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: "100%",
                background: `linear-gradient(45deg, rgba(255, 154, 158, ${opacity}) 0%, rgba(250, 208, 196, ${opacity}) 99%)`,
              }}
              animate={{
                top: ["-20%", "120%"],
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
                rotate: [0, 360],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                delay,
                ease: "linear",
                x: {
                  duration: duration / 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default LoadingAnimation
