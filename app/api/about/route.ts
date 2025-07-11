import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock database - in production, use a real database
let aboutData = {
  id: 1,
  title: "About Me",
  description: "Crafting robust backend solutions with passion and precision",
  content:
    "I'm a passionate Java Backend Developer with over 2 years of experience building scalable, high-performance applications. My expertise lies in designing and implementing robust microservices architectures using Spring Boot, Docker, and cloud technologies.\n\nI believe in writing clean, maintainable code and following best practices. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
  image: "/IMG_1372.jpg",
  location: "Uzbekistan, Tashkent",
  experience: "2+ Years",
  specialization: "Backend Development",
  passion: "Clean Code & Architecture",
  availability: true,
  quote: "Code is like humor. When you have to explain it, it's bad.",
  quoteAuthor: "Cory House",
}

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(aboutData)
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedData = await request.json()
    aboutData = { ...aboutData, ...updatedData }
    return NextResponse.json(aboutData)
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
