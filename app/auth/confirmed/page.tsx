"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>Check your email</CardTitle>
          </div>
          <CardDescription>
            We've sent a confirmation link to your email. Click the link in the email to confirm your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            After confirming, return here and sign in.
          </p>
          <div className="flex justify-center gap-2">
            <Link href="/login">
              <Button variant="primary">Go to sign in</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}