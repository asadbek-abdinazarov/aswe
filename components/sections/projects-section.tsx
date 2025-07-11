"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExternalLink, Github, Eye, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

// Status color mapping
const statusColorMap: Record<string, string> = {
  Production: "bg-blue-500",
  Enterprise: "bg-purple-500",
  Beta: "bg-yellow-500",
  Demo: "bg-blue-400",
  Deprecated: "bg-gray-400",
  Maintenance: "bg-orange-500",
  Planning: "bg-pink-500",
  Testing: "bg-cyan-500",
  Default: "bg-blue-500",
  'In Progress': "bg-yellow-500",
  Completed: "bg-green-500"
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedDevelopers, setSelectedDevelopers] = useState<any[]>([])
  const { data: projectsData, loading, error } = useApi(() => apiClient.getProjects())

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !projectsData) {
    return (
      <section id="projects" className="py-20 px-4 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Failed to load projects section</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-4 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            My Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Showcasing my expertise through real-world applications and solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData.map((project: any) => (
            <Card
              key={project.id}
              className="neomorphic border-0 hover:scale-105 transition-all duration-300 overflow-hidden relative"
            >
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg?height=300&width=400"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`${statusColorMap[project.status] || statusColorMap.Default} text-white`}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-slate-800 mb-2">{project.title}</CardTitle>
                <p className="text-slate-600 text-sm leading-relaxed">{project.shortDescription}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs claymorphic">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies?.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">{project.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">{project.team}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2 relative">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 neomorphic hover:bg-slate-50 hover:shadow-lg transition-all duration-200 bg-transparent relative z-10"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto modal-glassmorphic border-0">
                        <DialogHeader className="relative">
                          <DialogTitle className="text-2xl text-slate-800 pr-8">{project.title}</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div className="relative">
                            <img
                              src={project.image || "/placeholder.svg?height=300&width=800"}
                              alt={project.title}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge
                                className={`${statusColorMap[project.status] || statusColorMap.Default} text-white`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="prose max-w-none">
                            <p className="text-slate-700 leading-relaxed text-base">{project.description}</p>
                          </div>

                          {project.metrics && (
                            <div className="grid md:grid-cols-3 gap-4">
                              {Object.entries(project.metrics).map(([key, value]) => (
                                <div key={key} className="claymorphic p-4 text-center">
                                  <div className="text-2xl font-bold text-blue-600">{value as string}</div>
                                  <div className="text-sm text-slate-500 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {project.features && (
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3 text-lg">Key Features:</h4>
                              <ul className="grid md:grid-cols-2 gap-2">
                                {project.features.map((feature: string, index: number) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                    <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-slate-800 mb-3 text-lg">Technologies Used:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies?.map((tech: string) => (
                                <Badge key={tech} variant="outline" className="claymorphic">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-4 pt-4 border-t border-slate-200">
                            {project.githubUrl && (
                              <Button asChild className="gradient-primary text-white flex-1">
                                <Link href={project.githubUrl} target="_blank">
                                  <Github className="w-4 h-4 mr-2" />
                                  View Code
                                </Link>
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button variant="outline" asChild className="flex-1 bg-transparent">
                                <Link href={project.liveUrl} target="_blank">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Live Demo
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Developers Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="neomorphic hover:bg-slate-50 hover:shadow-lg transition-all duration-200 bg-transparent relative z-10"
                          aria-label="View Developers"
                          onClick={() => setSelectedDevelopers(project.developers || [])}
                        >
                          <Users className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md modal-glassmorphic border-0">
                        <DialogHeader>
                          <DialogTitle>Developers</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {selectedDevelopers.length > 0 ? (
                            selectedDevelopers.map((dev: any) => (
                              <div key={dev.email || dev.name} className="flex items-center gap-3">
                                <img src={dev.avatar || "/placeholder-user.jpg"} alt={dev.name} className="w-10 h-10 rounded-full border" />
                                <div>
                                  <div className="font-semibold text-slate-800">{dev.name}</div>
                                  <div className="text-xs text-slate-500">{dev.role}</div>
                                  {dev.email && <div className="text-xs text-slate-400">{dev.email}</div>}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-slate-500 text-sm">No developer info available.</div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="neomorphic hover:bg-slate-50 hover:shadow-lg transition-all duration-200 bg-transparent relative z-10"
                      >
                        <Link href={project.githubUrl} target="_blank">
                          <Github className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}

                    {project.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="neomorphic hover:bg-slate-50 hover:shadow-lg transition-all duration-200 bg-transparent relative z-10"
                      >
                        <Link href={project.liveUrl} target="_blank">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="neomorphic hover:scale-105 transition-transform bg-transparent"
          >
            <Link href="https://github.com/asadbek-abdinazarov" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View All Projects on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
