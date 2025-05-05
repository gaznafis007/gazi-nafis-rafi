"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  User,
  Mail,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Phone,
  MapPin,
  Check,
  Copy,
  Save,
  Clock,
  AlertCircle,
} from "lucide-react"
import emailjs from "@emailjs/browser"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const [formCompleted, setFormCompleted] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)
  const [copied, setCopied] = useState(null)
  const { toast } = useToast()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const formRef = useRef()
  const messageMaxLength = 500

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("contactFormDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setFormData(parsedDraft)

        // Check if form is completed
        const requiredFields = ["name", "email", "message"]
        const isComplete = requiredFields.every((field) => parsedDraft[field] && parsedDraft[field].trim() !== "")
        setFormCompleted(isComplete)
      } catch (e) {
        console.error("Error parsing saved draft", e)
      }
    }
  }, [])

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.length > messageMaxLength) {
      errors.message = `Message is too long (max ${messageMaxLength} characters)`
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    // Check if all required fields are filled
    const requiredFields = ["name", "email", "message"]
    const allFilled = requiredFields.every((field) =>
      field === name ? value.trim() !== "" : formData[field] && formData[field].trim() !== "",
    )
    setFormCompleted(allFilled)

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null })
    }
  }

  const saveDraft = () => {
    localStorage.setItem("contactFormDraft", JSON.stringify(formData))
    setDraftSaved(true)

    toast({
      title: "Draft saved",
      description: "Your message has been saved as a draft.",
      duration: 3000,
    })

    // Reset the saved indicator after 3 seconds
    setTimeout(() => setDraftSaved(false), 3000)
  }

  const copyContact = (type, value) => {
    navigator.clipboard.writeText(value)
    setCopied(type)

    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Form has errors",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    setIsSubmitting(true)

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
      )

      // Clear the saved draft
      localStorage.removeItem("contactFormDraft")

      // Show success animation
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        setFormData({ name: "", email: "", message: "" })
        setFormCompleted(false)
      }, 3000)

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: 5000,
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

  // Form field icons with their colors
  const formIcons = {
    name: { icon: User, color: "text-violet-600", bgColor: "bg-violet-50" },
    email: { icon: Mail, color: "text-indigo-600", bgColor: "bg-indigo-50" },
    message: { icon: MessageSquare, color: "text-purple-600", bgColor: "bg-purple-50" },
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      text: "gazinafisrafi.gnr@gmail.com",
      type: "email",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      text: "+880 (177) 819-9178",
      type: "phone",
      color: "bg-violet-100 text-violet-600",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Chittagong, Bangladesh",
      type: "location",
      color: "bg-pink-100 text-pink-600",
    },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
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

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-30 mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, rgba(236,72,153,0.7) 0%, rgba(236,72,153,0) 70%)" }}
          />

          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-30 mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.7) 0%, rgba(99,102,241,0) 70%)" }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full rounded-full opacity-30 mix-blend-multiply filter blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.7) 0%, rgba(124,58,237,0) 70%)" }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50, 0],
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Let's Connect</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Get in Touch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I'm always open to new opportunities and collaborations. Let's create something amazing together!
            </p>
          </motion.div>

          <motion.div
            className="relative bg-white/30 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Illustration and Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col space-y-8"
              >
                <div className="relative max-w-md w-full mx-auto">
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-75 blur-lg"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(99, 102, 241, 0.5)",
                        "0 0 40px rgba(99, 102, 241, 0.3)",
                        "0 0 20px rgba(99, 102, 241, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="relative bg-white rounded-3xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src={"/assets/contact-illustration.png" || "/placeholder.svg"}
                      alt="Contact illustration"
                      width={500}
                      height={400}
                      className="w-full h-auto"
                    />

                    {/* Floating elements around the image */}
                    <motion.div
                      className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                        <Mail className="h-5 w-5" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-2 -left-2 bg-white rounded-full p-2 shadow-lg"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Contact info with copy buttons */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${info.color}`}>{info.icon}</div>
                          <span className="text-gray-700">{info.text}</span>
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => copyContact(info.type, info.text)}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copied === info.type ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Response time indicator */}
                  <motion.div
                    className="flex items-center gap-2 text-sm text-gray-500 mt-4"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 }}
                  >
                    <Clock className="h-4 w-4" />
                    <span>Average response time: 24-48 hours</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <AnimatePresence>
                  {showSuccess ? (
                    <motion.div
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-10 w-10 text-green-600" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                      <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Name field */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <div
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 ${formIcons.name.color}`}
                        >
                          <formIcons.name.icon className="h-5 w-5" />
                        </div>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                          required
                          className={`pl-12 py-6 rounded-xl transition-all duration-300 backdrop-blur-sm border-0 ${
                            activeField === "name"
                              ? "bg-white shadow-md"
                              : formErrors.name
                                ? "border-2 border-red-300 bg-white/70"
                                : "bg-white/70 border border-gray-200"
                          }`}
                          style={{
                            boxShadow: activeField === "name" ? "none" : "",
                            outline: "none",
                          }}
                        />

                        {/* Underline effect that won't be affected by other styles */}
                        <AnimatePresence>
                          {activeField === "name" && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full z-20"
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Error message */}
                        <AnimatePresence>
                          {formErrors.name && (
                            <motion.div
                              className="flex items-center gap-1 text-red-500 text-sm mt-1 pl-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <AlertCircle className="h-3 w-3" />
                              <span>{formErrors.name}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Email field */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        <div
                          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 ${formIcons.email.color}`}
                        >
                          <formIcons.email.icon className="h-5 w-5" />
                        </div>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setActiveField("email")}
                          onBlur={() => setActiveField(null)}
                          required
                          className={`pl-12 py-6 rounded-xl transition-all duration-300 backdrop-blur-sm border-0 ${
                            activeField === "email"
                              ? "bg-white shadow-md"
                              : formErrors.email
                                ? "border-2 border-red-300 bg-white/70"
                                : "bg-white/70 border border-gray-200"
                          }`}
                          style={{
                            boxShadow: activeField === "email" ? "none" : "",
                            outline: "none",
                          }}
                        />

                        {/* Underline effect */}
                        <AnimatePresence>
                          {activeField === "email" && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full z-20"
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Error message */}
                        <AnimatePresence>
                          {formErrors.email && (
                            <motion.div
                              className="flex items-center gap-1 text-red-500 text-sm mt-1 pl-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <AlertCircle className="h-3 w-3" />
                              <span>{formErrors.email}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Message field */}
                      <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className={`absolute left-4 top-6 z-10 ${formIcons.message.color}`}>
                          <formIcons.message.icon className="h-5 w-5" />
                        </div>
                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setActiveField("message")}
                          onBlur={() => setActiveField(null)}
                          required
                          className={`pl-12 py-4 rounded-xl transition-all duration-300 min-h-[150px] backdrop-blur-sm border-0 ${
                            activeField === "message"
                              ? "bg-white shadow-md"
                              : formErrors.message
                                ? "border-2 border-red-300 bg-white/70"
                                : "bg-white/70 border border-gray-200"
                          }`}
                          style={{
                            boxShadow: activeField === "message" ? "none" : "",
                            outline: "none",
                          }}
                        />

                        {/* Underline effect */}
                        <AnimatePresence>
                          {activeField === "message" && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full z-20"
                              initial={{ scaleX: 0, originX: 0 }}
                              animate={{ scaleX: 1 }}
                              exit={{ scaleX: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Character counter */}
                        <div
                          className={`flex justify-end mt-1 text-xs ${
                            formData.message.length > messageMaxLength ? "text-red-500" : "text-gray-500"
                          }`}
                        >
                          {formData.message.length}/{messageMaxLength}
                        </div>

                        {/* Error message */}
                        <AnimatePresence>
                          {formErrors.message && (
                            <motion.div
                              className="flex items-center gap-1 text-red-500 text-sm mt-1 pl-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <AlertCircle className="h-3 w-3" />
                              <span>{formErrors.message}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Action buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="flex gap-3"
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={`flex-1 py-6 rounded-xl transition-all duration-500 shadow-lg ${
                            formCompleted
                              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:shadow-indigo-200 hover:shadow-xl text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                          style={{
                            backgroundSize: formCompleted ? "200% 100%" : "100% 100%",
                            backgroundPosition: formCompleted ? "right center" : "left center",
                          }}
                          whileHover={formCompleted ? { backgroundPosition: "left center" } : {}}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <motion.div
                              className="flex items-center justify-center gap-2"
                              animate={formCompleted ? { x: [0, 5, 0] } : {}}
                              transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
                            >
                              Send Message
                              <ArrowRight
                                className={`h-5 w-5 transition-transform duration-300 ${formCompleted ? "translate-x-1" : ""}`}
                              />
                            </motion.div>
                          )}
                        </Button>

                        {/* Save draft button */}
                        <motion.button
                          type="button"
                          onClick={saveDraft}
                          disabled={!formData.name && !formData.email && !formData.message}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            draftSaved
                              ? "bg-green-50 border-green-200 text-green-600"
                              : (!formData.name && !formData.email && !formData.message)
                                ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
                                : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                          }`}
                          whileHover={{ scale: !formData.name && !formData.email && !formData.message ? 1 : 1.05 }}
                          whileTap={{ scale: !formData.name && !formData.email && !formData.message ? 1 : 0.95 }}
                        >
                          {draftSaved ? <Check className="h-5 w-5" /> : <Save className="h-5 w-5" />}
                        </motion.button>
                      </motion.div>

                      {/* Progress indicator */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(Object.values(formData).filter(Boolean).length / 3) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
