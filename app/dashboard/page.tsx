"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Download, FileText, Filter, MoreHorizontal, Plus, Search, Tag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"

// Mock data for CVs
const mockCVs = [
  {
    id: "1",
    filename: "Software_Engineer_CV.pdf",
    uploadDate: "2024-04-10T10:30:00Z",
    tags: ["Software", "Engineering", "React"],
    status: "active",
  },
  {
    id: "2",
    filename: "Product_Manager_Resume.pdf",
    uploadDate: "2024-03-22T14:15:00Z",
    tags: ["Product", "Management", "Agile"],
    status: "active",
  },
  {
    id: "3",
    filename: "UX_Designer_Portfolio.pdf",
    uploadDate: "2024-02-15T09:45:00Z",
    tags: ["Design", "UX", "Portfolio"],
    status: "archived",
  },
  {
    id: "4",
    filename: "Data_Scientist_CV.pdf",
    uploadDate: "2024-01-05T16:20:00Z",
    tags: ["Data Science", "Python", "ML"],
    status: "active",
  },
]

export default function DashboardPage() {
  const [cvs, setCvs] = useState(mockCVs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter CVs based on search query and status filter
  const filteredCVs = cvs.filter((cv) => {
    const matchesSearch =
      cv.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === "all" || cv.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleDelete = (id: string) => {
    setCvs(cvs.filter((cv) => cv.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white">My CVs</h1>
          <p className="text-zinc-400">Manage and organize your resume collection</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search CVs..."
              className="w-full border-zinc-800 bg-zinc-950 pl-8 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900">
                  <Filter className="mr-2 h-4 w-4" />
                  {filterStatus === "all" ? "All CVs" : filterStatus === "active" ? "Active" : "Archived"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-950 border-zinc-800 text-white">
                <DropdownMenuItem onClick={() => setFilterStatus("all")} className="hover:bg-zinc-900">
                  All CVs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")} className="hover:bg-zinc-900">
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("archived")} className="hover:bg-zinc-900">
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
            >
              <Link href="/dashboard/upload">
                <Plus className="mr-2 h-4 w-4" />
                Upload CV
              </Link>
            </Button>
          </div>
        </div>

        {filteredCVs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center">
            <FileText className="h-12 w-12 text-zinc-600" />
            <h3 className="mt-4 text-lg font-medium text-white">No CVs found</h3>
            <p className="mt-2 text-sm text-zinc-400">
              {searchQuery ? "Try a different search term or clear filters" : "Upload your first CV to get started"}
            </p>
            {!searchQuery && (
              <Button
                asChild
                className="mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
              >
                <Link href="/dashboard/upload">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload CV
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCVs.map((cv) => (
              <div
                key={cv.id}
                className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-950/50 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-2">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="truncate">
                      <h3 className="font-medium text-white truncate" title={cv.filename}>
                        {cv.filename}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-zinc-400">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(cv.uploadDate)}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-white">
                      <DropdownMenuItem className="hover:bg-zinc-900">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-zinc-900 hover:text-red-500"
                        onClick={() => handleDelete(cv.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start gap-2">
                    <Tag className="h-4 w-4 text-zinc-400 mt-0.5" />
                    <div className="flex flex-wrap gap-1">
                      {cv.tags.map((tag) => (
                        <Badge key={tag} className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-zinc-800 p-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        cv.status === "active"
                          ? "bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                          : "bg-amber-950 text-amber-400 hover:bg-amber-900"
                      }
                    >
                      {cv.status === "active" ? "Active" : "Archived"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-violet-400 hover:bg-zinc-900 hover:text-violet-300"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
