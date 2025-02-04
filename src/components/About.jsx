"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

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

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)",
            scale,
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2 className="text-3xl font-semibold mb-16 text-center text-gray-900" variants={itemVariants}>
          About Me
        </motion.h2>

        <div className="flex flex-col items-center justify-center gap-12">
          <motion.div className="w-48 h-48 relative" variants={itemVariants}>
            <div className="absolute inset-0 bg-indigo-100 rounded-full transform -rotate-6" />
            <div className="absolute inset-0 bg-indigo-200 rounded-full transform rotate-6" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="/assets/me.jpeg"
                alt="animate gazi nafis rafi"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div className="max-w-2xl text-center" variants={itemVariants}>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              As a passionate MERN stack developer, I bring ideas to life through clean, efficient code. My expertise
              spans HTML, CSS, JavaScript, React.js, Next.js, Redux, Express.js, Node.js, MongoDB, Firebase, Tailwind
              CSS, and shadcn/ui, enabling me to build responsive and scalable web applications.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              My mission is to create intuitive user experiences while ensuring robust backend functionality. I thrive
              on learning new technologies and embracing challenging projects that push the boundaries of web
              development.
            </p>
          </motion.div>

          <motion.div className="mt-8" variants={itemVariants}>
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full font-medium transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About

