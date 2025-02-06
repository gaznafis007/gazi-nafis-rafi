"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { IconCloud } from "./ui/icon-cloud"
import { BackgroundAnimation } from "./ui/background-animation"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

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

  const iconCloudVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
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
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white">
      <BackgroundAnimation />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2 className="text-5xl font-bold mb-16 text-center text-indigo-900" variants={itemVariants}>
          About Me
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div className="w-full lg:w-1/3" variants={iconCloudVariants}>
            <IconCloud
              images={images}
              config={{
                size: 800,
                depth: 1.5,
                radius: 300,
                initial: [0.7, -0.3],
                maxSpeed: 0.01,
                tooltip: true,
              }}
              className="w-full h-[400px]"
            />
          </motion.div>
          <div className="flex flex-col items-center justify-between gap-12 lg:w-2/3">
            <motion.div variants={itemVariants}>
              <div className="w-64 h-64 mx-auto relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-full transform -rotate-6" />
                <div className="absolute inset-0 bg-indigo-300 rounded-full transform rotate-6" />
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Image
                    src="/assets/me.jpeg"
                    alt="animate gazi nafis rafi"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <p className="text-lg text-indigo-900 leading-relaxed">
                As a passionate MERN stack developer, I bring ideas to life through clean, efficient code. My expertise
                spans HTML, CSS, JavaScript, React.js, Next.js, Redux, Express.js, Node.js, MongoDB, Firebase, Tailwind
                CSS, and shadcn/ui, enabling me to build responsive and scalable web applications.
              </p>
              <p className="text-lg text-indigo-900 leading-relaxed">
                My mission is to create intuitive user experiences while ensuring robust backend functionality. I thrive
                on learning new technologies and embracing challenging projects that push the boundaries of web
                development.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
                >
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About

