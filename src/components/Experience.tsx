import TiltCard from "./ui/TiltCard"

const principles = [
  {
    title: "Maintainable Code & Strong Types",
    desc: "Writing readable, modular TypeScript with explicit interfaces so the codebase remains predictable, easy to refactor, and self-documenting as it scales.",
  },
  {
    title: "Fast & Mobile-First UX",
    desc: "Designing responsive layouts that load quickly, handle touch gestures smoothly, and adhere to accessible web standards across all devices.",
  },
  {
    title: "Reliable Error Handling",
    desc: "Handling network disconnects, API errors, and edge cases gracefully with clear user feedback rather than silent application crashes.",
  },
]

export default function Experience() {
  return (
    <section id="philosophy" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#242728]">
      <div>
        <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
          Development Approach
        </h2>
        <p className="text-xs sm:text-sm text-[#9c9c9d] mt-2 max-w-xl leading-relaxed">
          Key principles guiding my workflow, architectural choices, and day-to-day code.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {principles.map((p) => (
            <TiltCard
              key={p.title}
              maxTilt={5}
              scale={1.015}
              glareOpacity={0.06}
              className="p-5 sm:p-6 rounded-xl bg-[#0d0d0d] border border-[#242728] flex flex-col justify-between hover:border-[#ff6161]/40 transition-colors"
            >
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#cdcdcd] mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
