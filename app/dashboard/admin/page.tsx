"use client"

import { useState } from "react"
import { Download, FileText, Filter, MoreHorizontal, Search, Shield, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"

// Mock data for all users' CVs
const mockAllCVs = [
  {
    id: "1",
    filename: "Software_Engineer_CV.pdf",
    uploadDate: "2024-04-10T10:30:00Z",
    tags: ["Software", "Engineering", "React"],
    status: "active",
    user: {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "2",
    filename: "Product_Manager_Resume.pdf",
    uploadDate: "2024-03-22T14:15:00Z",
    tags: ["Product", "Management", "Agile"],
    status: "active",
    user: {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "3",
    filename: "UX_Designer_Portfolio.pdf",
    uploadDate: "2024-02-15T09:45:00Z",
    tags: ["Design", "UX", "Portfolio"],
    status: "archived",
    user: {
      id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  },
  {
    id: "4",
    filename: "Data_Scientist_CV.pdf",
    uploadDate: "2024-01-05T16:20:00Z",
    tags: ["Data Science", "Python", "ML"],
    status: "active",
    user: {
      id: "u3",
      name: "Alex Johnson",
      email: "alex@example.com",
    },
  },
  {
    id: "5",
    filename: "Marketing_Specialist_Resume.pdf",
    uploadDate: "2024-04-05T11:20:00Z",
    tags: ["Marketing", "Social Media", "SEO"],
    status: "active",
    user: {
      id: "u4",
      name: "Sarah Williams",
      email: "sarah@example.com",
    },
  },
  {
    id: "6",
    filename: "Frontend_Developer_CV.pdf",
    uploadDate: "2024-03-18T13:40:00Z",
    tags: ["Frontend", "JavaScript", "React"],
    status: "active",
    user: {
      id: "u2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  },
]

export default function AdminDashboardPage() {
  const [cvs, setCvs] = useState(mockAllCVs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter CVs based on search query and status filter
  const filteredCVs = cvs.filter((cv) => {
    const matchesSearch =
      cv.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cv.user.email.toLowerCase().includes(searchQuery.toLowerCase())

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
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-zinc-400">Manage all user CVs across the platform</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search CVs or users..."
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
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80">
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">CV</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Tags
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950/50">
                {filteredCVs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">
                      No CVs found matching your search criteria
                    </td>
                  </tr>
                ) : (
                  filteredCVs.map((cv) => (
                    <tr key={cv.id} className="hover:bg-zinc-900/30">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-2">
                            <FileText className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium text-white">{cv.filename}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-zinc-800 p-2">
                            <User className="h-4 w-4 text-zinc-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{cv.user.name}</div>
                            <div className="text-xs text-zinc-400">{cv.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {cv.tags.map((tag) => (
                            <Badge key={tag} className="bg-zinc-900 text-zinc-300 hover:bg-zinc-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            cv.status === "active"
                              ? "bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                              : "bg-amber-950 text-amber-400 hover:bg-amber-900"
                          }
                        >
                          {cv.status === "active" ? "Active" : "Archived"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-zinc-400">{formatDate(cv.uploadDate)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
