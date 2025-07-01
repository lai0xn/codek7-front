"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { FileBrowser } from "@/components/file-browser"
import { VideoPlayer } from "@/components/video-player"

interface FileItem {
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  duration?: string
  format?: string
}

export default function StreamingManager() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleFileSelect = (file: FileItem) => {
    if (file.type === "file") {
      setSelectedFile(file)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 overflow-hidden">
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
        </main>
      </div>
    </div>
  )
}
