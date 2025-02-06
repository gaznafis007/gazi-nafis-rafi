"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { IconCloud } from "./ui/icon-cloud"
import { Button } from "@/components/ui/button"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
  }

  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
  ]
  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
          <defs>
            <pattern id="grid-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
        </svg>
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900"
          variants={itemVariants}
        >
          About Me
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div className="w-full lg:w-1/2 order-2 lg:order-1" variants={itemVariants}>
          <div className="relative w-64 h-64 mx-auto mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full transform rotate-6" />
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <Image
                  src="/assets/me.jpeg"
                  alt="Gazi Nafis Rafi"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300"
                />
              </motion.div>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                As a passionate MERN stack developer, I bring ideas to life through clean, efficient code. My expertise
                spans HTML, CSS, JavaScript, React.js, Next.js, Redux, Express.js, Node.js, MongoDB, Firebase, Tailwind
                CSS, and shadcn/ui, enabling me to build responsive and scalable web applications.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My mission is to create intuitive user experiences while ensuring robust backend functionality. I thrive
                on learning new technologies and embracing challenging projects that push the boundaries of web
                development.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:from-gray-800 hover:to-gray-950"
                >
                  Get in Touch
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col items-center gap-8"
            variants={itemVariants}
          >
            <IconCloud
              images={images}
              config={{
                size: 600,
                depth: 1,
                radius: 250,
                initial: [0.7, -0.3],
                maxSpeed: 0.01,
                tooltip: true,
              }}
              className="w-full h-[200px]"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About

