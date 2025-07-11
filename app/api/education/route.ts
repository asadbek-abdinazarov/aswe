import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let educationData = [
  {
    id: 1,
    degree: "Bachelor of Software Development and Programming",
    institution: "PDP University",
    location: "Tashkent",
    duration: "Oct 2022 - Oct 2026",
    gpa: "4.6/5.0",
    description:
      "During my studies, I continue to work as a mentor and consultant, and in this regard, I work with the Group assigned to me on many startup projects.",
    courses: ["Advanced Programming", "Data Structure and Algorithms", "Software Engineering", "Database Systems", "BI - Business Intelligence", "Web Development", "Mobile Development", "Cloud Computing", "BPMN 2.0"],
    achievements: ["Dean's List", "Graduate Teaching Assistant", "Research Publication"],
  },
  {
    id: 2,
    degree: "General English and IELTS",
    institution: "EDU VIBE",
    location: "Tashkent",
    duration: "Sep 2022 - May2024",
    gpa: "",
    description:
      "Edu vibe Academy is a huge source of knowledge for me.",
    courses: ["General English", "B2"],
    achievements: [],
  },
  {
    id: 3,
    degree: "Java Programming Language",
    institution: "Isystem IT Academy",
    location: "Tashkent",
    duration: "Avg 2021 - May 2022",
    gpa: "",
    description:
      "During my studies, I gained a lot of knowledge, made new friends, and improved my practical knowledge of Java.",
    courses: ["Java SE", "Spring Boot", "PostgreSQL", "Docker", "Swagger", "Microservice", "Multithreading"],
    achievements: ["Creative Thinking", "Networking"],
  },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(educationData)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newEducation = await request.json()
    const id = Math.max(...educationData.map((e) => e.id)) + 1
    const education = { ...newEducation, id }
    educationData.push(education)
    return NextResponse.json(education, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedEducation = await request.json()
    const index = educationData.findIndex((e) => e.id === updatedEducation.id)
    if (index === -1) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 })
    }
    educationData[index] = updatedEducation
    return NextResponse.json(updatedEducation)
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
    educationData = educationData.filter((e) => e.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
