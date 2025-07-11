import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Simple authentication - in production, use proper password hashing
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, hash this password
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set authentication cookie
      const cookieStore = await cookies()
      cookieStore.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return NextResponse.json({ success: true, message: "Login successful" })
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
