"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"

const Hero = () => {
  const nameAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  }

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  }

  const name = "Gazi Nafis Rafi"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced background animation */}
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full opacity-30 mix-blend-multiply filter blur-xl"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[30rem] h-[30rem] rounded-full opacity-30 mix-blend-multiply filter blur-xl"
        animate={{
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
          rotate: [0, -360],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(79,70,229,0.8) 0%, rgba(79,70,229,0) 70%)",
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-30 mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-3xl md:text-4xl font-light mb-4 text-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm
        </motion.h1>
        <motion.div
          className="text-4xl md:text-6xl font-bold mb-6"
          variants={nameAnimation}
          initial="hidden"
          animate="visible"
        >
          {name.split("").map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letterAnimation} className="inline-block text-gray-900">
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          A MERN stack developer crafting responsive and user-friendly web experiences.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
          >
            <a
              href="https://drive.google.com/file/d/175vPv-DwuVR3aTCGsn-tauFUB_UMxw0k/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
              aria-label="View my resume"
            >
              View My Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-white hover:bg-gray-100 text-gray-900 border-gray-300 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
          >
            <a
              href="https://github.com/gaznafis007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
              aria-label="Visit my GitHub profile"
            >
              GitHub Profile
              <Github className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

