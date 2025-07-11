import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let skillsData = [
  {
    id: 1,
    title: "Backend Development",
    icon: "Server",
    color: "text-blue-600",
    skills: [
      { name: "Java", level: 95, years: null },
      { name: "Spring Boot", level: 90, years: null},
      { name: "Spring Framework", level: 85, years: null },
      { name: "Hibernate/JPA", level: 80, years: null },
      { name: "RESTful APIs", level: 90, years: null },
      { name: "Microservices", level: 50, years: null },
    ],
  },
  {
    id: 2,
    title: "Databases",
    icon: "Database",
    color: "text-green-600",
    skills: [
      { name: "PostgreSQL", level: 85, years: null },
      { name: "MySQL", level: 80, years: null },
      { name: "MongoDB", level: 75, years: null },
      { name: "Redis", level: 70, years: null },
      { name: "H2", level: 70, years: null },
      { name: "Oracle DB", level: 65, years: null },
    ],
  },
  {
    id: 3,
    title: "Platforms & Running Tools",
    icon: "Cloud",
    color: "text-purple-600",
    skills: [
      { name: "Linux", level: 65, years: null },
      { name: "Docker", level: 85, years: null },
      { name: "Maven", level: 85, years: null },
      { name: "Gradle", level: 60, years: null },
    ],
  },
  {
    id: 4,
    title: "Other Technologies",
    icon: "Settings",
    color: "text-orange-600",
    skills: [
      { name: "Git", level: 90, years: null },
      { name: "Maven", level: 85, years: null },
      { name: "Gradle", level: 50, years: null },
      { name: "IntelliJ IDEA", level: 95, years: null },
      { name: "Postman", level: 85, years: null },
      { name: "Swagger", level: 90, years: null },
    ],
  },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(skillsData)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newSkillCategory = await request.json()
    const id = Math.max(...skillsData.map((s) => s.id)) + 1
    const skillCategory = { ...newSkillCategory, id }
    skillsData.push(skillCategory)
    return NextResponse.json(skillCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedSkillCategory = await request.json()
    const index = skillsData.findIndex((s) => s.id === updatedSkillCategory.id)
    if (index === -1) {
      return NextResponse.json({ error: "Skill category not found" }, { status: 404 })
    }
    skillsData[index] = updatedSkillCategory
    return NextResponse.json(updatedSkillCategory)
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
    skillsData = skillsData.filter((s) => s.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
