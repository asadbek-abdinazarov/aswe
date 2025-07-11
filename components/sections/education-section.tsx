"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export function EducationSection() {
  const { data: educationData, loading } = useApi(() => apiClient.getEducation())

  if (loading) {
    return (
      <section id="education" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading education...</p>
          </div>
        </div>
      </section>
    )
  }

  // educationData will always have data due to fallback mechanism
  const education = educationData || []

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            My Education
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Academic foundation and continuous learning journey
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu: any) => (
            <Card
              key={edu.id}
              className="neomorphic border-0 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Icon and Basic Info */}
                  <div className="md:col-span-1 h-full flex items-center">
                    <div className="claymorphic p-6 text-center w-full">
                      <div className="claymorphic w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {edu.duration}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                        {edu.gpa && (
                          <div className="flex items-center justify-center gap-2">
                            <Award className="w-4 h-4" />
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-3 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{edu.degree}</h3>
                      <p className="text-lg text-blue-600 font-semibold mb-2">{edu.institution}</p>
                      <p className="text-slate-600 leading-relaxed">{edu.description}</p>
                    </div>

                    {/* Courses */}
                    {edu.courses && edu.courses.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Key Courses
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course: string, courseIndex: number) => (
                            <Badge key={courseIndex} variant="outline" className="claymorphic text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Achievements
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement: string, achievementIndex: number) => (
                            <li key={achievementIndex} className="flex items-start gap-2 text-sm text-slate-600">
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
