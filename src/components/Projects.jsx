"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import ProjectThumbnail from "./ProjectThumbnail"
import { projects } from "@/constants/constants"

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentProject, setCurrentProject] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextProject = useCallback(() => {
    setDirection(1)
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }, [])

  const prevProject = useCallback(() => {
    setDirection(-1)
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextProject()
      if (e.key === "ArrowLeft") prevProject()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextProject, prevProject])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  return (
    <section id="projects" className="relative py-12 md:py-24 overflow-hidden">
      {/* Background elements */}
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
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          Featured Projects
        </motion.h2>
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentProject}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col lg:flex-row items-center gap-8 md:gap-12"
            >
              <div className="w-full lg:w-1/2">
                <ProjectThumbnail title={projects[currentProject].title} color={projects[currentProject].color} />
              </div>
              <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
                <motion.h3
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold`}
                  style={{
                    color: projects[currentProject].color,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {projects[currentProject].title}
                </motion.h3>
                <motion.p
                  className="text-base md:text-lg lg:text-xl text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {projects[currentProject].description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {projects[currentProject].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  >
                    <a
                      href={projects[currentProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto hover:bg-gray-800 hover:text-white transition-colors duration-300"
                  >
                    <a
                      href={projects[currentProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      View Code <Github className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          className="flex justify-center mt-8 md:mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={prevProject}
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
          <Button
            onClick={nextProject}
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-gray-100 transition-colors duration-300"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

