"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Heart, Code } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export function AboutSection() {
  const { data: aboutData, loading } = useApi(() => apiClient.getAbout())

  if (loading) {
    return (
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading about section...</p>
          </div>
        </div>
      </section>
    )
  }

  // aboutData will always have data due to fallback mechanism
  const personalInfo = [
    { icon: MapPin, label: "Location", value: aboutData?.location || "San Francisco, CA" },
    { icon: Calendar, label: "Experience", value: aboutData?.experience || "5+ Years" },
    { icon: Code, label: "Specialization", value: aboutData?.specialization || "Backend Development" },
    { icon: Heart, label: "Passion", value: aboutData?.passion || "Clean Code & Architecture" },
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {aboutData?.title || "About"}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {aboutData?.description || "Crafting robust backend solutions with passion and precision"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="claymorphic p-6">
              <img
                src="/IMG_1372.jpg"
                alt="Working"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
            {/* Floating badge */}
            {aboutData?.availability && (
              <div className="absolute -top-4 -right-4 claymorphic p-4">
                <Badge className="gradient-primary text-white text-sm px-3 py-1">Available for Work</Badge>
              </div>
            )}
          </div>

        {/* About Content */}
        <div className="space-y-6">
          <div className="glassmorphic p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">My Journey</h3>
            <div className="text-slate-600 leading-relaxed space-y-4">
              {aboutData?.content
                ?.split("\n")
                .map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>) || (
                <p>
                  I'm a passionate Java Backend Developer with over 5 years of experience building scalable,
                  high-performance applications. My expertise lies in designing and implementing robust microservices
                  architectures using Spring Boot, Docker, and cloud technologies.
                </p>
              )}
            </div>
          </div>

          {/* Personal Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            {personalInfo.map((info, index) => (
              <Card key={index} className="neomorphic border-0 hover:scale-105 transition-transform">
                <CardContent className="p-4 text-center">
                  <info.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 mb-1">{info.label}</p>
                  <p className="font-semibold text-slate-800">{info.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

            {/* Life Motto */}
            {aboutData?.quote && (
              <div className="claymorphic p-6 text-center">
                <blockquote className="text-lg italic text-slate-700">"{aboutData.quote}"</blockquote>
                {aboutData.quoteAuthor && (
                  <cite className="text-sm text-slate-500 mt-2 block">- {aboutData.quoteAuthor}</cite>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
