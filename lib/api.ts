// API Configuration - Update these URLs to match your external backend
const API_BASE_URL = "http://64.226.76.213:5001/api"

import {
  defaultAboutData,
  defaultExperienceData,
  defaultEducationData,
  defaultSkillsData,
  defaultProjectsData,
  defaultPostsData,
  defaultArticlesData,
  defaultMessagesData,
} from "./default-data"

// API Client that always returns default data (no network requests)
class ApiClient {
  async getAbout() {
    return Promise.resolve(require('./default-data').defaultAboutData)
  }
  async getExperience() {
    return Promise.resolve(require('./default-data').defaultExperienceData)
  }
  async getEducation() {
    return Promise.resolve(require('./default-data').defaultEducationData)
  }
  async getSkills() {
    return Promise.resolve(require('./default-data').defaultSkillsData)
  }
  async getProjects() {
    // Ensure developers is always an array for each project
    const projects = require('./default-data').defaultProjectsData.map((p: any) => ({
      ...p,
      developers: Array.isArray(p.developers) ? p.developers : [],
    }))
    return Promise.resolve(projects)
  }
  async getPosts() {
    return Promise.resolve(require('./default-data').defaultPostsData)
  }
  async getPostById(id: string) {
    const posts = require('./default-data').defaultPostsData
    return Promise.resolve(posts.find((p: any) => p.id.toString() === id))
  }
  async getArticles() {
    return Promise.resolve(require('./default-data').defaultArticlesData)
  }
  async getArticleById(id: string) {
    const articles = require('./default-data').defaultArticlesData
    return Promise.resolve(articles.find((a: any) => a.id.toString() === id))
  }
  async getMessages() {
    return Promise.resolve(require('./default-data').defaultMessagesData)
  }
  // Auth methods (simulate always authenticated for demo)
  async checkAuth() {
    return Promise.resolve({ authenticated: true })
  }
  async login() {
    return Promise.resolve({ success: true, token: 'demo-token', message: 'Demo login successful' })
  }
  async logout() {
    return Promise.resolve({ success: true })
  }

  // Real backend call for contact form
  async createMessage(data: { name: string; email: string; message: string }) {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      throw new Error("Failed to send message")
    }
    return res.json()
  }
} 

export const apiClient = new ApiClient()
