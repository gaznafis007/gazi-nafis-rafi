"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import { FaReact, FaNodeJs, FaHtml5, FaCss3 } from "react-icons/fa";
import {
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";
import { IconCloud } from "./ui/icon-cloud";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
  };

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
  };

//   const icons = [
//     { icon: <FaReact size={80} color="#61DAFB" />, name: "React" },
//     { icon: <FaNodeJs size={24} color="#339933" />, name: "Node.js" },
//     { icon: <SiJavascript size={24} color="#F7DF1E" />, name: "JavaScript" },
//     { icon: <SiMongodb size={24} color="#47A248" />, name: "MongoDB" },
//     { icon: <SiExpress size={24} color="#000000" />, name: "Express" },
//     { icon: <SiNextdotjs size={24} color="#000000" />, name: "Next.js" },
//     { icon: <FaHtml5 size={24} color="#E34F26" />, name: "HTML5" },
//     { icon: <FaCss3 size={80} color="#1572B6" />, name: "CSS3" },
//     { icon: <SiTailwindcss size={80} color="#06B6D4" />, name: "Tailwind CSS" },
//     { icon: <SiFirebase size={80} color="#FFCA28" />, name: "Firebase" },
//   ];
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
  ];
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%)",
            scale,
          }}
        />
        {/* Falling star-like shapes */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-32 h-32 blur-3xl opacity-20"
            style={{
              background: `linear-gradient(45deg, ${
                ["#ff6b6b", "#4ecdc4", "#45aaf2", "#7d5fff", "#fed330"][index]
              }, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 1000],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-gray-900"
          variants={itemVariants}
        >
          About Me
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="w-full lg:w-1/3"
            variants={iconCloudVariants}
          >
            <IconCloud
              images={images}
              config={{
                size: 600,
                depth: 1.5,
                radius: 200,
                initial: [0.7, -0.3],
                maxSpeed: 0.01,
                tooltip: true,
              }}
              className="w-full h-[300px]"
            />
          </motion.div>
          <div className="flex flex-col items-center justify-between gap-12">
            <motion.div className="lg:w-1/3" variants={itemVariants}>
              <div className="w-64 h-64 mx-auto relative">
                <div className="absolute inset-0 bg-indigo-100 rounded-full transform -rotate-6" />
                <div className="absolute inset-0 bg-indigo-200 rounded-full transform rotate-6" />
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

            <motion.div className="lg:w-2/3 space-y-6" variants={itemVariants}>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a passionate MERN stack developer, I bring ideas to life
                through clean, efficient code. My expertise spans HTML, CSS,
                JavaScript, React.js, Next.js, Redux, Express.js, Node.js,
                MongoDB, Firebase, Tailwind CSS, and shadcn/ui, enabling me to
                build responsive and scalable web applications.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My mission is to create intuitive user experiences while
                ensuring robust backend functionality. I thrive on learning new
                technologies and embracing challenging projects that push the
                boundaries of web development.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
  );
};

export default About;
