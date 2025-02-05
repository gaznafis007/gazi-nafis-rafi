"use client"

import { useState } from "react"
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

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          Featured Projects
        </motion.h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ProjectThumbnail title={projects[currentProject].title} color={projects[currentProject].color} />
              </motion.div>
              <div className="w-full lg:w-1/2 space-y-6">
                <motion.h3
                  className={`text-4xl font-bold`}
                  style={{
                    color: projects[currentProject].color
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {projects[currentProject].title}
                </motion.h3>
                <motion.p
                  className="text-xl text-gray-600"
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
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button asChild variant="outline" size="lg" className="hover:bg-blue-500 hover:text-white">
                    <a
                      href={projects[currentProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="hover:bg-gray-800 hover:text-white">
                    <a
                      href={projects[currentProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
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
          className="flex justify-center mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button onClick={prevProject} variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button onClick={nextProject} variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

