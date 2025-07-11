"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, User, Tag } from "lucide-react"
import Link from "next/link"

interface PostDetailProps {
  postId: string
}

export function PostDetail({ postId }: PostDetailProps) {
  // In a real app, you'd fetch this data based on postId
  const post = {
    id: Number.parseInt(postId),
    title: "Building Scalable Microservices with Spring Boot",
    excerpt:
      "Learn how to design and implement microservices architecture using Spring Boot, Docker, and Kubernetes for maximum scalability.",
    content: `
# Building Scalable Microservices with Spring Boot

Microservices architecture has become the go-to approach for building scalable, maintainable applications. In this comprehensive guide, we'll explore how to design and implement microservices using Spring Boot, Docker, and Kubernetes.

## What are Microservices?

Microservices are a software development technique—a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services.

### Key Benefits

- **Scalability**: Each service can be scaled independently
- **Technology Diversity**: Different services can use different technologies
- **Fault Isolation**: Failure in one service doesn't bring down the entire system
- **Team Independence**: Different teams can work on different services

## Getting Started with Spring Boot

Spring Boot makes it easy to create stand-alone, production-grade Spring-based applications. Here's how to set up your first microservice:

\`\`\`java
@SpringBootApplication
@RestController
public class UserServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
    
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
\`\`\`

## Service Discovery

In a microservices architecture, services need to find and communicate with each other. Spring Cloud provides excellent support for service discovery:

\`\`\`java
@EnableEurekaClient
@SpringBootApplication
public class UserServiceApplication {
    // Application code
}
\`\`\`

## Configuration Management

Managing configuration across multiple services can be challenging. Spring Cloud Config provides server and client-side support for externalized configuration:

\`\`\`yaml
spring:
  application:
    name: user-service
  cloud:
    config:
      uri: http://config-server:8888
\`\`\`

## API Gateway

An API Gateway acts as a single entry point for all clients. It handles requests in one of two ways: proxying/routing to the appropriate service or fanning out to multiple services.

## Containerization with Docker

Docker containers provide a consistent environment for your microservices:

\`\`\`dockerfile
FROM openjdk:11-jre-slim
COPY target/user-service.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
\`\`\`

## Orchestration with Kubernetes

Kubernetes helps manage containerized applications at scale:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:latest
        ports:
        - containerPort: 8080
\`\`\`

## Best Practices

1. **Keep Services Small**: Each service should have a single responsibility
2. **Design for Failure**: Implement circuit breakers and retry mechanisms
3. **Monitor Everything**: Use distributed tracing and logging
4. **Automate Testing**: Implement comprehensive testing strategies
5. **Security First**: Implement proper authentication and authorization

## Conclusion

Building microservices with Spring Boot provides a robust foundation for scalable applications. By following these patterns and best practices, you can create systems that are maintainable, scalable, and resilient.

Remember, microservices are not a silver bullet. Consider your team size, application complexity, and operational capabilities before making the transition.
    `,
    image: "/placeholder.svg?height=400&width=800",
    tags: ["Spring Boot", "Microservices", "Docker", "Kubernetes", "Java"],
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    author: {
      name: "Asadbek",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Java Backend Developer",
    },
    featured: true,
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const relatedPosts = [
    {
      id: 2,
      title: "Java Performance Optimization Techniques",
      excerpt: "Discover advanced techniques to optimize Java application performance.",
      image: "/placeholder.svg?height=150&width=200",
      readTime: "12 min read",
    },
    {
      id: 3,
      title: "Database Design Best Practices",
      excerpt: "Essential database design principles and best practices.",
      image: "/placeholder.svg?height=150&width=200",
      readTime: "6 min read",
    },
  ]

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="neomorphic hover:scale-105 transition-transform">
            <Link href="/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="text-center space-y-6">
            <div className="space-y-4">
              {post.featured && <Badge className="gradient-primary text-white">Featured Post</Badge>}
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">{post.title}</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="claymorphic">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <Button variant="outline" className="neomorphic bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share Article
            </Button>
          </header>

          {/* Featured Image */}
          <div className="relative">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="modal-glassmorphic p-8 rounded-2xl">
              <div
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/\n/g, "<br />")
                    .replace(
                      /```(\w+)?\n([\s\S]*?)```/g,
                      '<pre class="bg-slate-100 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>',
                    )
                    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded">$1</code>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-slate-800 mt-8 mb-4">$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-slate-800 mt-10 mb-6">$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-slate-800 mt-12 mb-8">$1</h1>'),
                }}
              />
            </div>
          </div>

          {/* Author Bio */}
          <Card className="neomorphic border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{post.author.name}</h3>
                  <p className="text-slate-600">{post.author.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Related Posts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.id}
                className="neomorphic border-0 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href={`/posts/${relatedPost.id}`}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read More
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
