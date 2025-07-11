import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let articlesData = [
  {
    id: 1,
    title: "Complete Guide to Spring Boot Security",
    excerpt:
      "An in-depth exploration of Spring Security implementation, from basic authentication to advanced authorization patterns.",
    content: "Full content here...",
    image: "/placeholder.svg?height=200&width=300",
    category: "Security",
    tags: ["Spring Security", "JWT", "OAuth2"],
    publishedAt: "2024-01-20",
    readTime: "25 min read",
    difficulty: "Advanced",
    featured: true,
    published: true,
    views: 15420,
  },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(articlesData.filter((article) => article.published))
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newArticle = await request.json()
    const id = Math.max(...articlesData.map((a) => a.id)) + 1
    const article = {
      ...newArticle,
      id,
      publishedAt: new Date().toISOString().split("T")[0],
      views: 0,
    }
    articlesData.push(article)
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedArticle = await request.json()
    const index = articlesData.findIndex((a) => a.id === updatedArticle.id)
    if (index === -1) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }
    articlesData[index] = updatedArticle
    return NextResponse.json(updatedArticle)
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
    articlesData = articlesData.filter((a) => a.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
