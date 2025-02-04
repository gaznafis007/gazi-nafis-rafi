"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { navItems } from "@/constants/constants"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            Gazi Nafis Rafi
          </Link>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item?.name}
                href={`#${item?.name.toLowerCase()}`}
                className="text-foreground hover:text-blue-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-foreground" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-blue-500 transition-colors"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

