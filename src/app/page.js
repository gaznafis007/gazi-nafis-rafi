import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";




export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar/>
      <Hero/>
      <About/>
    </main>
  )
}

