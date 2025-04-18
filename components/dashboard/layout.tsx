"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, FileText, Home, LogOut, Menu, Settings, Shield, User, UserCog } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

// Mock user data
const currentUser = {
  name: "John Doe",
  email: "john@example.com",
  role: "admin", // or "user"
  avatar: "/placeholder.svg?height=32&width=32",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isAdmin = currentUser.role === "admin"

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "My CVs",
      href: "/dashboard",
      icon: FileText,
      current: pathname === "/dashboard",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ]

  // Admin-only navigation items
  const adminNavigation = [
    {
      name: "Admin Dashboard",
      href: "/dashboard/admin",
      icon: Shield,
      current: pathname === "/dashboard/admin",
    },
    {
      name: "User Management",
      href: "/dashboard/admin/users",
      icon: UserCog,
      current: pathname === "/dashboard/admin/users",
    },
  ]

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-zinc-800 bg-zinc-950 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="inline-block rounded-lg bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-2">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-white">ResumeHub</span>
          </div>
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${item.current ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 
                      ${item.current ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-400"}
                    `}
                  />
                  {item.name}
                </Link>
              ))}

              {isAdmin && (
                <>
                  <div className="pt-4 pb-2">
                    <div className="px-2">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Admin</p>
                    </div>
                  </div>

                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group flex items-center px-2 py-2 text-sm font-medium rounded-md
                        ${item.current ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}
                      `}
                    >
                      <item.icon
                        className={`
                          mr-3 h-5 w-5 
                          ${item.current ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-400"}
                        `}
                      />
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>

          <div className="flex-shrink-0 flex border-t border-zinc-800 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center w-full group">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="ml-3 flex-1 flex flex-col items-start">
                    <p className="text-sm font-medium text-white">{currentUser.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                  </div>
                  <ChevronDown className="ml-1 h-4 w-4 text-zinc-500 group-hover:text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-white">
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="hover:bg-zinc-900">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 border-r border-zinc-800 bg-zinc-950">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="inline-block rounded-lg bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-2">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">ResumeHub</span>
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${item.current ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`
                        mr-3 h-5 w-5 
                        ${item.current ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-400"}
                      `}
                    />
                    {item.name}
                  </Link>
                ))}

                {isAdmin && (
                  <>
                    <div className="pt-4 pb-2">
                      <div className="px-2">
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Admin</p>
                      </div>
                    </div>

                    {adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          group flex items-center px-2 py-2 text-sm font-medium rounded-md
                          ${
                            item.current ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          }
                        `}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon
                          className={`
                            mr-3 h-5 w-5 
                            ${item.current ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-400"}
                          `}
                        />
                        {item.name}
                      </Link>
                    ))}
                  </>
                )}
              </nav>
            </div>

            <div className="flex-shrink-0 flex border-t border-zinc-800 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User className="h-5 w-5" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">{currentUser.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{currentUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-zinc-950 border-b border-zinc-800">
          <button
            type="button"
            className="md:hidden px-4 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-end px-4">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full p-1 text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
              </button>

              {/* Profile dropdown - mobile only */}
              <div className="ml-3 relative md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex max-w-xs items-center rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <User className="h-5 w-5" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-zinc-800 text-white">
                    <DropdownMenuItem className="hover:bg-zinc-900">
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-zinc-900">
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem className="hover:bg-zinc-900">
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 bg-gradient-to-br from-black to-zinc-900">{children}</main>
      </div>
    </div>
  )
}
