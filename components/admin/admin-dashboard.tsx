"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, FileText, BookOpen, MessageSquare, Eye, TrendingUp, Activity } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { apiClient } from "@/lib/api"

export function AdminDashboard() {
  const { data: projectsData } = useApi(() => apiClient.getProjects())
  const { data: postsData } = useApi(() => apiClient.getPosts())
  const { data: articlesData } = useApi(() => apiClient.getArticles())
  const { data: messagesData } = useApi(() => apiClient.getMessages())

  const stats = [
    {
      title: "Total Projects",
      value: projectsData?.length?.toString() || "0",
      change: "+2 this month",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Published Posts",
      value: postsData?.length?.toString() || "0",
      change: "+4 this month",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Technical Articles",
      value: articlesData?.length?.toString() || "0",
      change: "+1 this month",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Unread Messages",
      value: messagesData?.filter((m: any) => !m.read)?.length?.toString() || "0",
      change: "2 new today",
      icon: MessageSquare,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    {
      action: "System using default data",
      details: "APIs unavailable - fallback data active",
      time: "Now",
      type: "system",
    },
    {
      action: "Portfolio loaded successfully",
      details: "All sections displaying content",
      time: "Just now",
      type: "success",
    },
    {
      action: "Admin panel accessed",
      details: "Content management available",
      time: "1 minute ago",
      type: "admin",
    },
  ]

  const quickActions = [
    { title: "Add New Project", href: "/admin/projects/new", icon: FolderOpen },
    { title: "Write New Post", href: "/admin/posts/new", icon: FileText },
    { title: "Create Article", href: "/admin/articles/new", icon: BookOpen },
    { title: "View Messages", href: "/admin/messages", icon: MessageSquare },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your portfolio.</p>
        {!process.env.NEXT_PUBLIC_API_BASE_URL && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Demo Mode:</strong> Using default data. Configure NEXT_PUBLIC_API_BASE_URL to connect to your
              backend.
            </p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="claymorphic border-0 hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                </div>
                <div className="claymorphic p-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="neomorphic border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "system"
                        ? "bg-blue-600"
                        : activity.type === "success"
                          ? "bg-green-600"
                          : "bg-orange-600"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.details}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="neomorphic border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="claymorphic p-4 text-center hover:scale-105 transition-all duration-300 block"
                >
                  <action.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-800">{action.title}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <Card className="neomorphic border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-600" />
            Portfolio Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">2,847</div>
              <div className="text-sm text-slate-600">Total Visitors</div>
              <div className="text-xs text-green-600 mt-1">+12% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">1,234</div>
              <div className="text-sm text-slate-600">Page Views</div>
              <div className="text-xs text-green-600 mt-1">+8% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800 mb-1">4.2</div>
              <div className="text-sm text-slate-600">Avg. Session Duration</div>
              <div className="text-xs text-blue-600 mt-1">+0.3 min from last month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
