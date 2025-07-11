"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FolderOpen,
  FileText,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-api"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()
  const { logout } = useAuth()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "About Me",
      href: "/admin/about",
      icon: User,
    },
    {
      title: "Experience",
      href: "/admin/experience",
      icon: Briefcase,
    },
    {
      title: "Education",
      href: "/admin/education",
      icon: GraduationCap,
    },
    {
      title: "Skills",
      href: "/admin/skills",
      icon: Code,
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: FolderOpen,
    },
    {
      title: "Posts",
      href: "/admin/posts",
      icon: FileText,
    },
    {
      title: "Articles",
      href: "/admin/articles",
      icon: BookOpen,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {!collapsed && <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>}
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="neomorphic w-8 h-8">
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "gradient-primary text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
                      collapsed && "justify-center",
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn("w-full justify-start text-slate-600 hover:text-red-600", collapsed && "justify-center")}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
