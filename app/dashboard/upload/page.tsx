"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileUp, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"

export default function UploadCVPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) return

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-zinc-400 hover:text-white">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Upload CV</h1>
            <p className="text-zinc-400">Add a new resume to your collection</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cv-file" className="text-white">
                  CV File
                </Label>
                <div className="mt-1">
                  {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-950 p-12 text-center">
                      <FileUp className="h-12 w-12 text-zinc-600" />
                      <div className="mt-4 flex text-sm leading-6 text-zinc-400">
                        <label
                          htmlFor="cv-file"
                          className="relative cursor-pointer rounded-md font-semibold text-violet-400 hover:text-violet-300"
                        >
                          <span>Upload a file</span>
                          <Input
                            id="cv-file"
                            name="cv-file"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-zinc-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-2">
                          <FileUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{selectedFile.name}</p>
                          <p className="text-xs text-zinc-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-white"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Software Engineer Resume 2024"
                  className="mt-1 border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add a brief description of this CV..."
                  className="mt-1 min-h-[100px] border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tags" className="text-white">
                  Tags
                </Label>
                <div className="mt-1 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add tags (e.g. Software, Engineering)"
                      className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
                      onClick={handleAddTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag) => (
                        <Badge key={tag} className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
                          {tag}
                          <button
                            type="button"
                            className="ml-1 rounded-full hover:text-white"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="is-public"
                  type="checkbox"
                  className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 text-violet-600 focus:ring-violet-500"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <Label htmlFor="is-public" className="text-zinc-400">
                  Make this CV public (visible to recruiters)
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload CV"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
