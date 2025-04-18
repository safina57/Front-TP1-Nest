import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-block rounded-lg bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-zinc-400">Start managing your professional resume</p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  required
                  className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-violet-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  required
                  className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-violet-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="hello@example.com"
                required
                type="email"
                className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-violet-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-violet-500"
              />
              <div className="h-1 w-full rounded-full bg-zinc-800">
                <div className="h-1 w-1/3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
              </div>
              <p className="text-xs text-zinc-400">Password strength: Weak</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                required
                type="password"
                className="border-zinc-800 bg-zinc-950 text-white placeholder:text-zinc-400 focus-visible:ring-violet-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="border-zinc-800 data-[state=checked]:bg-violet-600 data-[state=checked]:text-white"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="#" className="text-violet-400 hover:text-violet-300">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-violet-400 hover:text-violet-300">
                  privacy policy
                </Link>
              </label>
            </div>
            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700">
              Create Account
            </Button>
          </div>
          <div className="relative flex items-center justify-center">
            <Separator className="bg-zinc-800" />
            <span className="absolute bg-black px-2 text-xs text-zinc-400">OR CONTINUE WITH</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="border-zinc-800 bg-transparent text-white hover:bg-zinc-900">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </Button>
          </div>
          <div className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-violet-400 hover:text-violet-300">
              <ArrowLeft className="mr-1 inline-block h-3 w-3" /> Sign in
            </Link>
          </div>
        </div>
      </div>
      <footer className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-400">
        <p>© 2024 ResumeHub. All rights reserved.</p>
      </footer>
    </div>
  )
}
