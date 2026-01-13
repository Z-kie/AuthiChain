"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Shield, Plus, Package, CheckCircle, Loader2, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Product } from "@/lib/supabase/types"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    fetchProducts()
  }, [])

  const checkUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      router.push("/login")
      return
    }

    setUser(user)
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")

      if (response.status === 401) {
        router.push("/login")
        return
      }

      if (!response.ok) throw new Error("Failed to fetch products")

      const { products } = await response.json()
      setProducts(products)
    } catch (error) {
      console.error("Fetch error:", error)
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const stats = {
    total: products.length,
    registered: products.filter((p) => p.is_registered).length,
    pending: products.filter((p) => !p.is_registered).length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">AuthiChain</span>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your products and blockchain registrations
            </p>
          </div>
          <Link href="/upload">
            <Button variant="gradient" size="lg" className="mt-4 md:mt-0">
              <Plus className="mr-2 h-5 w-5" />
              Upload Product
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-500/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {stats.registered}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Products</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Products Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your first product to get started
                </p>
                <Link href="/upload">
                  <Button variant="gradient">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Product
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                    {product.image_url && (
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="line-clamp-1">
                          {product.name}
                        </CardTitle>
                        {product.is_registered ? (
                          <Badge className="bg-green-500 shrink-0 ml-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Registered
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="shrink-0 ml-2">
                            Pending
                          </Badge>
                        )}
                      </div>
                      {product.brand && (
                        <CardDescription>{product.brand}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {product.category && (
                          <p className="text-muted-foreground">
                            Category: {product.category}
                          </p>
                        )}
                        {product.truemark_id && (
                          <p className="text-xs font-mono truncate">
                            {product.truemark_id}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
