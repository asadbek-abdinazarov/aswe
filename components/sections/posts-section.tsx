"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export function PostsSection() {
  const { data: postsData, loading, error } = useApi(() => apiClient.getPosts())

  if (loading) {
    return (
      <section id="posts" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading posts...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !postsData) {
    return (
      <section id="posts" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">Failed to load posts section</p>
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

  return (
    <section id="posts" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Latest Posts
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on backend development
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
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 p-2">
              {postsData.slice(0, 4).map((post: any) => (
                <Card
                  key={post.id}
                  className={`neomorphic border-0 hover:scale-105 transition-all duration-300 overflow-hidden ${
                    post.featured ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={post.image || "/placeholder.svg?height=200&width=300"}
                      alt={post.title}
                      className={`w-full object-cover ${post.featured ? "h-64" : "h-48"}`}
                    />
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
                    <CardTitle className={`text-slate-800 leading-tight ${post.featured ? "text-2xl" : "text-xl"}`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag: string) => (
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
            <Link href="/posts">
              <BookOpen className="w-5 h-5 mr-2" />
              View All Posts
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

