"use client"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"
import { useToast } from "@/hooks/use-toast"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const formRef = useRef()
  const controls = useAnimation()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID, formRef.current, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: 5000,
      })

      setFormData({ name: "", email: "", message: "" })
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 },
      })
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold mb-16 text-center text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          Get in Touch
        </motion.h2>
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border-2 border-gray-200 focus:border-gray-400 rounded-lg p-4 text-lg"
            />
          </motion.div>
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white border-2 border-gray-200 focus:border-gray-400 rounded-lg p-4 text-lg"
            />
          </motion.div>
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-white border-2 border-gray-200 focus:border-gray-400 rounded-lg p-4 text-lg min-h-[150px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white text-lg py-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={isSubmitting}
              animate={controls}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact

