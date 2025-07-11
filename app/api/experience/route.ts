import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let experienceData = [
  {
    id: 1,
    title: "Java Backend Developer",
    company: "Furor Progress",
    location: "Tashkent",
    duration: "Mar 2025 - May 2025",
    type: "Full-time & Onsite",
    description:
      "At Furor Progress, I contributed to major systems like HududGazTaminoti and EcoFound as a backend developer, gaining deep experience in Jersey, Oracle, and MyBatis.",
    technologies: ["Java 8", "Jersey", "ORACLE", "MyBatis", "Vue"],
    achievements: [
      "1C integrated",
      "Contributed to various projects",
      "Implemented event-driven architecture",
    ],
  },
  {
    id: 2,
    title: "Mentor | Support Teacher",
    company: "Isystem IT Academy",
    location: "Tashkent",
    duration: "May 2022 - Jul 2024",
    type: "Part Time & Onsite",
    description:
      "As a teacher, I began my tutoring job at Isystem IT Academy. Now, both my students and I are deeply passionate about teaching and learning. In the future, I aim to achieve even greater results through continuous learning and training.",
    technologies: ["Java 17 & 21", "Data Structure", "OOP", "Teaching", "PostgreSQL", "Git", "Maven", "StreamAPI", "Multithreading", "Spring Boot", "Hibernate", "Spring Security", "Spring Data JPA", "Algorithms"],
    achievements: ["Teaching", "Practice Projects", "Taking tests"],
  },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(experienceData)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newExperience = await request.json()
    const id = Math.max(...experienceData.map((e) => e.id)) + 1
    const experience = { ...newExperience, id }
    experienceData.push(experience)
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedExperience = await request.json()
    const index = experienceData.findIndex((e) => e.id === updatedExperience.id)
    if (index === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 })
    }
    experienceData[index] = updatedExperience
    return NextResponse.json(updatedExperience)
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
    experienceData = experienceData.filter((e) => e.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
