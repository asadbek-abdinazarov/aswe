"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Save, Code, Sliders } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export default function SkillsPage() {
  const { toast } = useToast()
  const { data: skillsData, refetch } = useApi(() => apiClient.getSkills())
  const [skills, setSkills] = useState(skillsData || [])
  const [isLoading, setIsLoading] = useState(false)

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: "",
      level: 80,
      category: "Programming",
    }
    setSkills([...skills, newSkill])
  }

  const removeSkill = (id: number) => {
    setSkills(skills.filter((skill: any) => skill.id !== id))
  }

  const updateSkill = (id: number, field: string, value: any) => {
    setSkills(skills.map((skill: any) => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // In a real app, you would call an API to update the data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Skills updated successfully",
      })
      
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update skills",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const categories = ["Programming", "Frameworks", "Databases", "Tools", "Cloud", "Other"]

  if (!skillsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Skills Management</h1>
          <p className="text-slate-600">Manage your technical skills and proficiency levels.</p>
        </div>
        <Button onClick={addSkill} className="neomorphic gradient-primary text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {skills.map((skill: any, index: number) => (
            <Card key={skill.id} className="neomorphic border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    Skill #{index + 1}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`name-${skill.id}`}>Skill Name</Label>
                    <Input
                      id={`name-${skill.id}`}
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                      placeholder="e.g., Java, React, MySQL"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`category-${skill.id}`}>Category</Label>
                    <select
                      id={`category-${skill.id}`}
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, "category", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor={`level-${skill.id}`}>Proficiency Level: {skill.level}%</Label>
                    <input
                      type="range"
                      id={`level-${skill.id}`}
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, "level", parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {skills.length === 0 && (
            <Card className="neomorphic border-0">
              <CardContent className="text-center py-12">
                <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">No skills yet.</p>
                <Button onClick={addSkill} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Skill
                </Button>
              </CardContent>
            </Card>
          )}

          {skills.length > 0 && (
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="neomorphic gradient-primary text-white">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save All Changes"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
} 