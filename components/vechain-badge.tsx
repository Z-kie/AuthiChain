"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, CheckCircle, Link as LinkIcon } from "lucide-react"

interface VeChainBadgeProps {
  transactionHash?: string
  blockNumber?: number
  verified?: boolean
}

export function VeChainBadge({
  transactionHash = "0x" + Math.random().toString(16).substr(2, 64),
  blockNumber = Math.floor(Math.random() * 10000000) + 15000000,
  verified = true
}: VeChainBadgeProps) {
  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              {/* VeChain Logo Placeholder */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                V
              </div>
              <div>
                <h4 className="text-sm font-bold">VeChain Verified</h4>
                <p className="text-xs text-muted-foreground">Blockchain Authentication</p>
              </div>
              {verified && (
                <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
              )}
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono bg-background px-2 py-1 rounded border truncate max-w-[200px]">
                    {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                  </code>
                  <button
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={() => navigator.clipboard.writeText(transactionHash)}
                  >
                    <LinkIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Block Number</p>
                  <p className="text-xs font-mono font-semibold">#{blockNumber.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Network</p>
                  <Badge variant="outline" className="text-xs">VeChain MainNet</Badge>
                </div>
              </div>

              <a
                href={`https://explore.vechain.org/transactions/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-primary hover:underline mt-2"
              >
                <span>View on VeChain Explorer</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
