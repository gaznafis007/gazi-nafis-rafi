"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaHtml5, FaCss3Alt, FaNodeJs } from "react-icons/fa"
import { IoLogoJavascript, IoLogoReact, IoLogoFirebase } from "react-icons/io5"
import { TbBrandNextjs } from "react-icons/tb"
import { BiLogoRedux, BiLogoMongodb, BiLogoTailwindCss } from "react-icons/bi"
import { SiExpress, SiShadcnui } from "react-icons/si"

const skillCategories = {
  Frontend: [
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "JavaScript", icon: IoLogoJavascript, color: "#F7DF1E" },
    { name: "React", icon: IoLogoReact, color: "#61DAFB" },
    { name: "Next.js", icon: TbBrandNextjs, color: "#000000" },
    { name: "Redux", icon: BiLogoRedux, color: "#764ABC" },
  ],
  Backend: [
    { name: "Node.js", icon: FaNodeJs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "MongoDB", icon: BiLogoMongodb, color: "#47A248" },
    { name: "Firebase", icon: IoLogoFirebase, color: "#FFCA28" },
  ],
  Styling: [
    { name: "Tailwind CSS", icon: BiLogoTailwindCss, color: "#06B6D4" },
    { name: "shadcn/ui", icon: SiShadcnui, color: "#000000" },
  ],
}

const SkillIcon = ({ icon: Icon, color }) => (
  <motion.div className="relative p-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <motion.div
      className="absolute inset-0 rounded-full blur-lg opacity-50"
      style={{ backgroundColor: color }}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
    <Icon className="relative z-10 w-8 h-8" style={{ color }} strokeWidth={1.5} />
  </motion.div>
)

const BackgroundShape = ({ color, size, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: initialPosition.x + (Math.random() - 0.5) * 50,
        y: initialPosition.y + (Math.random() - 0.5) * 50,
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [initialPosition])

  return (
    <motion.div
      className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
      animate={position}
      transition={{
        duration: 5,
        ease: "easeInOut",
      }}
    />
  )
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background shapes */}
      <BackgroundShape color="#3B82F6" size={300} initialPosition={{ x: -100, y: -100 }} />
      <BackgroundShape color="#10B981" size={250} initialPosition={{ x: 100, y: 100 }} />
      <BackgroundShape color="#F59E0B" size={200} initialPosition={{ x: 200, y: -150 }} />

      <div className="container px-4 mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Technical Expertise
        </motion.h2>

        <Tabs defaultValue="Frontend" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-11 items-center justify-center rounded-lg bg-white/50 backdrop-blur-sm p-1 text-muted-foreground relative">
              {Object.keys(skillCategories).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(skillCategories).map(([category, skills]) => (
            <TabsContent key={category} value={category}>
              <Card className="bg-white/80 backdrop-blur-sm border shadow-md">
                <CardContent className="p-8">
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.05 }}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-white/90 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <SkillIcon icon={skill.icon} color={skill.color} />
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 font-medium">
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mt-12 text-2xl font-medium text-gray-800"
            >
              {hoveredSkill}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

