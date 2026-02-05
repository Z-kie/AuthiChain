"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Shield, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Redirect users to a dedicated confirmation page after they click the emailed link.
          // This provides a consistent UX whether or not the session is immediately available.
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/confirmed`,
        },
      })

      if (error) throw error

      toast({
        title: "Account Created!",
        description: "Please check your email to confirm your account.",
      })

      // If Supabase returned a user/session the user was auto-signed-in — go to dashboard.
      // Otherwise, send the user to the confirmation instructions page.
      if (data?.user) {
        router.push("/dashboard")
      } else {
        router.push("/auth/confirmed")
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      toast({
        title: "Signup Failed",
        description: error.message || "Failed to create account.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">AuthiChain</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Get Started</CardTitle>
            <CardDescription>
              Create your AuthiChain account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm">
              Already have an account? <Link href="/login" className="text-primary underline">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}