import { ArrowUp, Github, Linkedin, Facebook, Instagram } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative z-10 border-t border-[#242728]/80 bg-[#07080a]/85 backdrop-blur-md py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Wordmark */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center font-mono text-xs font-semibold text-white">
                MB
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                Mhyco Giselo P. Bunao
              </span>
            </div>
            <p className="text-xs text-[#9c9c9d] mt-3 max-w-sm leading-relaxed">
              Software Engineer & Full-Stack Developer specializing in distributed backend architecture, fault-tolerant infrastructure, and high-performance WebGL interfaces.
            </p>

            {/* System Status Pill */}
            <div className="mt-6 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0d0d0d] border border-[#242728] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#59d499] animate-pulse" />
              <span className="text-[11px] font-mono text-[#cdcdcd]">
                All Systems Nominal · Available for Opportunities
              </span>
            </div>
          </div>

          {/* Directory */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#6a6b6c] mb-3">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#work" className="text-[#9c9c9d] hover:text-white transition-colors">
                  Featured Works
                </a>
              </li>
              <li>
                <a href="#stack" className="text-[#9c9c9d] hover:text-white transition-colors">
                  Engineering Stack
                </a>
              </li>
              <li>
                <a href="#philosophy" className="text-[#9c9c9d] hover:text-white transition-colors">
                  Engineering Philosophy
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#9c9c9d] hover:text-white transition-colors">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Spec & Architecture */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#6a6b6c] mb-3">
              Specifications
            </div>
            <ul className="space-y-2 text-xs text-[#9c9c9d]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6161]" />
                <span>Raycast Design System</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#57c1ff]" />
                <span>Etched Accretion WebGL2</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59d499]" />
                <span>TypeScript & Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffc533]" />
                <span>Zero Layout Overflow Hygiene</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#242728] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6a6b6c]">
          <div>
            © {new Date().getFullYear()} Mhyco Giselo P. Bunao. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Snorlaxx96"
                target="_blank"
                rel="noreferrer"
                className="text-[#9c9c9d] hover:text-white transition-colors"
                aria-label="GitHub Profile"
                title="GitHub: Snorlaxx96"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mhyco-bunao-9b725b350/"
                target="_blank"
                rel="noreferrer"
                className="text-[#9c9c9d] hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
                title="LinkedIn: Mhyco Bunao"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/giselo.bunao"
                target="_blank"
                rel="noreferrer"
                className="text-[#9c9c9d] hover:text-white transition-colors"
                aria-label="Facebook Profile"
                title="Facebook: giselo.bunao"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/mhhycooo/"
                target="_blank"
                rel="noreferrer"
                className="text-[#9c9c9d] hover:text-white transition-colors"
                aria-label="Instagram Profile"
                title="Instagram: @mhhycooo"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121212] border border-[#242728] text-xs text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
