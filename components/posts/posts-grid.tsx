"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, BookOpen, Search, Filter } from "lucide-react"
import Link from "next/link"

export function PostsGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const posts = [
    {
      id: 1,
      title: "Building Scalable Microservices with Spring Boot",
      excerpt:
        "Learn how to design and implement microservices architecture using Spring Boot, Docker, and Kubernetes for maximum scalability.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Spring Boot", "Microservices", "Docker"],
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Java Performance Optimization Techniques",
      excerpt:
        "Discover advanced techniques to optimize Java application performance, including JVM tuning and memory management.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Java", "Performance", "JVM"],
      publishedAt: "2024-01-10",
      readTime: "12 min read",
      featured: false,
    },
    {
      id: 3,
      title: "Database Design Best Practices",
      excerpt:
        "Essential database design principles and best practices for building efficient and maintainable database schemas.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Database", "PostgreSQL", "Design"],
      publishedAt: "2024-01-05",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 4,
      title: "Implementing CI/CD for Java Applications",
      excerpt:
        "Step-by-step guide to setting up continuous integration and deployment pipelines for Java applications using Jenkins and Docker.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["CI/CD", "Jenkins", "DevOps"],
      publishedAt: "2023-12-28",
      readTime: "10 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Understanding Spring Security Fundamentals",
      excerpt:
        "A comprehensive guide to Spring Security basics, covering authentication, authorization, and security best practices.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Spring Security", "Authentication", "Security"],
      publishedAt: "2023-12-20",
      readTime: "15 min read",
      featured: false,
    },
    {
      id: 6,
      title: "RESTful API Design Principles",
      excerpt:
        "Learn the fundamental principles of designing clean, maintainable, and scalable RESTful APIs with practical examples.",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["REST API", "Design", "Best Practices"],
      publishedAt: "2023-12-15",
      readTime: "9 min read",
      featured: false,
    },
  ]

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            All <span className="gradient-primary bg-clip-text text-transparent">Posts</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore all my blog posts about backend development, tutorials, and tech insights
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 neomorphic-inset border-0 h-12"
              />
            </div>
            <Button
              variant="outline"
              className="neomorphic bg-transparent flex items-center gap-2"
              onClick={() => {
                setSearchTerm("")
                setSelectedTag("")
              }}
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag("")}
              className={selectedTag === "" ? "gradient-primary text-white" : "neomorphic bg-transparent"}
            >
              All Posts
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
                className={selectedTag === tag ? "gradient-primary text-white" : "neomorphic bg-transparent"}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="neomorphic border-0 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                {post.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="gradient-primary text-white">Featured</Badge>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 glassmorphic px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <CardTitle className="text-lg text-slate-800 leading-tight line-clamp-2">{post.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="claymorphic text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-full justify-between neomorphic hover:scale-105 transition-transform"
                  asChild
                >
                  <Link href={`/posts/${post.id}`}>
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Read More
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No posts found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="neomorphic hover:scale-105 transition-transform bg-transparent"
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
