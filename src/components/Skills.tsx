import { Code, Server, Cloud, ShieldCheck } from "lucide-react"
import TiltCard from "./ui/TiltCard"

interface SkillGroup {
  title: string
  kicker: string
  icon: React.ElementType
  accentColor: string
  description: string
  skills: { name: string; level: string; desc: string }[]
}

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Development",
    kicker: "UI & Interactions",
    icon: Code,
    accentColor: "#57c1ff",
    description: "Developing accessible, responsive web interfaces with modern frameworks and type safety.",
    skills: [
      { name: "TypeScript / JavaScript (ES6+)", level: "Proficient", desc: "Modern syntax, strict typing, async/await patterns" },
      { name: "React & Next.js", level: "Proficient", desc: "Component architecture, hooks, state management" },
      { name: "Tailwind CSS & CSS3", level: "Proficient", desc: "Responsive layout, CSS variables, utility-first design" },
      { name: "HTML5 & Semantic Web", level: "Advanced", desc: "Accessible DOM structure, WCAG standards, SEO basics" },
      { name: "WebGL & Canvas", level: "Working", desc: "Custom shader rendering, 2D/3D canvas animations" },
    ],
  },
  {
    title: "Backend & Databases",
    kicker: "Services & Data",
    icon: Server,
    accentColor: "#ff6161",
    description: "Building server-side applications, REST APIs, and structured relational databases.",
    skills: [
      { name: "Node.js & Express", level: "Proficient", desc: "RESTful API routes, middleware, server logic" },
      { name: "PostgreSQL & MySQL", level: "Proficient", desc: "Relational schema design, SQL queries, indexing" },
      { name: "Python / FastAPI", level: "Working", desc: "API development, automation scripts, data utilities" },
      { name: "RESTful API Architecture", level: "Proficient", desc: "HTTP methods, payload validation, status codes" },
      { name: "Authentication & Auth", level: "Proficient", desc: "JWT tokens, session auth, role authorization" },
    ],
  },
  {
    title: "DevOps & Cloud",
    kicker: "Deployment & Environment",
    icon: Cloud,
    accentColor: "#59d499",
    description: "Configuring development environments, automated builds, and cloud hosting.",
    skills: [
      { name: "Git & GitHub", level: "Proficient", desc: "Branching strategies, code reviews, pull requests" },
      { name: "Docker", level: "Working", desc: "Containerizing local development and app environments" },
      { name: "Firebase Hosting & Services", level: "Proficient", desc: "Static hosting, Firestore, serverless config" },
      { name: "CI/CD & GitHub Actions", level: "Working", desc: "Automated linting, tests, and build checks on push" },
      { name: "Linux / Bash", level: "Proficient", desc: "Shell scripting, command line utilities, SSH" },
    ],
  },
  {
    title: "Testing & Quality",
    kicker: "Reliability & Speed",
    icon: ShieldCheck,
    accentColor: "#ffc533",
    description: "Maintaining reliable software through automated testing, browser checks, and performance reviews.",
    skills: [
      { name: "Playwright Automation", level: "Proficient", desc: "End-to-end browser tests, responsive verification" },
      { name: "Unit & Integration Tests", level: "Proficient", desc: "Component and utility verification with Vitest/Jest" },
      { name: "Web Performance (Lighthouse)", level: "Proficient", desc: "Core Web Vitals, asset optimization, fast loading" },
      { name: "Defensive Web Security", level: "Working", desc: "Input sanitization, CORS, security headers" },
      { name: "Responsive QA", level: "Proficient", desc: "Mobile-first testing across screen sizes and devices" },
    ],
  },
]

export default function Skills() {
  return (
    <section id="stack" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#242728]">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
          Skills & Technologies
        </h2>
        <p className="text-xs sm:text-sm text-[#9c9c9d] mt-2 max-w-xl leading-relaxed">
          Languages, frameworks, and tools used for building and deploying software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skillGroups.map((group) => {
          const Icon = group.icon
          return (
            <TiltCard
              key={group.title}
              maxTilt={4}
              scale={1.01}
              glareOpacity={0.06}
              className="rounded-xl bg-[#0d0d0d] border border-[#242728] p-4 sm:p-6 flex flex-col justify-between hover:border-[#ff6161]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center shrink-0"
                      style={{ color: group.accentColor }}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {group.title}
                      </h3>
                      <div className="text-[11px] font-mono text-[#9c9c9d]">
                        {group.kicker}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#9c9c9d] mb-4 sm:mb-6 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills list */}
                <div className="space-y-2.5 sm:space-y-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 sm:p-3 rounded-lg bg-[#121212] border border-[#242728] flex items-start justify-between gap-2.5 sm:gap-3 group hover:border-[#ff6161]/30 transition-colors"
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white group-hover:text-[#ff6161] transition-colors">
                          {skill.name}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#9c9c9d] mt-0.5">
                          {skill.desc}
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-[#18191a] text-[#cdcdcd] border border-[#242728] whitespace-nowrap shrink-0 mt-0.5">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          )
        })}
      </div>
    </section>
  )
}
