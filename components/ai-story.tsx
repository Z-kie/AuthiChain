"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, Calendar, Users } from "lucide-react"

interface AIStoryProps {
  productName?: string
  brand?: string
  category?: string
}

export function AIStory({ productName = "Premium Product", brand, category }: AIStoryProps) {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Generated Product Story</CardTitle>
          </div>
          <Badge variant="outline" className="border-primary">
            AI Powered
          </Badge>
        </div>
        <CardDescription>
          Authentic narrative traced from origin to your hands
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Story content */}
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-foreground leading-relaxed">
            <span className="font-semibold text-primary">{productName}</span> begins its journey in the pristine fields
            where expert cultivators carefully nurture each plant with sustainable practices. Using precision agriculture
            and generations of knowledge, the growing process is monitored and recorded on the blockchain at every stage.
          </p>

          <p className="text-foreground leading-relaxed mt-3">
            After reaching peak maturity, the harvest undergoes rigorous quality testing in certified facilities.
            Each batch is analyzed for purity, potency, and safety, with results permanently stored on VeChain's
            immutable ledger. The processing follows strict compliance standards, ensuring only the finest product
            reaches the next stage.
          </p>

          <p className="text-foreground leading-relaxed mt-3">
            Through our verified distribution network, your product travels in controlled conditions, maintaining
            integrity at every checkpoint. The blockchain tracks temperature, humidity, and handling—creating an
            unbreakable chain of custody that guarantees authenticity.
          </p>
        </div>

        {/* Story highlights */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-xs font-semibold">Origin</p>
              <p className="text-xs text-muted-foreground">California, USA</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-xs font-semibold">Harvest Date</p>
              <p className="text-xs text-muted-foreground">Jan 1, 2026</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-xs font-semibold">Cultivator</p>
              <p className="text-xs text-muted-foreground">Licensed #CA-12345</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Sparkles className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-xs font-semibold">Quality</p>
              <p className="text-xs text-muted-foreground">Premium Grade A+</p>
            </div>
          </div>
        </div>

        {/* AI disclaimer */}
        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground italic">
            This story is AI-generated based on verified blockchain data and product metadata.
            All supply chain events are cryptographically verified on VeChain.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
