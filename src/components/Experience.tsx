import { Compass } from "lucide-react"
import TiltCard from "./ui/TiltCard"

const principles = [
  {
    title: "Performance as a Strict Constraint",
    desc: "Treating latency and payload weight as non-negotiable architectural budgets. Zero unnecessary client bundles, zero uncompressed assets, and constant 60fps rendering on both mobile and desktop screens.",
    tag: "Budget Discipline",
  },
  {
    title: "End-to-End Type Integrity",
    desc: "Single sources of truth across the data persistence layer, API route serializers, and client UI components to eliminate runtime contract mismatches before compilation.",
    tag: "Contract Safety",
  },
  {
    title: "Resilient Failure Domains",
    desc: "Every network call and external dependency is designed to fail gracefully. Circuit breakers, optimistic state updates, and deterministic fallbacks ensure an uninterrupted user experience.",
    tag: "Fault Tolerance",
  },
]

export default function Experience() {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#242728]">
      {/* Engineering Philosophy */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Engineering Philosophy
        </h2>
        <p className="text-sm text-[#9c9c9d] mt-2 max-w-xl">
          Core values shaping every line of code, system architecture diagram, and deployment choice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {principles.map((p) => (
            <TiltCard
              key={p.title}
              maxTilt={5}
              scale={1.015}
              glareOpacity={0.06}
              className="p-6 rounded-xl bg-[#0d0d0d] border border-[#242728] flex flex-col justify-between hover:border-[#373a3c] transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#121212] border border-[#242728] text-[#59d499]">
                  {p.tag}
                </span>
                <h3 className="text-base font-semibold text-white mt-4 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-[#cdcdcd] mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#242728] flex items-center gap-1.5 text-[11px] font-mono text-[#6a6b6c]">
                <Compass className="w-3.5 h-3.5 text-[#59d499]" /> Non-negotiable floor
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
