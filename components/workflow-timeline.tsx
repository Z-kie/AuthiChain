"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, Factory, Truck, Store, CheckCircle } from "lucide-react"

interface TimelineEvent {
  id: string
  stage: string
  location: string
  timestamp: string
  status: "completed" | "current" | "pending"
  icon: React.ReactNode
}

interface WorkflowTimelineProps {
  productName?: string
  events?: TimelineEvent[]
}

export function WorkflowTimeline({ productName, events }: WorkflowTimelineProps) {
  const defaultEvents: TimelineEvent[] = events || [
    {
      id: "1",
      stage: "Cultivation",
      location: "Origin Farm, California",
      timestamp: "2026-01-01",
      status: "completed",
      icon: <Sprout className="h-5 w-5" />,
    },
    {
      id: "2",
      stage: "Processing",
      location: "Processing Facility, Nevada",
      timestamp: "2026-01-05",
      status: "completed",
      icon: <Factory className="h-5 w-5" />,
    },
    {
      id: "3",
      stage: "Distribution",
      location: "Distribution Center, Arizona",
      timestamp: "2026-01-10",
      status: "completed",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      id: "4",
      stage: "Retail",
      location: "Verified Retailer",
      timestamp: "2026-01-14",
      status: "current",
      icon: <Store className="h-5 w-5" />,
    },
  ]

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seed-to-Sale Journey</CardTitle>
            <CardDescription>
              Complete blockchain-verified supply chain tracking
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-primary">
            VeChain Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {defaultEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-4">
              {/* Timeline line */}
              {index < defaultEvents.length - 1 && (
                <div className="absolute left-[18px] top-10 bottom-0 w-0.5 bg-border" />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 ${
                  event.status === "completed"
                    ? "bg-green-500 border-green-500 text-white"
                    : event.status === "current"
                    ? "bg-primary border-primary text-white animate-pulse"
                    : "bg-background border-muted-foreground text-muted-foreground"
                }`}
              >
                {event.status === "completed" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  event.icon
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">{event.stage}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </p>
                    {event.status === "current" && (
                      <Badge className="mt-1 bg-primary text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Transaction hash (mockup) */}
                {event.status === "completed" && (
                  <div className="mt-2">
                    <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      TX: 0x{Math.random().toString(16).substr(2, 8)}...
                    </code>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total journey time: 14 days</span>
            <span className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>{defaultEvents.filter(e => e.status === "completed").length}/{defaultEvents.length} verified</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
