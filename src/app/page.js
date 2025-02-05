import About from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";




export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Projects/>
    </main>
  )
}

