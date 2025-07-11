import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EducationSection } from "@/components/sections/education-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { PostsSection } from "@/components/sections/posts-section"
import { ArticlesSection } from "@/components/sections/articles-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/layout/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <PostsSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
