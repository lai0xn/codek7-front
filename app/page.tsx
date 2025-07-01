"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FileBrowser } from "@/components/file-browser"
import { VideoPlayer } from "@/components/video-player"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ApiKeyManagement } from "@/components/api-keys/api-key-management"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

interface FileItem {
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  duration?: string
  format?: string
}

type AuthMode = "login" | "signup" | null
type Page = "files" | "analytics" | "api-keys" | "upload" | "users" | "settings"

export default function StreamingManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [currentPage, setCurrentPage] = useState<Page>("files")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setAuthMode(null)
  }

  const handleSignup = () => {
    setIsAuthenticated(true)
    setAuthMode(null)
  }

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "file") {
      setSelectedFile(file)
    }
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    if (authMode === "login") {
      return <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setAuthMode("signup")} />
    } else if (authMode === "signup") {
      return <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setAuthMode("login")} />
    }
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "analytics":
        return <AnalyticsDashboard />

      case "api-keys":
        return <ApiKeyManagement />

      case "files":
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* File Browser */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">File Browser</h2>
              <FileBrowser onFileSelect={handleFileSelect} />
            </div>

            {/* Video Player */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Media Preview</h2>
              <VideoPlayer
                fileName={selectedFile?.name}
                fileSize={selectedFile?.size}
                duration={selectedFile?.duration}
                format={selectedFile?.format}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-auto">{renderPageContent()}</main>
      </div>
    </div>
  )
}
