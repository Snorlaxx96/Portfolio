import { useState } from "react"
import Header from "./components/Header"
import CommandPalette from "./components/CommandPalette"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import EtchedAccretion, { AccretionPreset } from "./components/ui/etched-accretion"
import TiltCard from "./components/ui/TiltCard"
import { ArrowDown, Terminal, Layers, ShieldCheck, Zap, Activity } from "lucide-react"

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [preset, setPreset] = useState<AccretionPreset>("ash")

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
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#ff6161] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff6161] animate-ping opacity-75" />
              <span>Full-Stack Engineering & WebGL Physics</span>
            </div>
          </div>

          {/* Center / Bottom Headline */}
          <div className="max-w-3xl pointer-events-auto space-y-6">
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.04]">
                Mhyco Giselo P. Bunao
              </h1>
              <p className="mt-3 text-lg sm:text-2xl text-[#cdcdcd] font-normal tracking-tight">
                Software Engineer & Full-Stack Developer
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#9c9c9d] leading-relaxed max-w-2xl">
              Engineering high-throughput distributed systems, fault-isolated backend pipelines, and precision-tuned interactive web experiences with zero architectural bloat.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#e8e8e8] transition-colors cursor-pointer"
              >
                Explore Works
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-[#121212] border border-[#242728] text-white text-xs font-medium hover:border-[#ff6161]/50 hover:bg-[#18191a] transition-colors cursor-pointer"
              >
                Get in Touch
              </a>
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#121212]/80 backdrop-blur-md border border-[#242728] text-xs font-mono text-[#cdcdcd] hover:text-white hover:border-[#ff6161]/50 transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-[#ff6161]" />
                <span>⌘K Quick Menu</span>
              </button>
            </div>
          </div>

          {/* Bottom Meta & Parallax Hint */}
          <div className="pointer-events-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#9c9c9d]">
            <div className="flex items-center gap-2 text-xs text-[#9c9c9d]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6161]" />
              <span>Interactive gravitational lensing · Follows cursor & scroll</span>
            </div>
            <a
              href="#telemetry"
              className="group flex items-center gap-1.5 hover:text-white transition-colors w-fit text-xs"
            >
              <span>Scroll down</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#ff6161] group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Telemetry & Metrics Floating Glass HUD Capsule */}
      <section id="telemetry" className="relative z-10 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <TiltCard
            maxTilt={3}
            scale={1.008}
            glare={true}
            glareOpacity={0.06}
            className="rounded-2xl bg-[#0c0d10]/80 backdrop-blur-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)] p-2 sm:p-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-0 lg:divide-x lg:divide-white/10">
              {/* Metric 1 */}
              <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#242728] flex items-center justify-center text-[#ff6161] shadow-[0_0_14px_rgba(255,97,97,0.2)] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-mono tracking-tight leading-none">
                    4+ Years
                  </div>
                  <div className="text-xs text-[#a3a3a4] font-medium mt-1.5 leading-none">
                    Full-Stack Engineering
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#242728] flex items-center justify-center text-[#59d499] shadow-[0_0_14px_rgba(89,212,153,0.2)] shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-mono tracking-tight leading-none">
                    99.98%
                  </div>
                  <div className="text-xs text-[#a3a3a4] font-medium mt-1.5 leading-none">
                    Production Service Uptime
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#242728] flex items-center justify-center text-[#57c1ff] shadow-[0_0_14px_rgba(87,193,255,0.2)] shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-mono tracking-tight leading-none">
                    100% Modern
                  </div>
                  <div className="text-xs text-[#a3a3a4] font-medium mt-1.5 leading-none">
                    React, TypeScript & Node.js
                  </div>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center gap-3.5 p-3 sm:p-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#121316] border border-[#242728] flex items-center justify-center text-[#ffc533] shadow-[0_0_14px_rgba(255,197,51,0.2)] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white font-mono tracking-tight leading-none">
                    &lt;100ms
                  </div>
                  <div className="text-xs text-[#a3a3a4] font-medium mt-1.5 leading-none">
                    Target Edge Latency
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
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
