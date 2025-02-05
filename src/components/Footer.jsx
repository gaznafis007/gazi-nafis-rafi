"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.footer
      className="bg-muted/30 py-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <motion.a
            href="https://github.com/gaznafis007/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LuGithub className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/gazi-nafis-4712771a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <LuLinkedin className="h-6 w-6" />
          </motion.a>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaXTwitter className="h-6 w-6" />
          </motion.a>
        </div>
        <motion.p
          className="text-center mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          © {new Date().getFullYear()} Gazi Nafis Rafi. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  )
}

export default Footer

