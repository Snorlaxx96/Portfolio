import { useState, useEffect } from "react"
import { Search, ExternalLink, Copy, Check, Sparkles, Navigation, X } from "lucide-react"
import { AccretionPreset } from "./ui/etched-accretion"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  currentPreset: AccretionPreset
  onSelectPreset: (preset: AccretionPreset) => void
}

export default function CommandPalette({
  isOpen,
  onClose,
  currentPreset,
  onSelectPreset,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("giselobunao@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets: { id: AccretionPreset; label: string; desc: string; hex: string }[] = [
    { id: "crimson", label: "Crimson Singularity", desc: "Default signature red accretion band", hex: "#d3121f" },
    { id: "ember", label: "Solar Ember", desc: "Superheated orange relativistic flow", hex: "#ff6a13" },
    { id: "glacier", label: "Glacial Nebula", desc: "Deep blue photon ring with cold cast", hex: "#2f6bff" },
    { id: "ash", label: "Monochrome Ash", desc: "Silver engraving with maximum film grain", hex: "#8d8d8d" },
    { id: "orchid", label: "Orchid Pulsar", desc: "Violet relativistic jet and wide disk", hex: "#b3219e" },
  ]

  const actions = [
    {
      group: "Navigation",
      items: [
        { label: "Jump to Projects", icon: Navigation, action: () => { window.location.hash = "work"; onClose(); } },
        { label: "Jump to Skills", icon: Navigation, action: () => { window.location.hash = "stack"; onClose(); } },
        { label: "Jump to Approach", icon: Navigation, action: () => { window.location.hash = "philosophy"; onClose(); } },
        { label: "Jump to Contact", icon: Navigation, action: () => { window.location.hash = "contact"; onClose(); } },
      ],
    },
    {
      group: "Quick Actions",
      items: [
        {
          label: copied ? "Copied email to clipboard!" : "Copy Email Address (giselobunao@gmail.com)",
          icon: copied ? Check : Copy,
          action: handleCopyEmail,
        },
        {
          label: "View GitHub Profile (Snorlaxx96)",
          icon: ExternalLink,
          action: () => { window.open("https://github.com/Snorlaxx96", "_blank"); onClose(); },
        },
        {
          label: "View LinkedIn Profile (Mhyco Bunao)",
          icon: ExternalLink,
          action: () => { window.open("https://www.linkedin.com/in/mhyco-bunao-9b725b350/", "_blank"); onClose(); },
        },
        {
          label: "View Facebook Profile (giselo.bunao)",
          icon: ExternalLink,
          action: () => { window.open("https://www.facebook.com/giselo.bunao", "_blank"); onClose(); },
        },
        {
          label: "View Instagram Profile (@mhhycooo)",
          icon: ExternalLink,
          action: () => { window.open("https://www.instagram.com/mhhycooo/", "_blank"); onClose(); },
        },
      ],
    },
  ]

  const filteredPresets = presets.filter(p =>
    p.label.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl max-h-[88vh] flex flex-col bg-[#0d0d0d] border border-[#242728] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-[#242728] shrink-0">
          <Search className="w-4 h-4 text-[#9c9c9d] shrink-0" />
          <input
            type="text"
            placeholder="Type a command, jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-sm text-white placeholder-[#6a6b6c] focus:outline-none font-sans"
            autoFocus
            aria-label="Search commands, navigate sections, or select shaders"
          />
          <button
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-[#9c9c9d] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Content */}
        <div className="overflow-y-auto p-2 space-y-4 flex-1">
          {/* Shader Presets */}
          <div>
            <div className="px-2 py-1 text-[11px] font-mono text-[#9c9c9d] uppercase tracking-wider">
              Hero Accretion Shader Presets
            </div>
            <div className="space-y-1 mt-1">
              {filteredPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectPreset(preset.id)
                    onClose()
                  }}
                  className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    currentPreset === preset.id
                      ? "bg-[#18191a] text-white border border-[#242728]"
                      : "text-[#cdcdcd] hover:bg-[#121212] hover:text-white active:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-medium">{preset.label}</div>
                      <div className="text-[11px] sm:text-xs text-[#9c9c9d]">{preset.desc}</div>
                    </div>
                  </div>
                  {currentPreset === preset.id && (
                    <span className="text-[10px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#ff6161]/20 text-[#ff6161]">
                      Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Groups */}
          {actions.map((group) => (
            <div key={group.group}>
              <div className="px-2 py-1 text-[11px] font-mono text-[#9c9c9d] uppercase tracking-wider">
                {group.group}
              </div>
              <div className="space-y-1 mt-1">
                {group.items
                  .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
                  .map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full min-h-[44px] flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs sm:text-sm font-medium text-[#cdcdcd] hover:bg-[#121212] hover:text-white active:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-[#9c9c9d] shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#07080a] border-t border-[#242728] flex items-center justify-between text-[11px] font-mono text-[#9c9c9d] shrink-0">
          <span>Use ⎋ or tap outside</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ff6161]" /> Raycast HUD Architecture
          </span>
        </div>
      </div>
    </div>
  )
}
