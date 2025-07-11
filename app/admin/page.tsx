import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to home page since admin is blocked
  redirect("/")
}
