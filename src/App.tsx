import { useState } from "react"
import Header from "./components/Header"
import CommandPalette from "./components/CommandPalette"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import EtchedAccretion, { AccretionPreset } from "./components/ui/etched-accretion"
import { ArrowDown, Terminal } from "lucide-react"

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [preset, setPreset] = useState<AccretionPreset>("crimson")

  return (
    <div className="min-h-screen bg-[#07080a] text-[#cdcdcd] selection:bg-[#ff6161]/30 selection:text-white relative">
      {/* Persistent Full-Page WebGL2 Accretion Shader Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <EtchedAccretion
          height="100%"
          preset={preset}
          interactive={true}
          className="h-full w-full"
        />
      </div>

      {/* Navigation Header */}
      <Header onOpenCommand={() => setCommandOpen(true)} />

      {/* Hero Section */}
      <section className="relative z-10 w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full h-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-between pt-24 pb-8 sm:pb-12 pointer-events-none">
          {/* Top Eyebrow / Kicker */}
          <div className="pointer-events-auto flex items-center justify-between">
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.18em] text-[#ff6161] uppercase">
              Full-Stack Developer · Web Systems
            </div>
          </div>

          {/* Center / Bottom Headline */}
          <div className="max-w-3xl pointer-events-auto space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.08] sm:leading-[1.04]">
                Mhyco Giselo P. Bunao
              </h1>
              <p className="mt-2.5 sm:mt-3 text-base sm:text-2xl text-[#cdcdcd] font-normal tracking-tight">
                Software Engineer & Full-Stack Developer
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#9c9c9d] leading-relaxed max-w-2xl">
              Building full-stack web applications, dependable backend services, and clean, responsive user interfaces. Based in the Philippines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs sm:text-sm hover:bg-[#e8e8e8] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-[#121212] border border-[#242728] text-white text-xs sm:text-sm font-medium hover:border-[#ff6161]/50 hover:bg-[#18191a] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Get in Touch
              </a>
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#121212]/80 backdrop-blur-md border border-[#242728] text-xs font-mono text-[#cdcdcd] hover:text-white hover:border-[#ff6161]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Terminal className="w-3.5 h-3.5 text-[#ff6161]" />
                <span>⌘K Palette</span>
              </button>
            </div>
          </div>

          {/* Bottom Meta & Scroll Hint */}
          <div className="pointer-events-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#9c9c9d]">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#9c9c9d]/80">
              <span>Interactive shader canvas</span>
            </div>
            <a
              href="#work"
              className="group flex items-center gap-1.5 hover:text-white transition-colors w-fit text-xs min-h-[36px]"
            >
              <span>Scroll to projects</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#ff6161] group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>

      {/* Spectrum UI Style Footer */}
      <Footer />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        currentPreset={preset}
        onSelectPreset={(newPreset) => setPreset(newPreset)}
      />
    </div>
  )
}
