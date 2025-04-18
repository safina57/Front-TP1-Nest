"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  FileText,
  Filter,
  MoreHorizontal,
  Search,
  Shield,
  User,
  UserCog,
  UserX,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for users
const mockUsers = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    cvCount: 12,
    signupDate: "2023-09-15T10:30:00Z",
    lastLogin: "2024-04-17T08:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    cvCount: 8,
    signupDate: "2023-10-22T14:15:00Z",
    lastLogin: "2024-04-16T16:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "user",
    status: "active",
    cvCount: 5,
    signupDate: "2023-11-05T09:45:00Z",
    lastLogin: "2024-04-15T11:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "user",
    status: "inactive",
    cvCount: 3,
    signupDate: "2024-01-18T13:40:00Z",
    lastLogin: "2024-03-28T14:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    status: "active",
    cvCount: 7,
    signupDate: "2023-12-10T11:30:00Z",
    lastLogin: "2024-04-17T09:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u6",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    status: "active",
    cvCount: 4,
    signupDate: "2024-02-05T15:20:00Z",
    lastLogin: "2024-04-16T10:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u7",
    name: "David Wilson",
    email: "david@example.com",
    role: "user",
    status: "active",
    cvCount: 9,
    signupDate: "2023-08-22T08:15:00Z",
    lastLogin: "2024-04-14T16:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "u8",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    role: "user",
    status: "inactive",
    cvCount: 2,
    signupDate: "2024-03-12T10:20:00Z",
    lastLogin: "2024-04-01T11:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  // Sort users based on sort field and direction
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
      case "email":
        comparison = a.email.localeCompare(b.email)
        break
      case "role":
        comparison = a.role.localeCompare(b.role)
        break
      case "status":
        comparison = a.status.localeCompare(b.status)
        break
      case "cvCount":
        comparison = a.cvCount - b.cvCount
        break
      case "signupDate":
        comparison = new Date(a.signupDate).getTime() - new Date(b.signupDate).getTime()
        break
      case "lastLogin":
        comparison = new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()
        break
      default:
        comparison = 0
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id))
      setShowDeleteDialog(false)
      setSelectedUser(null)
    }
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const handleToggleUserRole = (userId: string) => {
    setUsers(
      users.map((user) => (user.id === userId ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user)),
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <UserCog className="h-6 w-6 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">User Management</h1>
          </div>
          <p className="text-zinc-400">Manage all users across the platform</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search users..."
              className="w-full border-zinc-800 bg-zinc-950 pl-8 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900">
                  <Filter className="mr-2 h-4 w-4" />
                  {filterRole === "all" ? "All Roles" : filterRole === "admin" ? "Admins" : "Users"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-950 border-zinc-800 text-white">
                <DropdownMenuItem onClick={() => setFilterRole("all")} className="hover:bg-zinc-900">
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole("admin")} className="hover:bg-zinc-900">
                  Admins
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterRole("user")} className="hover:bg-zinc-900">
                  Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900">
                  <Filter className="mr-2 h-4 w-4" />
                  {filterStatus === "all" ? "All Status" : filterStatus === "active" ? "Active" : "Inactive"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-950 border-zinc-800 text-white">
                <DropdownMenuItem onClick={() => setFilterStatus("all")} className="hover:bg-zinc-900">
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("active")} className="hover:bg-zinc-900">
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("inactive")} className="hover:bg-zinc-900">
                  Inactive
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <button className="flex items-center gap-1" onClick={() => handleSort("name")}>
                      User
                      {sortField === "name" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <button className="flex items-center gap-1" onClick={() => handleSort("role")}>
                      Role
                      {sortField === "role" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <button className="flex items-center gap-1" onClick={() => handleSort("status")}>
                      Status
                      {sortField === "status" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <button className="flex items-center gap-1" onClick={() => handleSort("cvCount")}>
                      CVs
                      {sortField === "cvCount" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <button className="flex items-center gap-1" onClick={() => handleSort("signupDate")}>
                      Signup Date
                      {sortField === "signupDate" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    <button className="flex items-center gap-1" onClick={() => handleSort("lastLogin")}>
                      Last Login
                      {sortField === "lastLogin" && (
                        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950/50">
                {sortedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-zinc-400">
                      No users found matching your search criteria
                    </td>
                  </tr>
                ) : (
                  sortedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-zinc-900/30">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-zinc-800 overflow-hidden">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-xs text-zinc-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            user.role === "admin"
                              ? "bg-violet-950 text-violet-400 hover:bg-violet-900"
                              : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                          }
                        >
                          {user.role === "admin" ? (
                            <Shield className="mr-1 h-3 w-3" />
                          ) : (
                            <User className="mr-1 h-3 w-3" />
                          )}
                          {user.role === "admin" ? "Admin" : "User"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            user.status === "active"
                              ? "bg-emerald-950 text-emerald-400 hover:bg-emerald-900"
                              : "bg-red-950 text-red-400 hover:bg-red-900"
                          }
                        >
                          {user.status === "active" ? (
                            <Check className="mr-1 h-3 w-3" />
                          ) : (
                            <X className="mr-1 h-3 w-3" />
                          )}
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-zinc-500" />
                          <span className="text-white">{user.cvCount}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-zinc-400">{formatDate(user.signupDate)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-zinc-400">{formatDate(user.lastLogin)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800 text-white">
                            <DropdownMenuItem
                              className="hover:bg-zinc-900"
                              onClick={() => handleToggleUserRole(user.id)}
                            >
                              {user.role === "admin" ? (
                                <>
                                  <User className="mr-2 h-4 w-4" />
                                  Demote to User
                                </>
                              ) : (
                                <>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Promote to Admin
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-zinc-900"
                              onClick={() => handleToggleUserStatus(user.id)}
                            >
                              {user.status === "active" ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate Account
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Activate Account
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem
                              className="text-red-500 hover:bg-zinc-900 hover:text-red-500"
                              onClick={() => {
                                setSelectedUser(user)
                                setShowDeleteDialog(true)
                              }}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Delete Account
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

        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Showing <span className="font-medium text-white">{sortedUsers.length}</span> of{" "}
            <span className="font-medium text-white">{users.length}</span> users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
              disabled
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Delete User Account</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Are you sure you want to delete {selectedUser?.name}&apos;s account? This action cannot be undone and will
              permanently delete all associated data including CVs.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              variant="outline"
              className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleDeleteUser}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
