"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, Shield, CheckCircle, Loader2, Copy, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Product } from "@/lib/supabase/types"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push("/login")
        return
      }

      const response = await fetch(`/api/products`)
      if (!response.ok) throw new Error("Failed to fetch products")

      const { products } = await response.json()
      const foundProduct = products.find((p: Product) => p.id === params.id)

      if (!foundProduct) {
        toast({
          title: "Product Not Found",
          variant: "destructive",
        })
        router.push("/dashboard")
        return
      }

      setProduct(foundProduct)
    } catch (error) {
      console.error("Fetch error:", error)
      toast({
        title: "Error",
        description: "Failed to load product.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const registerProduct = async () => {
    if (!product || product.is_registered) return

    setRegistering(true)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      })

      if (!response.ok) throw new Error("Registration failed")

      const { product: updatedProduct } = await response.json()
      setProduct(updatedProduct)

      toast({
        title: "Success!",
        description: "Product registered on blockchain.",
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setRegistering(false)
    }
  }

  const simulateTrueMarkScan = () => {
    setScanning(true)
    setScanProgress(0)

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setScanning(false)
            setScanProgress(0)
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Copied to clipboard.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Image */}
          <div className="space-y-6">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full rounded-lg shadow-lg"
              />
            )}

            {product.is_registered && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <CardTitle>TrueMark™ Scanner</CardTitle>
                  </div>
                  <CardDescription>
                    Verify the microscopic authentication pattern
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scanning ? (
                    <div className="space-y-4">
                      <Progress value={scanProgress} />
                      <p className="text-sm text-center text-muted-foreground">
                        Scanning TrueMark™ pattern...
                      </p>
                    </div>
                  ) : scanProgress === 100 ? (
                    <div className="text-center space-y-4">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-bold text-green-500">
                          Pattern Verified
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: 98.7%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={simulateTrueMarkScan}
                      variant="gradient"
                      className="w-full"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Scan TrueMark™
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                {product.is_registered ? (
                  <Badge className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Registered
                  </Badge>
                ) : (
                  <Badge variant="secondary">Not Registered</Badge>
                )}
              </div>

              {product.brand && (
                <p className="text-xl text-muted-foreground mb-2">
                  Brand: {product.brand}
                </p>
              )}

              {product.category && (
                <p className="text-muted-foreground mb-4">
                  Category: {product.category}
                </p>
              )}

              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            {/* Blockchain Info */}
            {product.is_registered ? (
              <Card className="border-2 border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Blockchain Registration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>TrueMark™ ID</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 p-2 bg-muted rounded text-sm">
                        {product.truemark_id}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(product.truemark_id!)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Transaction Hash</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 p-2 bg-muted rounded text-sm truncate">
                        {product.blockchain_tx_hash}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(product.blockchain_tx_hash!)
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href={`/verify?id=${product.truemark_id}`}>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Public Verification Page
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>Register on Blockchain</CardTitle>
                  <CardDescription>
                    Generate TrueMark™ ID and secure your product on the blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={registerProduct}
                    disabled={registering}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                  >
                    {registering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Register Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(product.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{new Date(product.updated_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="font-mono text-xs">{product.id}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium mb-1">{children}</p>
}
