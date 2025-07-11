"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const checkAuth = async () => {
    try {
      const result = await apiClient.checkAuth()
      setIsAuthenticated(result.authenticated)
      return result.authenticated
    } catch (error) {
      setIsAuthenticated(false)
      return false
    }
  }

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const result = await apiClient.login(credentials)
      if (result.success && result.token) {
        localStorage.setItem("admin-token", result.token)
        setIsAuthenticated(true)
      }
      return result
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
      localStorage.removeItem("admin-token")
      setIsAuthenticated(false)
    } catch (error) {
      // Even if API call fails, clear local state
      localStorage.removeItem("admin-token")
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return { isAuthenticated, login, logout, checkAuth }
}
