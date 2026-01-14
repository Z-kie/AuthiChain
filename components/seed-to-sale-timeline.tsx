"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Droplet,
  Sun,
  Scissors,
  Package,
  Truck,
  Store,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  MapPin,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TimelineCheckpoint {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  operator?: string;
  blockchainVerified: boolean;
  blockchainHash?: string;
  status: "completed" | "in-progress" | "pending";
  icon?: "seed" | "water" | "growth" | "harvest" | "package" | "transport" | "retail";
  details?: {
    label: string;
    value: string;
  }[];
}

export interface SeedToSaleTimelineProps {
  checkpoints: TimelineCheckpoint[];
  productName?: string;
  className?: string;
}

const iconMap = {
  seed: Sprout,
  water: Droplet,
  growth: Sun,
  harvest: Scissors,
  package: Package,
  transport: Truck,
  retail: Store,
};

export function SeedToSaleTimeline({
  checkpoints,
  productName = "Product",
  className = "",
}: SeedToSaleTimelineProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const getStatusColor = (status: TimelineCheckpoint["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-400";
    }
  };

  const getStatusBorderColor = (status: TimelineCheckpoint["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-500";
      case "in-progress":
        return "border-blue-500";
      case "pending":
        return "border-gray-400";
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Seed-to-Sale Journey</h3>
        <p className="text-muted-foreground">
          Complete traceability for {productName}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {/* Checkpoints */}
        <div className="space-y-8">
          {checkpoints.map((checkpoint, index) => {
            const Icon = checkpoint.icon
              ? iconMap[checkpoint.icon]
              : Package;
            const isExpanded = expandedIds.has(checkpoint.id);
            const isLast = index === checkpoints.length - 1;

            return (
              <motion.div
                key={checkpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Checkpoint Icon */}
                <div
                  className={`absolute left-0 w-12 h-12 rounded-full border-4 ${getStatusBorderColor(
                    checkpoint.status
                  )} bg-background flex items-center justify-center z-10`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      checkpoint.status === "completed"
                        ? "text-green-500"
                        : checkpoint.status === "in-progress"
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>

                {/* Checkpoint Content */}
                <div className="ml-20">
                  <div
                    className={`border rounded-lg overflow-hidden transition-all ${
                      checkpoint.status === "completed"
                        ? "border-green-200 dark:border-green-900"
                        : checkpoint.status === "in-progress"
                        ? "border-blue-200 dark:border-blue-900"
                        : "border-border"
                    }`}
                  >
                    {/* Main Content */}
                    <div className="p-4 bg-card">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-lg">
                              {checkpoint.title}
                            </h4>
                            {checkpoint.blockchainVerified && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  Blockchain Verified
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {checkpoint.description}
                          </p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{checkpoint.timestamp}</span>
                        </div>
                        {checkpoint.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span>{checkpoint.location}</span>
                          </div>
                        )}
                        {checkpoint.operator && (
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span>{checkpoint.operator}</span>
                          </div>
                        )}
                      </div>

                      {/* Expand/Collapse Button */}
                      {(checkpoint.details || checkpoint.blockchainHash) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(checkpoint.id)}
                          className="mt-3 w-full justify-center"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              Hide Details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              Show Details
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-2 bg-muted/30 border-t">
                            {checkpoint.details && (
                              <div className="space-y-2 mb-3">
                                <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                                  Additional Details
                                </h5>
                                {checkpoint.details.map((detail, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex justify-between text-sm"
                                  >
                                    <span className="text-muted-foreground">
                                      {detail.label}:
                                    </span>
                                    <span className="font-medium">
                                      {detail.value}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {checkpoint.blockchainHash && (
                              <div>
                                <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                                  Blockchain Hash
                                </h5>
                                <code className="text-xs bg-background px-2 py-1 rounded border font-mono break-all block">
                                  {checkpoint.blockchainHash}
                                </code>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Animated Progress Line */}
                {!isLast && checkpoint.status === "completed" && (
                  <motion.div
                    className="absolute left-6 top-12 w-0.5 h-8 bg-green-500 -translate-x-1/2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summary Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: checkpoints.length * 0.1 }}
        className="mt-8 pt-6 border-t flex items-center justify-between"
      >
        <div className="text-sm text-muted-foreground">
          {checkpoints.filter((c) => c.status === "completed").length} of{" "}
          {checkpoints.length} checkpoints completed
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}
