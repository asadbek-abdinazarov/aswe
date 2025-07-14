import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let projectsData =[
  {
    id: 1,
    title: "U-SHORT",
    description:
      "A simple, secure, and modern URL shortening web application built with Java Spring Boot, Thymeleaf, and PostgreSQL.",
    shortDescription: "U-SHORT is an open source URL shortening web application written in Spring Boot, Thymeleaf, and PostgreSQL technologies. It provides easy-to-use, modern interface, and secure URL generation.",
    image: "/u-short.png",
    technologies: ["Java 17", "Spring Boot", "PostgreSQL", "Thymeleaf", "HTML", "CSS", "Bootstrap"],
    githubUrl: "https://github.com/asadbek-abdinazarov/u-short",
    liveUrl: "http://ushort.javachi.uz",
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/my-photo.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      }
    ],
    features: [
      "Safe & Unique Short URLs",
      "Click Tracking (optional)",
      "Custom Domain Support",
      "Modern UI with Thymeleaf and Bootstrap",
      " PostgreSQL database integration",
      "Easy deployment on Railway / Render / VPS",
    ],
    metrics: {
      users: "1K+",
      requests: "500+/day",
      uptime: "85%",
    },
    duration: "2 months",
    team: "1 developers",
    status: "Production",
  },
  {
    id: 2,
    title: "MilliyWay Pos System",
    description: "High-performance Point of Sale (POS) system designed for small and medium businesses. It supports sales management, inventory tracking, receipt printing, and real-time reporting. Built with modern technologies for speed, reliability, and scalability.",
    shortDescription: "Alternative Point of Sale System",
    image: "/projects/pos-img.png",
    technologies: ["Java 17", "Spring Boot", "Dart", "Flutter", "Esc/POS"],
    githubUrl: null,
    liveUrl: null,
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/placeholder-user.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      },
      {
        name: "Muhammad Akhmadaliyev",
        avatar: "/Muhammad's-Photo.png",
        role: "Flutter Developer",
        email: "akhmadaliyev17x@gmail.com"
      }
    ],
    features: [
      "Sales and invoice management",
      "Product and inventory tracking",
      "Real-time data sync with WebSocket",
      "Receipt printing with ESC/POS support",
      "Barcode scanner integration",
      "Multi-user support with role-based access",
      "Offline mode and sync on reconnect",
      "Daily/weekly sales reports"
    ],
    metrics: {
      endpoints: null,
      coverage: null,
      performance: null,
    },
    duration: "1 month",
    team: "2 developers",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Qo'shniPay | QPay",
    description:
    "Qo‘shniPay (QPay) is a peer-to-peer microcredit and installment payment platform that allows users to lend and borrow money within trusted social circles. The platform integrates with OneID for secure authentication and uses facial recognition for identity verification. It includes borrower rating systems, automated installment tracking, and a transparent lending process.",
    shortDescription: "Trust-based microloan and installment platform",
    image: "/projects/qpay-img.png",
    technologies: ["Java 17", "Spring Framework", "PostgreSQL", "JWT", "OneID Integration", "Face Recognition"],
    githubUrl: null,
    liveUrl: null,
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/placeholder-user.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      },
      {
        name: "Muhammad Akhmadaliyev",
        avatar: "/Muhammad's-Photo.png",
        role: "Flutter Developer",
        email: "akhmadaliyev17x@gmail.com"
      }
    ],
    features: [
      "User registration and authentication via OneID",
      "Facial recognition verification",
      "Microloan request and approval system",
      "Trust-based scoring and borrower ratings",
      "Automated installment scheduling and tracking",
      "Email/SMS notifications for due dates",
      "Admin dashboard for system monitoring",
      "Secure RESTful API with JWT authorization"
    ],
    metrics: {
      endpoints: null,
      coverage: null,
      performance: null,
    },
    duration: "3 months",
    team: "2 developers",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Texno Tasnim",
    description:
    "Texno Tasnim is a Telegram-based installment sales management system designed for retail shops that sell products on a monthly payment basis. The platform automates the entire sales workflow including customer registration, product selection, payment scheduling, and installment tracking — all through an interactive Telegram bot. It also features admin panels, reporting, and Google Sheets synchronization for backups and analytics.",
    shortDescription: "Telegram bot for managing installment-based product sales",
    image: "/projects/texno-tasnim-img.png",
    technologies: ["Java 17", "Spring Framework", "PostgreSQL", "Google Sheets Integration", "Telegram Bot API"],
    githubUrl: null,
    liveUrl: "https://t.me/TexnoTasnimBot",
    developers: [
      {
        name: "Asadbek Abdinazarov",
        avatar: "/my-photo.jpg",
        role: "Full Stack Developer",
        email: "a.abdinazarov@student.pdp.university"
      }
    ],
    features: [
      "Customer registration via Telegram bot",
      "Product selection and order creation through chat",
      "Installment scheduling and due date reminders",
      "Admin commands for managing customers and products",
      "Google Sheets integration for data backup and analytics",
      "Monthly and daily sales summary reports",
      "Role-based access (admin, seller, customer)",
    ],
    metrics: {
      endpoints: null,
      coverage: null,
      performance: null,
    },
    duration: "3 months",
    team: "1 developers",
    status: "Completed",
  },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(projectsData)
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const newProject = await request.json()
    const id = Math.max(...projectsData.map((p) => p.id)) + 1
    const project = { ...newProject, id }
    projectsData.push(project)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updatedProject = await request.json()
    const index = projectsData.findIndex((p) => p.id === updatedProject.id)
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    projectsData[index] = updatedProject
    return NextResponse.json(updatedProject)
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
    projectsData = projectsData.filter((p) => p.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
