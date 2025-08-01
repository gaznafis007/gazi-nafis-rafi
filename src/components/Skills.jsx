"use client"

import { useState, useRef, useEffect } from "react"
import { AiFillThunderbolt } from "react-icons/ai";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  useAnimationControls,
  useScroll,
} from "framer-motion"
import { FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaGem } from "react-icons/fa"
import { IoLogoJavascript, IoLogoReact, IoLogoFirebase } from "react-icons/io5"
import { TbBrandNextjs, TbBrandOauth, TbBrandReactNative, TbBrandVscode } from "react-icons/tb"
import {
  SiTypescript,
  SiBootstrap,
  SiAxios,
  SiExpress,
  SiJsonwebtokens,
  SiSupabase,
  SiFigma,
  SiPostman,
  SiMaterialdesign,
  SiTailwindcss,
  SiShadcnui,
  SiRedux,
  SiMongodb,
  SiPostgresql,
  SiOpenai,
  SiGooglegemini,
  SiNestjs,
  SiMysql,
} from "react-icons/si"
import { DiGoogleAnalytics } from "react-icons/di";
import { GiSpermWhale } from "react-icons/gi";
import { BsCursorFill } from "react-icons/bs";

const skillCategories = {
  Languages: [
    { name: "JavaScript", icon: <IoLogoJavascript />, color: "#F7DF1E", animationType: "bounce" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", animationType: "rotate" },
    { name: "Python", icon: <FaPython />, color: "#3776AB", animationType: "pulse" },
  ],
  Frontend: [
    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", animationType: "bounce" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", animationType: "rotate" },
    { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952B3", animationType: "pulse" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4", animationType: "bounce" },
    { name: "Material UI", icon: <SiMaterialdesign />, color: "#0081CB", animationType: "rotate" },
    { name: "Shadcn UI", icon: <SiShadcnui />, color: "#000000", animationType: "pulse" },
    { name: "React.js", icon: <IoLogoReact />, color: "#61DAFB", animationType: "spin" },
    { name: "Next.js", icon: <TbBrandNextjs />, color: "#000000", animationType: "bounce" },
    { name: "React Native", icon: <TbBrandReactNative />, color: "#61DAFB", animationType: "rotate" },
    { name: "Redux", icon: <SiRedux />, color: "#764ABC", animationType: "pulse" },
    { name: "TanStack Query", icon: <IoLogoReact />, color: "#FF4154", animationType: "bounce" },
    { name: "Axios", icon: <SiAxios />, color: "#5A29E4", animationType: "rotate" },
    { name: "REST API", icon: <DiGoogleAnalytics />, color: "#F4B400", animationType: "pulse" },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933", animationType: "bounce" },
    { name: "Nest.js", icon: <SiNestjs />, color: "#E0234E", animationType: "pulse" },
    { name: "Express.js", icon: <SiExpress />, color: "#000000", animationType: "rotate" },
    { name: "MySQL", icon: <SiMysql />, color: "#005C84", animationType: "bounce" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", animationType: "pulse" },
    { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E", animationType: "rotate" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", animationType: "bounce" },
    { name: "Firebase", icon: <IoLogoFirebase />, color: "#FFCA28", animationType: "pulse" },
    { name: "JWT", icon: <SiJsonwebtokens />, color: "#D63AE1", animationType: "rotate" },
    { name: "OAuth", icon: <TbBrandOauth />, color: "#000000", animationType: "bounce" },
  ],
  Tools: [
    { name: "Figma", icon: <SiFigma />, color: "#F24E1E", animationType: "bounce" },
    { name: "VS Code", icon: <TbBrandVscode />, color: "#007ACC", animationType: "rotate" },
    { name: "Postman", icon: <SiPostman />, color: "#FF6C37", animationType: "pulse" },
    { name: "Thunder Client", icon: <AiFillThunderbolt />, color: "#4B0082", animationType: "bounce" },
    { name: "OpenAI", icon: <SiOpenai />, color: "#412991", animationType: "rotate" },
    { name: "Gemini", icon: <SiGooglegemini />, color: "#8E4EC6", animationType: "pulse" },
    { name: "Grok", icon: <FaGem />, color: "#00A3E0", animationType: "bounce" },
    { name: "Deepseek", icon: <GiSpermWhale />, color: "#007ACC", animationType: "rotate" },
    { name: "Cursor", icon: <BsCursorFill />, color: "#FF6347", animationType: "pulse" },
  ],
}

// Custom hook for particle animation
const useParticles = (count = 20) => {
  const particles = Array.from({ length: count }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    color: `hsl(${Math.random() * 60 + 240}, 70%, 70%)`,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))
  return particles
}

