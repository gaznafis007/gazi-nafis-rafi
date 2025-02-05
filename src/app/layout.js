import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Gazi Nafis Rafi",
  description: "A portfolio website for Gazi Nafis Md Abdullah who is a MERN stack developer",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <Toaster/>
      </body>
    </html>
  )
}

