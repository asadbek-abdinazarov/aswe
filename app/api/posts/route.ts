import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let postsData = [
  {
    id: 1,
    title: "Building Scalable Microservices with Spring Boot",
    excerpt:
      "Learn how to design and implement microservices architecture using Spring Boot, Docker, and Kubernetes for maximum scalability.",
    content: "Full content would be here...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Spring Boot", "Microservices", "Docker"],
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "Java Performance Optimization Techniques",
    excerpt:
      "Discover advanced techniques to optimize Java application performance, including JVM tuning and memory management.",
    content: "Full content would be here...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Java", "Performance", "JVM"],
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    featured: false,
    published: true,
  },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(postsData.filter((post) => post.published))
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newPost = await request.json()
    const id = Math.max(...postsData.map((p) => p.id)) + 1
    const post = {
      ...newPost,
      id,
      publishedAt: new Date().toISOString().split("T")[0],
    }
    postsData.push(post)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedPost = await request.json()
    const index = postsData.findIndex((p) => p.id === updatedPost.id)
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    postsData[index] = updatedPost
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    postsData = postsData.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
