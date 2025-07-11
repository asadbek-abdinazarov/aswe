"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, FileText, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export function ArticlesSection() {
  const { data: articlesData, loading, error } = useApi(() => apiClient.getArticles())

  if (loading) {
    return (
      <section id="articles" className="py-20 px-4 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading articles...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !articlesData) {
    return (
      <section id="articles" className="py-20 px-4 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Failed to load articles section</p>
          </div>
        </div>
      </section>
    )
  }

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
    <section id="articles" className="py-20 px-4 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Technical Articles
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            In-depth technical content and comprehensive guides for backend developers
          </p>
        </div>

        <div className="relative">
          <div className="glassmorphic" style={{
            background: "rgba(255,255,255,0.5)",
            borderRadius: 15,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            position: "relative"
          }}>
            <div className="space-y-8 p-2">
              {articlesData.slice(0, 3).map((article: any) => (
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
                        src={article.image || "/placeholder.svg?height=200&width=300"}
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
                            {article.views?.toLocaleString()} views
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
                            {article.tags?.map((tag: string) => (
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
            {/* Overlay for Coming Soon */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                pointerEvents: "auto",
                zIndex: 10,
                borderRadius: 15,
                background: "rgba(255,255,255,0.01)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)"
              }}
            >
              <span className="text-2xl font-semibold text-slate-500 select-none">Coming Soon</span>
            </div>
            {/* Make all content non-clickable */}
            <div className="absolute inset-0" style={{ pointerEvents: "none", borderRadius: 15 }} />
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="neomorphic hover:scale-105 transition-transform bg-transparent"
            asChild
          >
            <Link href="/articles">
              <FileText className="w-5 h-5 mr-2" />
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
