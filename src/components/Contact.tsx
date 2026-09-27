import ContactWithGlobe from "@/components/ui/contact-with-globe"
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react"

export default function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: "giselobunao@gmail.com",
      href: "mailto:giselobunao@gmail.com",
    },
    {
      icon: MapPin,
      label: "Philippines · UTC +8 (PHT)",
      href: "https://maps.google.com/?q=Philippines",
    },
    {
      icon: Github,
      label: "github.com/Snorlaxx96",
      href: "https://github.com/Snorlaxx96",
    },
    {
      icon: Linkedin,
      label: "linkedin.com/in/mhyco-bunao",
      href: "https://www.linkedin.com/in/mhyco-bunao-9b725b350/",
    },
    {
      icon: Instagram,
      label: "instagram.com/mhhycooo",
      href: "https://www.instagram.com/mhhycooo/",
    },
  ]

  return (
    <div id="contact" className="border-t border-[#242728]">
      <ContactWithGlobe
        title="Get in Touch"
        subtitle="Contact"
        description="Have a project in mind, a question, or a collaboration opportunity? My inbox is always open."
        contactLinks={contactLinks}
      />
    </div>
  )
}
