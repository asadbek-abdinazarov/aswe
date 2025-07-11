"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Save, User } from "lucide-react"
import { apiClient } from "@/lib/api"

export default function AdminAbout() {
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    location: "",
    experience: "",
    specialization: "",
    passion: "",
    availability: true,
    quote: "",
    quoteAuthor: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const data = await apiClient.getAbout()
      setAboutData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch about data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await apiClient.updateAbout(aboutData)
      toast({
        title: "Success",
        description: "About section updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about section",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setAboutData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <User className="w-8 h-8" />
            About Me Management
          </h1>
          <p className="text-slate-600">Manage your personal information and about section content</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gradient-primary text-white neomorphic hover:scale-105 transition-transform"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="neomorphic border-0">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={aboutData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={aboutData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
            <div>
              <Label htmlFor="content">Main Content</Label>
              <Textarea
                id="content"
                rows={4}
                value={aboutData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                className="neomorphic-inset border-0 resize-none"
              />
            </div>
            <div>
              <Label htmlFor="image">Profile Image URL</Label>
              <Input
                id="image"
                value={aboutData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                className="neomorphic-inset border-0"
                placeholder="/placeholder.svg?height=400&width=400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card className="neomorphic border-0">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={aboutData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={aboutData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={aboutData.specialization}
                onChange={(e) => handleInputChange("specialization", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
            <div>
              <Label htmlFor="passion">Passion</Label>
              <Input
                id="passion"
                value={aboutData.passion}
                onChange={(e) => handleInputChange("passion", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="availability"
                checked={aboutData.availability}
                onCheckedChange={(checked) => handleInputChange("availability", checked)}
              />
              <Label htmlFor="availability">Available for Work</Label>
            </div>
          </CardContent>
        </Card>

        {/* Quote Section */}
        <Card className="neomorphic border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Inspirational Quote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                rows={3}
                value={aboutData.quote}
                onChange={(e) => handleInputChange("quote", e.target.value)}
                className="neomorphic-inset border-0 resize-none"
              />
            </div>
            <div>
              <Label htmlFor="quoteAuthor">Quote Author</Label>
              <Input
                id="quoteAuthor"
                value={aboutData.quoteAuthor}
                onChange={(e) => handleInputChange("quoteAuthor", e.target.value)}
                className="neomorphic-inset border-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
