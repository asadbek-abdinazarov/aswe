"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, FileText, Star, TrendingUp, Search, Filter } from "lucide-react"
import Link from "next/link"

export function ArticlesGrid() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")

  const articles = [
    {
      id: 1,
      title: "Complete Guide to Spring Boot Security",
      excerpt:
        "An in-depth exploration of Spring Security implementation, from basic authentication to advanced authorization patterns.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Security",
      tags: ["Spring Security", "JWT", "OAuth2"],
      publishedAt: "2024-01-20",
      readTime: "25 min read",
      difficulty: "Advanced",
      featured: true,
      views: 15420,
    },
    {
      id: 2,
      title: "Mastering JPA and Hibernate Performance",
      excerpt:
        "Deep dive into JPA and Hibernate optimization techniques, query performance tuning, and common pitfalls to avoid.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Database",
      tags: ["JPA", "Hibernate", "Performance"],
      publishedAt: "2024-01-12",
      readTime: "20 min read",
      difficulty: "Intermediate",
      featured: false,
      views: 8930,
    },
    {
      id: 3,
      title: "Event-Driven Architecture with Apache Kafka",
      excerpt:
        "Building resilient, scalable systems using event-driven architecture patterns with Apache Kafka and Spring Boot.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Architecture",
      tags: ["Kafka", "Event-Driven", "Microservices"],
      publishedAt: "2024-01-08",
      readTime: "18 min read",
      difficulty: "Advanced",
      featured: false,
      views: 12150,
    },
    {
      id: 4,
      title: "Docker Best Practices for Java Applications",
      excerpt:
        "Learn how to containerize Java applications effectively with Docker, including optimization techniques and security considerations.",
      image: "/placeholder.svg?height=200&width=300",
      category: "DevOps",
      tags: ["Docker", "Java", "Containerization"],
      publishedAt: "2024-01-01",
      readTime: "15 min read",
      difficulty: "Intermediate",
      featured: false,
      views: 7200,
    },
    {
      id: 5,
      title: "Building RESTful APIs with Spring Boot",
      excerpt:
        "A comprehensive guide to creating robust, scalable RESTful APIs using Spring Boot, including best practices and common patterns.",
      image: "/placeholder.svg?height=200&width=300",
      category: "API Development",
      tags: ["REST API", "Spring Boot", "Web Services"],
      publishedAt: "2023-12-25",
      readTime: "22 min read",
      difficulty: "Beginner",
      featured: false,
      views: 9800,
    },
    {
      id: 6,
      title: "Advanced Java Concurrency Patterns",
      excerpt:
        "Explore advanced concurrency patterns in Java, including thread pools, concurrent collections, and reactive programming.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Performance",
      tags: ["Java", "Concurrency", "Threading"],
      publishedAt: "2023-12-18",
      readTime: "30 min read",
      difficulty: "Advanced",
      featured: false,
      views: 6500,
    },
  ]

  const categories = Array.from(new Set(articles.map((article) => article.category)))
  const difficulties = Array.from(new Set(articles.map((article) => article.difficulty)))

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    const matchesDifficulty = !selectedDifficulty || article.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Technical Articles
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            In-depth technical content and comprehensive guides for backend developers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search articles..."
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
                setSelectedCategory("")
                setSelectedDifficulty("")
              }}
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </Button>
          </div>

          {/* Category Filters */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-slate-600 mr-2">Category:</span>
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
                className={selectedCategory === "" ? "gradient-primary text-white" : "neomorphic bg-transparent"}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category ? "gradient-primary text-white" : "neomorphic bg-transparent"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-slate-600 mr-2">Difficulty:</span>
              <Button
                variant={selectedDifficulty === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("")}
                className={selectedDifficulty === "" ? "gradient-primary text-white" : "neomorphic bg-transparent"}
              >
                All Levels
              </Button>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={
                    selectedDifficulty === difficulty ? "gradient-primary text-white" : "neomorphic bg-transparent"
                  }
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="space-y-8">
          {filteredArticles.map((article, index) => (
            <Card
              key={article.id}
              className={`neomorphic border-0 hover:scale-[1.02] transition-all duration-300 overflow-hidden ${
                article.featured ? "ring-2 ring-blue-200" : ""
              }`}
            >
              <div className="grid md:grid-cols-3 gap-0">
                {/* Image */}
                <div className="relative md:col-span-1">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="gradient-primary text-white flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 glassmorphic px-3 py-1 rounded-full">
                    <div className="flex items-center gap-1 text-white text-sm">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6">
                  <div className="space-y-4 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className="claymorphic">
                          {article.category}
                        </Badge>
                        <Badge className={`${getDifficultyColor(article.difficulty)} text-white text-xs`}>
                          {article.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <TrendingUp className="w-4 h-4" />
                        {article.views.toLocaleString()} views
                      </div>
                    </div>

                    {/* Title and Date */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-3">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{article.excerpt}</p>
                    </div>

                    {/* Tags and Action */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="claymorphic text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full sm:w-auto neomorphic hover:scale-105 transition-transform" asChild>
                        <Link href={`/articles/${article.id}`}>
                          <FileText className="w-4 h-4 mr-2" />
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Load More */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="neomorphic hover:scale-105 transition-transform bg-transparent"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
