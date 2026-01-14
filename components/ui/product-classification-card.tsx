"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronRight, Edit2, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CategoryNode {
  name: string
  level: number
}

interface Feature {
  name: string
  value: string
}

interface ProductClassificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: CategoryNode[]
  confidence: number
  features: Feature[]
  onEdit?: () => void
}

const ProductClassificationCard = React.forwardRef<
  HTMLDivElement,
  ProductClassificationCardProps
>(({ className, categories, confidence, features, onEdit, ...props }, ref) => {
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (confidence / 100) * circumference

  return (
    <Card
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white border-none",
        className
      )}
      {...props}
    >
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Product Classification
          </CardTitle>
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        {/* Category Tree Visualization */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Category Path
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                <div
                  className={cn(
                    "px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20",
                    "text-sm font-medium"
                  )}
                  style={{
                    marginLeft: `${category.level * 8}px`,
                  }}
                >
                  {category.name}
                </div>
                {index < categories.length - 1 && (
                  <ChevronRight className="h-4 w-4 mx-1 opacity-60" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Confidence Meter (Circular) */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">
              Confidence Score
            </h3>
            <p className="text-xs opacity-60">
              AI classification accuracy
            </p>
          </div>
          <div className="relative">
            <svg className="transform -rotate-90 w-28 h-28">
              {/* Background circle */}
              <circle
                cx="56"
                cy="56"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-white/20"
              />
              {/* Progress circle */}
              <motion.circle
                cx="56"
                cy="56"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className="text-green-400"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  strokeDasharray: circumference,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">{confidence}%</div>
                <TrendingUp className="h-4 w-4 mx-auto mt-1 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Detected Features List */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Detected Features
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3"
              >
                <div className="text-xs opacity-70 mb-1">{feature.name}</div>
                <div className="font-semibold text-sm">{feature.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl" />
    </Card>
  )
})

ProductClassificationCard.displayName = "ProductClassificationCard"

export { ProductClassificationCard }
export type { ProductClassificationCardProps, CategoryNode, Feature }
