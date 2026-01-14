"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Download, Share2, CheckCircle, Sparkles } from "lucide-react"

interface NFTCertificateProps {
  productName?: string
  truemarkId?: string
  brand?: string
  issuedDate?: string
  tokenId?: string
}

export function NFTCertificate({
  productName = "Verified Product",
  truemarkId = "TM-1234567890-ABC12345",
  brand = "Premium Brand",
  issuedDate = new Date().toISOString(),
  tokenId = "#" + Math.floor(Math.random() * 100000)
}: NFTCertificateProps) {
  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <CardTitle>NFT Certificate of Authenticity</CardTitle>
          </div>
          <Badge className="bg-gradient-to-r from-primary to-primary/70">
            <Sparkles className="h-3 w-3 mr-1" />
            Minted
          </Badge>
        </div>
        <CardDescription>
          Unique digital certificate stored on VeChain blockchain
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* NFT Preview Card */}
        <div className="relative aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

          {/* Certificate content */}
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4">
              <Award className="h-16 w-16 text-primary mx-auto mb-2" />
              <Badge variant="outline" className="border-primary">
                Certificate of Authenticity
              </Badge>
            </div>

            <h3 className="text-xl font-bold mb-2">{productName}</h3>
            <p className="text-sm text-muted-foreground mb-4">{brand}</p>

            <div className="space-y-2 w-full">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-primary/20">
                <p className="text-xs text-muted-foreground">TrueMark™ ID</p>
                <code className="text-xs font-mono font-semibold">{truemarkId}</code>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-2 border border-primary/20">
                  <p className="text-xs text-muted-foreground">Token ID</p>
                  <p className="text-xs font-mono font-semibold">{tokenId}</p>
                </div>
                <div className="bg-background/50 backdrop-blur-sm rounded-lg p-2 border border-primary/20">
                  <p className="text-xs text-muted-foreground">Issued</p>
                  <p className="text-xs font-semibold">
                    {new Date(issuedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-1 text-xs text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span className="font-semibold">Verified on VeChain</span>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-2 right-2 opacity-10">
            <Award className="h-24 w-24" />
          </div>
        </div>

        {/* NFT Details */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Standard</span>
            <Badge variant="outline">VIP-181 (VeChain NFT)</Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Blockchain</span>
            <span className="font-semibold">VeChain MainNet</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center space-x-1 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <span className="font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Info footer */}
        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            This NFT certificate is permanently stored on the VeChain blockchain and serves as
            immutable proof of authenticity. It cannot be duplicated or tampered with.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
