"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Cloud, Settings, Code, GitBranch } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

const iconMap: { [key: string]: any } = {
  Server,
  Database,
  Cloud,
  Settings,
  Code,
  GitBranch,
}

export function SkillsSection() {
  const { data: skillsData, loading, error } = useApi(() => apiClient.getSkills())

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !skillsData) {
    return (
      <section id="skills" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Failed to load skills section</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            My Skills
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Technologies and tools I use to build amazing backend solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillsData.map((category: any) => {
            const IconComponent = iconMap[category.icon] || Code
            return (
              <Card key={category.id} className="claymorphic border-0 hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="claymorphic p-2">
                      <IconComponent className={`w-6 h-6 ${category.color || "text-blue-600"}`} />
                    </div>
                    <span className="text-slate-800">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills?.map((skill: any, skillIndex: number) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-700">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {skill.years}
                            </Badge>
                            <span className="text-sm text-slate-500">{skill.level}%</span>
                          </div>
                        </div>
                        <div className="neomorphic-inset p-1">
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
