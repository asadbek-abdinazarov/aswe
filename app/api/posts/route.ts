import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let postsData = [
  {
    id: 1,
    title: "Building Scalable Microservices with Spring Boot",
    excerpt:
      "Learn how to design and implement microservices architecture using Spring Boot, Docker, and Kubernetes for maximum scalability.",
    content: "Full content here...",
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Spring Boot", "Microservices", "Docker"],
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    featured: true,
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
