"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const Particle = ({ index }) => {
  const colors = ["#4F46E5", "#818CF8", "#C7D2FE", "#3730A3"]
  const size = Math.random() * 10 + 5
  const initialX = Math.random() * 100
  const initialY = Math.random() * 100

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: colors[index % colors.length],
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
        scale: [1, Math.random() + 0.5, 1],
        opacity: [0.7, 0.9, 0.7],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}

export const BackgroundAnimation = () => {
  const particlesRef = useRef([])

  useEffect(() => {
    particlesRef.current = Array(20)
      .fill()
      .map((_, i) => i)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particlesRef.current.map((index) => (
        <Particle key={index} index={index} />
      ))}
    </div>
  )
}

