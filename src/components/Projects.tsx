import { ExternalLink, Github, ArrowUpRight, Coffee, CheckCircle2 } from "lucide-react"
import TiltCard from "./ui/TiltCard"

interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  description: string
  image: string
  tags: string[]
  stats: string
  demoUrl: string
  githubUrl: string
  features: string[]
}

const flagshipProject: Project = {
  id: "becoffee-flagship",
  title: "BeCoffee — Philippine Specialty Coffee & Roastery",
  subtitle: "Full-Stack Progressive Web Application & Online Ordering Platform",
  category: "Full-Stack Web Application",
  description:
    "Production web application for BeCoffee, an artisanal specialty coffee roastery in Zamboanga City (Putik & Baliwasan). Features end-to-end beverage ordering in Philippine Pesos (₱), real-time cart persistence, responsive multi-breakpoint layout, and member profile management with zero-cache lag modal sheets.",
  image: "https://becoffee-cafe.web.app/images/sanctuary/warm_teak_interior.webp",
  tags: [
    "Progressive Web App",
    "Firebase Hosting",
    "Vanilla ESNext",
    "Responsive Design",
    "PWA Architecture",
    "Local Storage State",
  ],
  stats: "Live Production · PWA",
  demoUrl: "https://becoffee-cafe.web.app",
  githubUrl: "https://github.com/Snorlaxx96",
  features: [
    "End-to-end client-side ordering cart with beverage customization and real-time Philippine Peso (₱) calculations",
    "Interactive table and experience reservation workflow with mobile modal sheet guards and zero layout thrashing",
    "Multi-location outpost directory with real-time operating hours telemetry across Putik and Baliwasan branches",
    "Progressive Web App (PWA) manifest with asset caching and responsive picture elements for fast loads",
  ],
}

export default function Projects() {
  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#242728]">
      {/* Section Header */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
          Featured Engineering System
        </h2>
        <p className="text-xs sm:text-sm text-[#9c9c9d] mt-2 max-w-xl leading-relaxed">
          Architected and engineered a live production web application and digital ordering platform for BeCoffee in the Philippines.
        </p>
      </div>

      {/* Flagship Showcase Card with 3D Perspective Spring Tilt */}
      <TiltCard
        maxTilt={6}
        perspective={1200}
        scale={1.01}
        glare={true}
        glareOpacity={0.08}
        className="group relative rounded-xl bg-[#0d0d0d] border border-[#242728] hover:border-[#ff6161]/60 transition-colors duration-300 overflow-hidden"
      >
        {/* Media Container with Scrim Overlay */}
        <div className="relative w-full h-64 sm:h-96 overflow-hidden">
          <img
            src={flagshipProject.image}
            alt={flagshipProject.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-100"
            loading="lazy"
          />
          {/* Dark Scrim overlay guaranteeing WCAG AA text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />

          {/* Top Badges - 3D floating layer */}
          <div
            className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#07080a]/90 backdrop-blur-md border border-[#242728] text-[11px] sm:text-xs font-mono text-white shadow-lg">
              <Coffee className="w-3.5 h-3.5 text-[#ff6161]" />
              <span>{flagshipProject.category}</span>
            </div>
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#07080a]/90 backdrop-blur-md border border-[#242728] text-[11px] sm:text-xs font-mono text-[#59d499] shadow-lg">
              {flagshipProject.stats}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-8">
          <div className="text-[11px] sm:text-xs font-mono text-[#9c9c9d] mb-1">
            {flagshipProject.subtitle}
          </div>
          <h3 className="text-xl sm:text-3xl font-semibold text-white group-hover:text-[#ff6161] transition-colors flex items-center gap-2">
            {flagshipProject.title}
            <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
          </h3>
          <p className="text-xs sm:text-sm text-[#cdcdcd] mt-3 leading-relaxed max-w-3xl">
            {flagshipProject.description}
          </p>

          {/* Key Architectural Highlights */}
          <div className="mt-6 pt-6 border-t border-[#242728] grid grid-cols-1 sm:grid-cols-2 gap-3">
            {flagshipProject.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cdcdcd]">
                <CheckCircle2 className="w-4 h-4 text-[#59d499] mt-0.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Tags and Links */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-[#242728] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {flagshipProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-[#121212] border border-[#242728] text-[11px] sm:text-xs font-mono text-[#9c9c9d]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="flex items-center gap-3 self-end sm:self-auto"
              style={{ transform: "translateZ(26px)" }}
            >
              <a
                href={flagshipProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-lg bg-[#121212] border border-[#242728] text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
                aria-label={`View ${flagshipProject.title} GitHub repository`}
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={flagshipProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffffff] text-[#000000] text-xs sm:text-sm font-semibold hover:bg-[#e8e8e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors shadow-md"
              >
                <span>Live Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </TiltCard>
    </section>
  )
}
