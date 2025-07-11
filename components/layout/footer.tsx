import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/asadbek-abdinazarov",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/asadbek-abdinazarov",
      label: "LinkedIn",
    },
    // {
    //   icon: 'LeetCode',
    //   href: "https://leetcode.com/u/asadbek-abdinazarov/",
    //   label: "LeetCode",
    // },
    {
      icon: Mail,
      href: "mailto:a.abdinazarov@student.pdp.university",
      label: "Email",
    },
  ]

  const quickLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Asadbek SWE</h3>
            <p className="text-slate-300 leading-relaxed">
              Java Backend Developer passionate about building scalable, efficient systems and sharing knowledge with
              the developer community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="claymorphic p-3 hover:scale-110 transition-all duration-300 text-slate-300 hover:text-blue-400 relative group"
                  title={social.label}
                >
                  {/* {social.icon === 'LeetCode' ? (
                    <Image 
                      src="/leet-code.png" 
                      alt="LeetCode" 
                      width={20} 
                      height={20} 
                      className="w-5 h-5"
                    />
                  ) : (
         
                  )} */}
                             <social.icon className="w-5 h-5" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {social.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-slate-400 text-sm">Let's connect and build something amazing together!</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">© {currentYear} Asadbek. All rights reserved.</p>
          <p className="text-slate-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
