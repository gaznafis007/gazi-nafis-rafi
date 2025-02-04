"use client"

import LoadingAnimation from "@/components/LoadingAnimation"
import { useState, useEffect } from "react"


export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can replace this with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return <>{isLoading ? <LoadingAnimation /> : children}</>
}

