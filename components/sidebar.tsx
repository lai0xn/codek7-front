"use client"

import { Button } from "@/components/ui/button"
import { Home, FolderOpen, Upload, Settings, BarChart3, Users, HardDrive, Key } from "lucide-react"

type Page = "files" | "analytics" | "api-keys" | "upload" | "users" | "settings"

interface SidebarProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <HardDrive className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">StreamManager</span>
        </div>

        <nav className="space-y-2">
          <Button
            variant={currentPage === "files" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("files")}
          >
            <Home className="w-4 h-4 mr-3" />
            Dashboard
          </Button>

          <Button
            variant={currentPage === "files" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("files")}
          >
            <FolderOpen className="w-4 h-4 mr-3" />
            File Browser
          </Button>

          <Button
            variant={currentPage === "upload" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("upload")}
          >
            <Upload className="w-4 h-4 mr-3" />
            Upload
          </Button>

          <Button
            variant={currentPage === "analytics" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("analytics")}
          >
            <BarChart3 className="w-4 h-4 mr-3" />
            Analytics
          </Button>

          <Button
            variant={currentPage === "api-keys" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("api-keys")}
          >
            <Key className="w-4 h-4 mr-3" />
            API Keys
          </Button>

          <Button
            variant={currentPage === "users" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("users")}
          >
            <Users className="w-4 h-4 mr-3" />
            Users
          </Button>

          <Button
            variant={currentPage === "settings" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => onPageChange("settings")}
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Storage Used</span>
            <span>2.1 TB / 5 TB</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "42%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
