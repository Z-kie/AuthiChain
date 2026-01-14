"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Scan, Lock, TrendingUp, CheckCircle, Zap, Sparkles, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">AuthiChain</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Powered by AI AutoFlow™</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Universal Authentication for{" "}
            <span className="gradient-text">Any Product</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI AutoFlow™ automatically classifies products across 10 industries and generates custom authentication workflows. From cannabis to luxury goods, electronics to pharmaceuticals—one platform for everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto">
                Start Protecting Now
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Verify a Product
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">
            <div>
              <div className="text-4xl font-bold gradient-text">10</div>
              <div className="text-sm text-muted-foreground">Industries</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">$14T+</div>
              <div className="text-sm text-muted-foreground">Market Coverage</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">98%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text">&lt;3s</div>
              <div className="text-sm text-muted-foreground">Classification Time</div>
            </div>
          </div>

          {/* Industry Icons */}
          <div className="pt-12 border-t mt-12">
            <p className="text-sm text-muted-foreground mb-6">Trusted across industries</p>
            <div className="flex flex-wrap justify-center gap-6 text-4xl">
              <span title="Cannabis">🌿</span>
              <span title="Luxury">💎</span>
              <span title="Electronics">📱</span>
              <span title="Pharma">💊</span>
              <span title="Fashion">👔</span>
              <span title="Automotive">🚗</span>
              <span title="Food & Beverage">🍷</span>
              <span title="Art">🎨</span>
              <span title="Cosmetics">💄</span>
              <span title="Sports">⚽</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">AuthiChain</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-leading technology to protect your brand and customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 border-purple-500/20 hover:border-purple-500 transition-colors bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-purple-500 mb-4" />
              <CardTitle>AI AutoFlow™ Engine</CardTitle>
              <CardDescription>
                Automatically classifies products across 10 industries and generates custom authentication workflows in under 3 seconds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Globe className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Universal Platform</CardTitle>
              <CardDescription>
                One platform for all industries: Cannabis, Luxury, Electronics, Pharma, Fashion, Automotive, Food, Art, Cosmetics, and Sports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Lock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Blockchain Security</CardTitle>
              <CardDescription>
                Immutable records on the blockchain ensure your products can't be
                counterfeited or tampered with
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Scan className="h-12 w-12 text-primary mb-4" />
              <CardTitle>TrueMark™ Technology</CardTitle>
              <CardDescription>
                Unique microscopic patterns verified through our proprietary
                scanning technology
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-secondary transition-colors">
            <CardHeader>
              <Shield className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Instant Verification</CardTitle>
              <CardDescription>
                Anyone can verify product authenticity in seconds using just a
                TrueMark™ ID
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-secondary transition-colors">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track verification scans, monitor your products, and gain insights
                into your supply chain
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-secondary transition-colors">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Easy Integration</CardTitle>
              <CardDescription>
                Simple API and SDK for seamless integration into your existing
                systems
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-muted/30 rounded-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to protect your products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
              1
            </div>
            <h3 className="text-xl font-bold">Upload Product</h3>
            <p className="text-muted-foreground">
              Upload a photo of your product. Our AI instantly classifies and
              analyzes it
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
              2
            </div>
            <h3 className="text-xl font-bold">Register on Blockchain</h3>
            <p className="text-muted-foreground">
              Get your unique TrueMark™ ID and blockchain transaction hash
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full gradient-primary text-white flex items-center justify-center text-2xl font-bold mx-auto">
              3
            </div>
            <h3 className="text-xl font-bold">Verify Anywhere</h3>
            <p className="text-muted-foreground">
              Anyone can verify your product's authenticity using the TrueMark™ ID
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8 p-12 rounded-3xl gradient-primary">
          <h2 className="text-4xl font-bold text-white">
            Ready to Protect Your Products?
          </h2>
          <p className="text-xl text-white/90">
            Join thousands of brands using AuthiChain to fight counterfeits and
            build customer trust
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="font-semibold">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gradient-text">AuthiChain</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 AuthiChain. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
