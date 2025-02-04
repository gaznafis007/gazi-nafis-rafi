"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import AnimatedBackground from "./AnimatedBackgorund"


const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, I'm{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Gazi Nafis Rafi
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          I'm a MERN stack developer passionate about creating responsive and user-friendly web applications.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
            <a href="#projects" className="inline-flex items-center">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

