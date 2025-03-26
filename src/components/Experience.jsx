"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Briefcase, Code, ChevronDown, ExternalLink, ArrowRight, Globe } from "lucide-react"

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const experiences = [
    {
      company: "Boom Software UK",
      location: "Buckinghamshire, UK",
      position: "Frontend Developer",
      jobType: "Remote",
      duration: "Aug 2023 - Oct 2024",
      color: "from-blue-500 to-indigo-600",
      icon: "💻",
      responsibilities: [
        "Leading project with team member for the frontend part.",
        "Work on web and mobile application development.",
        "Tech stack: React.js, React Native, Expo, Firebase, REST API.",
      ],
      projects: [
        "Developed responsive web applications with React.js",
        "Built cross-platform mobile apps using React Native and Expo",
        "Implemented real-time features with Firebase",
      ],
    },
    {
      company: "AAK Tele Science Inc",
      location: "California, USA",
      position: "Jr. Frontend Developer",
      jobType: "Remote",
      duration: "Feb 2023 - April 2024",
      color: "from-purple-500 to-pink-600",
      icon: "🚀",
      responsibilities: [
        "Working closely with UI/UX developer.",
        "Building the frontend of the MVP.",
        "Tech Stack: React.js, Typescript, Axios, TanstackQuery, Redux, JWT, Firebase.",
      ],
      projects: [
        "Built MVP frontend with React.js and TypeScript",
        "Implemented state management with Redux",
        "Integrated REST APIs using Axios and TanStack Query",
      ],
    },
  ]

  const toggleExpand = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-24"
      ref={containerRef}
    >
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

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 -right-1/4 w-96 h-96 rounded-full opacity-30 mix-blend-multiply filter blur-xl"
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
        className="absolute -bottom-1/4 -left-1/4 w-[30rem] h-[30rem] rounded-full opacity-30 mix-blend-multiply filter blur-xl"
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

      {/* Content */}
      <motion.div className="container mx-auto px-4 relative z-10" style={{ opacity, y, scale }} ref={ref}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Work Experience</h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              My professional journey building exceptional digital experiences
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative mb-16 ${index % 2 === 0 ? "md:pr-12 md:text-right md:ml-0 md:mr-auto" : "md:pl-12 md:ml-auto md:mr-0"} md:w-1/2 w-full`}
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute top-0 md:top-2 ${index % 2 === 0 ? "right-0 md:-right-4" : "left-0 md:-left-4"} w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center z-10`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-xl">{exp.icon}</span>
                </motion.div>

                {/* Experience card */}
                <motion.div
                  className="bg-white rounded-xl shadow-xl overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Card header with gradient */}
                  <div className={`h-2 bg-gradient-to-r ${exp.color}`} />

                  <div className="p-6">
                    <div className="flex flex-col mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{exp.company}</h3>
                      <p className="text-xl text-gray-700 font-medium">{exp.position}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{exp.location}</span>
                        </div>
                        <motion.div
                          className="flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1 rounded-full border border-indigo-100"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Globe className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                          <span className="font-medium text-indigo-700">{exp.jobType}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable content */}
                    <div className="mt-4">
                      <motion.button
                        className="flex items-center justify-between w-full py-2 text-left text-gray-800 font-medium"
                        onClick={() => toggleExpand(index)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center">
                          <Briefcase className="w-5 h-5 mr-2" />
                          Responsibilities & Projects
                        </span>
                        <motion.div
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pb-2 space-y-6">
                              <div>
                                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                                  <Code className="w-4 h-4 mr-2" />
                                  Key Responsibilities
                                </h4>
                                <ul className="space-y-2 pl-6 text-left">
                                  {exp.responsibilities.map((item, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="text-gray-700 list-disc"
                                    >
                                      {item}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Notable Projects
                                </h4>
                                <ul className="space-y-2 pl-6 text-left">
                                  {exp.projects.map((project, i) => (
                                    <motion.li
                                      key={i}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: i * 0.1 + 0.3 }}
                                      className="text-gray-700 list-disc"
                                    >
                                      {project}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Experience

