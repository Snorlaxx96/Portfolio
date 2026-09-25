import { Code, Server, Cloud, ShieldCheck, Terminal, Cpu } from "lucide-react"
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
    title: "Frontend Engineering",
    kicker: "Interface & Motion",
    icon: Code,
    accentColor: "#57c1ff",
    description: "Building responsive, sub-millisecond interaction surfaces with strict layout stability.",
    skills: [
      { name: "TypeScript / JavaScript (ESNext)", level: "Advanced", desc: "Strict type models & async pipelines" },
      { name: "React 18 / 19 & Next.js", level: "Production", desc: "Server components, App router, concurrent rendering" },
      { name: "Tailwind CSS & Design Systems", level: "Expert", desc: "Design tokens, CSS variables, zero-overflow hygiene" },
      { name: "WebGL2 & Canvas Shader Physics", level: "Applied", desc: "Fragment shaders, procedural math, 60fps buffers" },
      { name: "State Architecture", level: "Advanced", desc: "Zustand, React Query, XState finite state machines" },
    ],
  },
  {
    title: "Backend & Distributed Systems",
    kicker: "Architecture & Data",
    icon: Server,
    accentColor: "#ff6161",
    description: "Designing fault-tolerant services, low-latency APIs, and persistent storage layers.",
    skills: [
      { name: "Node.js & Go Runtime", level: "Advanced", desc: "Non-blocking event loop & high-concurrency microservices" },
      { name: "PostgreSQL & Database Architecture", level: "Production", desc: "Schema normalization, indexing, connection pooling" },
      { name: "Redis & Distributed Caching", level: "Advanced", desc: "Pub/Sub, rate-limiting algorithms, memory management" },
      { name: "REST & GraphQL APIs", level: "Production", desc: "Contract testing, versioning, idempotent mutations" },
      { name: "Python / FastAPI", level: "Advanced", desc: "Async route handlers, background worker queues" },
    ],
  },
  {
    title: "Cloud Infrastructure & DevOps",
    kicker: "Reliability & Scale",
    icon: Cloud,
    accentColor: "#59d499",
    description: "Automating zero-downtime releases, container orchestration, and edge deployment pipelines.",
    skills: [
      { name: "Docker & Containerization", level: "Production", desc: "Multi-stage minimal builds, security hardening" },
      { name: "Linux Systems & Shell Tooling", level: "Advanced", desc: "Bash/PowerShell automation, kernel tuning, SSH" },
      { name: "CI/CD & GitHub Actions", level: "Production", desc: "Automated lint gates, regression suites, auto-rollback" },
      { name: "AWS & Cloud-Native Services", level: "Applied", desc: "EC2, S3, RDS, CloudFront, Lambda serverless" },
      { name: "Nginx & Reverse Proxies", level: "Production", desc: "SSL termination, load balancing, gzip/brotli compression" },
    ],
  },
  {
    title: "Quality, Testing & Security",
    kicker: "Defensive Coding",
    icon: ShieldCheck,
    accentColor: "#ffc533",
    description: "Enforcing OWASP compliance, end-to-end browser audits, and strict regression resistance.",
    skills: [
      { name: "Playwright Automated Browser Testing", level: "Expert", desc: "Multi-viewport responsive QA, layout leak audits" },
      { name: "OWASP Top 10 Defensive Hardening", level: "Advanced", desc: "Input sanitization, CSRF tokens, secure headers" },
      { name: "Unit & Integration Testing (Vitest/Jest)", level: "Production", desc: "Negative path verification, boundary testing" },
      { name: "Performance & Lighthouse Audits", level: "Advanced", desc: "Core Web Vitals optimization, asset tree-shaking" },
      { name: "Observability & Error Tracking", level: "Production", desc: "Structured telemetry logging, latency metrics" },
    ],
  },
]

export default function Skills() {
  return (
    <section id="stack" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#242728]">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Engineering Stack & Toolchain
        </h2>
        <p className="text-sm text-[#9c9c9d] mt-2 max-w-xl">
          Core technologies and operational competencies deployed in production environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group) => {
          const Icon = group.icon
          return (
            <TiltCard
              key={group.title}
              maxTilt={4}
              scale={1.01}
              glareOpacity={0.06}
              className="rounded-xl bg-[#0d0d0d] border border-[#242728] p-6 flex flex-col justify-between hover:border-[#373a3c] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center"
                      style={{ color: group.accentColor }}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {group.title}
                      </h3>
                      <div className="text-[11px] font-mono text-[#9c9c9d]">
                        {group.kicker}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#9c9c9d] mb-6 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills list */}
                <div className="space-y-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-[#121212] border border-[#242728] flex items-start justify-between gap-3 group hover:border-[#373a3c] transition-colors"
                    >
                      <div>
                        <div className="text-xs font-medium text-white group-hover:text-[#ff6161] transition-colors">
                          {skill.name}
                        </div>
                        <div className="text-[11px] text-[#9c9c9d] mt-0.5">
                          {skill.desc}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18191a] text-[#cdcdcd] border border-[#242728] whitespace-nowrap">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-6 pt-4 border-t border-[#242728] flex items-center justify-between text-[11px] font-mono text-[#6a6b6c]">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#59d499]" /> Production Verified
                </span>
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#57c1ff]" /> Modern Tooling
                </span>
              </div>
            </TiltCard>
          )
        })}
      </div>
    </section>
  )
}
