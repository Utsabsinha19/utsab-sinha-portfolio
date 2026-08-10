import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import TechStrip from "@/components/techstrip/TechStrip";
import AIStack from "@/components/aistack/AIStack";
import Projects from "@/components/projects/Projects";
import AILab from "@/components/ailab/AILab";
import Process from "@/components/process/Process";
import Experience from "@/components/experience/Experience";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-app text-ink transition-colors duration-300">
      <Navbar />
      <Hero />
      <TechStrip />
      <Projects />
      <AIStack />
      <AILab />
      <Process />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
