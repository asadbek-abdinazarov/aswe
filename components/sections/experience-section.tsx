"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export function ExperienceSection() {
  const { data: experienceData, loading } = useApi(() => apiClient.getExperience())

  if (loading) {
    return (
      <section id="experience" className="py-20 px-4 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading experience...</p>
          </div>
        </div>
      </section>
    )
  }

  // experienceData will always have data due to fallback mechanism
  const experiences = experienceData || []

  return (
    <section id="experience" className="py-20 px-4 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            My Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A journey through my professional growth and achievements
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp: any, index: number) => (
            <Card key={exp.id || index} className="neomorphic border-0 hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Timeline Indicator */}
                  <div className="md:col-span-1 h-full flex items-center">
                    <div className="claymorphic p-4 text-center w-full">
                      <div className="claymorphic w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge variant="secondary" className="text-xs mb-2">
                        {exp.type}
                      </Badge>
                      <div className="text-sm text-slate-500 space-y-1">
                        <div className="flex items-center justify-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{exp.duration}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.title}</h3>
                      <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>

                    {/* Technologies */}
                    {exp.technologies && (
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech: string) => (
                            <Badge key={tech} variant="outline" className="claymorphic text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {exp.achievements && (
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement: string, i: number) => (
                            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