// Skill Icon Component with Advanced Animations
const SkillIcon = ({ skill, index }) => {
  const controls = useAnimationControls()
  const iconRef = useRef(null)
  const isInView = useInView(iconRef, { once: false, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  // Random rotation for initial state
  const initialRotation = Math.random() * 10 - 5

  // Animation variants based on type
  const getAnimationVariant = () => {
    switch (skill.animationType) {
      case "bounce":
        return {
          animate: {
            y: [0, -8, 0],
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeatDelay: Math.random() * 2,
            },
          },
        }
      case "rotate":
        return {
          animate: {
            rotate: [initialRotation, initialRotation + 10, initialRotation - 10, initialRotation],
            transition: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1],
              repeatDelay: Math.random(),
            },
          },
        }
      case "pulse":
        return {
          animate: {
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
            transition: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeatDelay: Math.random(),
            },
          },
        }
      case "spin":
        return {
          animate: {
            rotate: [0, 360],
            transition: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          },
        }
      default:
        return {
          animate: {
            scale: [1, 1.05, 1],
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          },
        }
    }
  }

  const animationVariant = getAnimationVariant()

  // Hover animation
  const hoverVariants = {
    hover: {
      scale: 1.2,
      rotate: skill.animationType === "spin" ? 360 : 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  // Trigger animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start("animate")
    }
  }, [isInView, controls])

  // Generate particles for hover effect
  const particles = useParticles(8)

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        ref={iconRef}
        className="relative z-10 text-3xl"
        style={{ color: skill.color }}
        initial="initial"
        animate={controls}
        variants={{ ...animationVariant, ...hoverVariants }}
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {skill.icon}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ backgroundColor: skill.color }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Particles on hover */}
      <AnimatePresence>
        {isHovered &&
          particles.map((particle, i) => (
            <motion.div
              key={`particle-${index}-${i}`}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: (particle.x - 50) * 2,
                y: (particle.y - 50) * 2,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: particle.duration / 10,
                ease: "easeOut",
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Languages")
  const [selectedSkill, setSelectedSkill] = useState(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Mouse follower effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  const handleMouseMove = (e) => {
    const { left, top } = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  // Parallax effect for background elements
  const parallaxY = useTransform(smoothMouseY, [0, 1000], [-20, 20])
  const parallaxX = useTransform(smoothMouseX, [0, 1000], [-20, 20])

  // Scroll-linked animations
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: i * 0.03,
      },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: {
      scale: 0.95,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: i * 0.1,
      },
    }),
  }

  // Generate gradient based on active category
  const getCategoryColor = () => {
    switch (activeCategory) {
      case "Languages":
        return "from-violet-600 to-indigo-600"
      case "Frontend":
        return "from-blue-600 to-cyan-500"
      case "Backend":
        return "from-emerald-600 to-teal-500"
      case "Tools":
        return "from-amber-500 to-orange-500"
      default:
        return "from-violet-600 to-indigo-600"
    }
  }

  // Generate background gradient for category
  const getCategoryBgColor = () => {
    switch (activeCategory) {
      case "Languages":
        return "from-violet-50 to-indigo-100"
      case "Frontend":
        return "from-blue-50 to-cyan-100"
      case "Backend":
        return "from-emerald-50 to-teal-100"
      case "Tools":
        return "from-amber-50 to-orange-100"
      default:
        return "from-violet-50 to-indigo-100"
    }
  }

  // Generate text color for category
  const getCategoryTextColor = () => {
    switch (activeCategory) {
      case "Languages":
        return "text-violet-600"
      case "Frontend":
        return "text-blue-600"
      case "Backend":
        return "text-emerald-600"
      case "Tools":
        return "text-amber-500"
      default:
        return "text-violet-600"
    }
  }

  // Generate shadow color for category
  const getCategoryShadowColor = () => {
    switch (activeCategory) {
      case "Languages":
        return "shadow-violet-500/20"
      case "Frontend":
        return "shadow-blue-500/20"
      case "Backend":
        return "shadow-emerald-500/20"
      case "Tools":
        return "shadow-amber-500/20"
      default:
        return "shadow-violet-500/20"
    }
  }

  return (
    <motion.section
      id="skills"
      ref={containerRef}
      className="relative py-20 md:py-32 min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        opacity: backgroundOpacity,
        scale: backgroundScale,
      }}
    >
      {/* Dynamic 3D Background */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-b ${getCategoryBgColor()} overflow-hidden transition-colors duration-700`}
      >
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-300/30 to-pink-300/30 blur-3xl"
          style={{
            x: useTransform(smoothMouseX, [0, 1000], [-30, 30]),
            y: useTransform(smoothMouseY, [0, 1000], [-30, 30]),
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-300/30 to-teal-300/30 blur-3xl"
          style={{
            x: useTransform(smoothMouseX, [0, 1000], [30, -30]),
            y: useTransform(smoothMouseY, [0, 1000], [30, -30]),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-amber-300/20 to-orange-300/20 blur-3xl"
          style={{
            x: useTransform(smoothMouseX, [0, 1000], [20, -20]),
            y: useTransform(smoothMouseY, [0, 1000], [-20, 20]),
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        {/* Grid pattern */}
        <motion.div className="absolute inset-0 opacity-[0.07]" style={{ x: parallaxX, y: parallaxY }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(94, 63, 141, 0.7)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>
      </div>

      {/* Mouse follower */}
      <motion.div
        className="hidden md:block absolute w-40 h-40 rounded-full pointer-events-none mix-blend-multiply"
        style={{
          background: "radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, rgba(138, 43, 226, 0) 70%)",
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-12 md:mb-16 text-center"
          variants={titleVariants}
          style={{
            scale: titleScale,
            opacity: titleOpacity,
          }}
        >
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${getCategoryColor()} transition-colors duration-700`}
          >
            Technical Expertise
          </span>
        </motion.h2>

        {/* Category Pills */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12" variants={containerVariants}>
          {Object.keys(skillCategories).map((category, index) => (
            <motion.button
              key={category}
              variants={categoryVariants}
              custom={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                activeCategory === category
                  ? `bg-gradient-to-r ${getCategoryColor()} text-white shadow-lg ${getCategoryShadowColor()}`
                  : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.08)`,
          }}
        >
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
                variants={containerVariants}
              >
                {skillCategories[activeCategory].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    custom={index}
                    variants={skillVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedSkill(skill)}
                    className="group cursor-pointer"
                  >
                    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-white shadow-md hover:shadow-lg transition-all duration-300 h-full">
                      {/* Background glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: skill.color }}
                        whileHover={{
                          opacity: 0.2,
                        }}
                      />

                      {/* Icon with animation */}
                      <div className="relative mb-4 p-4 rounded-full bg-white shadow-sm">
                        <SkillIcon skill={skill} index={index} />
                      </div>

                      {/* Skill name with animated underline */}
                      <div className="relative">
                        <span
                          className={`text-sm font-medium ${getCategoryTextColor()} text-center transition-colors duration-700`}
                        >
                          {skill.name}
                        </span>
                        <motion.div
                          className="absolute -bottom-2 left-1/2 h-0.5 bg-gradient-to-r"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${skill.color}, ${skill.color}88)`,
                            width: "0%",
                            x: "-50%",
                          }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category description */}
        <motion.div
          className="mt-8 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className={`${getCategoryTextColor()} transition-colors duration-700`}>
            {activeCategory === "Languages" && "Programming languages I'm proficient in."}
            {activeCategory === "Frontend" && "Technologies I use to build beautiful, responsive user interfaces."}
            {activeCategory === "Backend" && "Tools and frameworks I use for server-side development."}
            {activeCategory === "Tools" && "Software and utilities that enhance my development workflow."}
          </p>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: `${selectedSkill.color}20` }}>
                  <div className="text-3xl" style={{ color: selectedSkill.color }}>
                    {selectedSkill.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{selectedSkill.name}</h3>
              </div>

              <p className="text-gray-600 mb-4">
                {selectedSkill.name} is a {activeCategory.toLowerCase().slice(0, -1)} technology that I use regularly in
                my projects.
              </p>

              <div className="flex justify-end">
                <motion.button
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(null)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
