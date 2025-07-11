import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

let messagesData: any[] = []

async function checkAuth() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin-auth")
  return authCookie?.value === "authenticated"
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(messagesData)
}

export async function POST(request: NextRequest) {
  try {
    const newMessage = await request.json()
    const id = messagesData.length > 0 ? Math.max(...messagesData.map((m) => m.id)) + 1 : 1
    const message = {
      ...newMessage,
      id,
      createdAt: new Date().toISOString(),
      read: false,
    }
    messagesData.push(message)
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, read } = await request.json()
    const index = messagesData.findIndex((m) => m.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }
    messagesData[index].read = read
    return NextResponse.json(messagesData[index])
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
    messagesData = messagesData.filter((m) => m.id !== id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 })
  }
}
