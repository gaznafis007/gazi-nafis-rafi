"use client"

import { useState, useEffect } from "react"
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

  const nextProject = () => {
    setDirection(1)
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextProject()
      if (e.key === "ArrowLeft") prevProject()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextProject, prevProject]) // Added nextProject and prevProject to dependencies

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="projects" className="py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          Featured Projects
        </motion.h2>
        <div className="relative">
          <AnimatePresence initial={false} custom={direction}>
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
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {projects[currentProject].title}
                </motion.h3>
                <motion.p
                  className="text-base md:text-lg lg:text-xl text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {projects[currentProject].description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
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
                  transition={{ delay: 0.6, duration: 0.5 }}
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
          transition={{ delay: 0.7, duration: 0.5 }}
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

