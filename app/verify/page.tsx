"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Search, CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MicroscopicAnalysis } from "@/components/microscopic-analysis"
import { ConfidenceScore } from "@/components/confidence-score"
import { WorkflowTimeline } from "@/components/workflow-timeline"
import { AIStory } from "@/components/ai-story"
import { VeChainBadge } from "@/components/vechain-badge"
import { NFTCertificate } from "@/components/nft-certificate"

// Component that handles search params - must be wrapped in Suspense
function SearchParamsHandler({ onIdFromParams }: { onIdFromParams: (id: string) => void }) {
  const searchParams = useSearchParams()
  const idFromParams = searchParams.get("id") || ""

  // Pass the ID to parent on mount/update
  useEffect(() => {
    if (idFromParams) {
      onIdFromParams(idFromParams)
    }
  }, [idFromParams, onIdFromParams])

  return null
}

function VerifyContent() {
  const { toast } = useToast()

  const [truemarkId, setTruemarkId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!truemarkId.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a TrueMark™ ID.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/verify/${truemarkId}`)

      if (!response.ok && response.status !== 200) {
        throw new Error("Verification failed")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Verification Failed",
        description: "Please check the TrueMark™ ID and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleIdFromParams = (id: string) => {
    setTruemarkId(id)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SearchParams Handler - wrapped in Suspense */}
      <Suspense fallback={null}>
        <SearchParamsHandler onIdFromParams={handleIdFromParams} />
      </Suspense>

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
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Verify Product <span className="gradient-text">Authenticity</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter the TrueMark™ ID to verify if a product is authentic
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter TrueMark™ ID</CardTitle>
            <CardDescription>
              The TrueMark™ ID can be found on the product packaging or certificate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="truemark">TrueMark™ ID</Label>
                <Input
                  id="truemark"
                  value={truemarkId}
                  onChange={(e) => setTruemarkId(e.target.value)}
                  placeholder="e.g., TM-1234567890-ABC12345"
                  className="font-mono"
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
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Verify Product
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card
            className={`border-2 ${
              result.result === "authentic"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                {result.result === "authentic" ? (
                  <CheckCircle className="h-12 w-12 text-green-500" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-500" />
                )}
                <div>
                  <CardTitle className="text-2xl">
                    {result.result === "authentic"
                      ? "Product Verified ✓"
                      : "Verification Failed ✗"}
                  </CardTitle>
                  <CardDescription>{result.message}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.result === "authentic" && result.product && (
                <>
                  {/* Product Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Product Name</Label>
                      <p className="text-lg font-semibold">
                        {result.product.name}
                      </p>
                    </div>
                    {result.product.brand && (
                      <div>
                        <Label>Brand</Label>
                        <p className="text-lg font-semibold">
                          {result.product.brand}
                        </p>
                      </div>
                    )}
                    {result.product.category && (
                      <div>
                        <Label>Category</Label>
                        <p className="text-lg">{result.product.category}</p>
                      </div>
                    )}
                  </div>

                  {result.product.description && (
                    <div className="border-t pt-4">
                      <Label>Description</Label>
                      <p className="text-muted-foreground mt-2">
                        {result.product.description}
                      </p>
                    </div>
                  )}
                </>
              )}

              {result.result === "counterfeit" && (
                <div className="space-y-4 text-center">
                  <p className="text-muted-foreground">
                    This product could not be verified in our blockchain registry.
                    It may be counterfeit or the TrueMark™ ID may be incorrect.
                  </p>
                  <div className="p-4 bg-red-500/10 rounded-lg">
                    <p className="text-sm font-medium text-red-500">
                      ⚠️ Warning: This product may not be authentic
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      If you believe this is an error, please contact the manufacturer
                      or seller for verification.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Enhanced Features - Only show when authentic */}
        {result && result.result === "authentic" && result.product && (
          <div className="space-y-6 mt-8">
            {/* VeChain Badge */}
            <VeChainBadge
              transactionHash={result.product.blockchain_tx_hash}
              verified={true}
            />

            {/* Grid layout for feature components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Confidence Score */}
              <ConfidenceScore score={result.confidence} />

              {/* Microscopic Analysis */}
              <MicroscopicAnalysis confidence={result.confidence} />
            </div>

            {/* Workflow Timeline */}
            <WorkflowTimeline productName={result.product.name} />

            {/* AI Story */}
            <AIStory
              productName={result.product.name}
              brand={result.product.brand}
              category={result.product.category}
            />

            {/* NFT Certificate */}
            <NFTCertificate
              productName={result.product.name}
              truemarkId={result.product.truemark_id}
              brand={result.product.brand}
              issuedDate={result.product.registered_at}
            />
          </div>
        )}

        {/* How to Find TrueMark™ ID */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Find Your TrueMark™ ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Check the product packaging</p>
                  <p className="text-sm text-muted-foreground">
                    Look for a TrueMark™ sticker or label on the packaging
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Scan the QR code</p>
                  <p className="text-sm text-muted-foreground">
                    If available, scan the QR code to automatically fill in the ID
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Enter the ID manually</p>
                  <p className="text-sm text-muted-foreground">
                    Type the TrueMark™ ID exactly as it appears on the product
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
