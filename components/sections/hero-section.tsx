"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = "/Asadbek's CV.pdf";
    link.download = "Asadbek_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with glassmorphic effect */}
      <div className="absolute inset-0 gradient-hero"></div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 float-animation"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-15 float-animation"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-10 float-animation"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main content in glassmorphic container */}
        <div className="glassmorphic p-8 mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6">
            Hi, I'm Asadbek
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-600 mb-6">Software Engineer</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Passionate about building scalable, efficient backend systems and microservices. I specialize in Java,
            Spring Boot, and cloud technologies to create robust solutions that power modern applications.
          </p>

          {/* Social links with claymorphic design */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link 
              href="https://github.com/asadbek-abdinazarov" 
              className="claymorphic p-3 hover:scale-110 transition-transform relative group"
              title="GitHub"
            >
              <Github className="w-6 h-6 text-slate-700" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                GitHub
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
              </div>
            </Link>
            <Link 
              href="https://linkedin.com/in/asadbek-abdinazarov" 
              className="claymorphic p-3 hover:scale-110 transition-transform relative group"
              title="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-slate-700" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                LinkedIn
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
              </div>
            </Link>
            <Link 
              href="https://leetcode.com/u/asadbek-abdinazarov/" 
              className="claymorphic p-3 hover:scale-110 transition-transform relative group"
              title="LeetCode"
            >
              <Image 
                src="/leet-code.png" 
                alt="LeetCode" 
                width={24} 
                height={24} 
                className="w-6 h-6"
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                LeetCode
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
              </div>
            </Link>
            <Link 
              href="mailto:a.abdinazarov@sudent.pdp.university" 
              className="claymorphic p-3 hover:scale-110 transition-transform relative group"
              title="Email"
            >
              <Mail className="w-6 h-6 text-slate-700" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                Email
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
              </div>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="neomorphic gradient-primary text-white hover:scale-105 transition-transform px-8 py-3"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="neomorphic hover:scale-105 transition-transform px-8 py-3 bg-transparent"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="neomorphic hover:scale-105 transition-transform px-8 py-3 bg-transparent"
              onClick={handleDownloadCV}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-slate-400 mx-auto" />
        </div>
      </div>
    </section>
  )
}
