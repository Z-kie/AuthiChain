"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sprout,
  Droplet,
  Sun,
  Package,
  Truck,
  ShoppingCart,
  CheckCircle2,
  ChevronDown,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TimelineCheckpoint {
  id: string
  title: string
  date: string
  description: string
  verified: boolean
  icon?: "seed" | "water" | "grow" | "harvest" | "package" | "ship" | "sell"
  details?: {
    label: string
    value: string
  }[]
}

interface SeedToSaleTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  checkpoints: TimelineCheckpoint[]
}

const iconMap = {
  seed: Sprout,
  water: Droplet,
  grow: Sun,
  harvest: Package,
  package: Package,
  ship: Truck,
  sell: ShoppingCart,
}

const SeedToSaleTimeline = React.forwardRef<
  HTMLDivElement,
  SeedToSaleTimelineProps
>(({ className, checkpoints, ...props }, ref) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {/* Vertical timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400" />

      <div className="space-y-6">
        {checkpoints.map((checkpoint, index) => {
          const Icon = checkpoint.icon ? iconMap[checkpoint.icon] : CheckCircle2
          const isExpanded = expandedId === checkpoint.id
          const isLast = index === checkpoints.length - 1

          return (
            <motion.div
              key={checkpoint.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Checkpoint icon */}
              <motion.div
                className={cn(
                  "absolute left-0 w-16 h-16 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br from-purple-500 to-purple-700",
                  "border-4 border-white shadow-lg z-10"
                )}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon className="h-8 w-8 text-white" />
              </motion.div>

              {/* Blockchain verified badge */}
              {checkpoint.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="absolute left-11 top-11 z-20"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-sm" />
                    <Shield className="relative h-6 w-6 text-green-500 bg-white rounded-full p-1" />
                  </div>
                </motion.div>
              )}

              {/* Checkpoint content */}
              <motion.div
                className={cn(
                  "bg-white rounded-lg shadow-md border border-gray-200",
                  "overflow-hidden cursor-pointer transition-shadow",
                  "hover:shadow-lg"
                )}
                whileHover={{ y: -2 }}
                onClick={() => toggleExpanded(checkpoint.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {checkpoint.title}
                        </h3>
                        {checkpoint.verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {checkpoint.date}
                      </p>
                      <p className="text-gray-700">{checkpoint.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpanded(checkpoint.id)
                      }}
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    </Button>
                  </div>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isExpanded && checkpoint.details && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-3">
                            {checkpoint.details.map((detail, detailIndex) => (
                              <motion.div
                                key={detailIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: detailIndex * 0.05 }}
                                className="bg-gray-50 rounded-md p-3"
                              >
                                <div className="text-xs text-gray-500 mb-1">
                                  {detail.label}
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {detail.value}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Progress indicator */}
                {!isLast && (
                  <motion.div
                    className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
})

SeedToSaleTimeline.displayName = "SeedToSaleTimeline"

export { SeedToSaleTimeline }
export type { SeedToSaleTimelineProps, TimelineCheckpoint }
