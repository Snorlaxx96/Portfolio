import { useState, useEffect } from "react"
import { Terminal, Github, Linkedin, Facebook, Instagram, Mail, Menu, X } from "lucide-react"

interface HeaderProps {
  onOpenCommand: () => void
}

export default function Header({ onOpenCommand }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Projects", href: "#work" },
    { name: "Skills", href: "#stack" },
    { name: "Approach", href: "#philosophy" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#07080a]/85 backdrop-blur-md border-b border-[#242728]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center font-mono text-sm font-semibold text-white group-hover:border-[#ff6161] transition-colors">
            MB
          </div>
          <div>
            <div className="text-sm font-semibold text-white tracking-tight group-hover:text-[#ff6161] transition-colors">
              Mhyco Bunao
            </div>
            <div className="text-[11px] text-[#9c9c9d] font-mono leading-none">
              Software Engineer
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-[#9c9c9d] hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-1 border-r border-[#242728] pr-3">
            <a
              href="https://github.com/Snorlaxx96"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded text-[#9c9c9d] hover:text-white hover:bg-[#121212] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mhyco-bunao-9b725b350/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded text-[#9c9c9d] hover:text-white hover:bg-[#121212] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.facebook.com/giselo.bunao"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded text-[#9c9c9d] hover:text-white hover:bg-[#121212] transition-colors"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/mhhycooo/"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded text-[#9c9c9d] hover:text-white hover:bg-[#121212] transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>


          {/* Quick command palette trigger */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#121212] border border-[#242728] text-xs text-[#cdcdcd] hover:border-[#ff6161]/50 hover:text-white transition-all cursor-pointer"
            aria-label="Open command palette"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff6161]" />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenCommand}
            className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] text-[#cdcdcd] flex items-center justify-center hover:text-white hover:border-[#ff6161]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors cursor-pointer"
            aria-label="Open command palette"
          >
            <Terminal className="w-4 h-4 text-[#ff6161]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] text-white flex items-center justify-center hover:border-[#ff6161]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-[#242728] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-[#cdcdcd] hover:text-white hover:bg-white/[0.04] active:bg-white/[0.08] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#242728] flex items-center gap-2 flex-wrap">
            <a
              href="https://github.com/Snorlaxx96"
              target="_blank"
              rel="noreferrer"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mhyco-bunao-9b725b350/"
              target="_blank"
              rel="noreferrer"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/giselo.bunao"
              target="_blank"
              rel="noreferrer"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 transition-colors"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/mhhycooo/"
              target="_blank"
              rel="noreferrer"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="mailto:giselobunao@gmail.com"
              className="min-w-[44px] min-h-[44px] rounded-lg bg-[#121212] border border-[#242728] flex items-center justify-center text-[#9c9c9d] hover:text-white hover:border-[#ff6161]/50 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
