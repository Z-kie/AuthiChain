"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, ChevronRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CategoryNode {
  name: string;
  level: number;
  children?: CategoryNode[];
}

export interface DetectedFeature {
  id: string;
  name: string;
  confidence: number;
  verified?: boolean;
}

export interface ProductClassificationCardProps {
  category: CategoryNode;
  confidence: number;
  detectedFeatures: DetectedFeature[];
  onEdit?: () => void;
  className?: string;
}

export function ProductClassificationCard({
  category,
  confidence,
  detectedFeatures,
  onEdit,
  className = "",
}: ProductClassificationCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate circular confidence meter
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;

  // Get confidence color
  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return "text-green-500";
    if (conf >= 70) return "text-yellow-500";
    return "text-orange-500";
  };

  // Render category tree recursively
  const renderCategoryTree = (node: CategoryNode, depth = 0) => {
    return (
      <motion.div
        key={node.name}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: depth * 0.1 }}
        className={`flex items-center gap-2 ${depth > 0 ? "ml-6 mt-2" : ""}`}
      >
        {depth > 0 && <ChevronRight className="h-4 w-4 text-purple-400" />}
        <div className="flex items-center gap-2">
          <span
            className={`${
              depth === 0
                ? "text-lg font-semibold text-white"
                : depth === 1
                ? "text-base font-medium text-purple-200"
                : "text-sm text-purple-300"
            }`}
          >
            {node.name}
          </span>
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-200 border-purple-400/30"
          >
            Level {node.level}
          </Badge>
        </div>
      </motion.div>
    );
  };

  const flattenCategory = (node: CategoryNode): CategoryNode[] => {
    const result = [node];
    if (node.children) {
      node.children.forEach((child) => {
        result.push(...flattenCategory(child));
      });
    }
    return result;
  };

  const categoryPath = flattenCategory(category);

  return (
    <Card
      className={`relative overflow-hidden border-purple-500/20 ${className}`}
    >
      {/* Purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 opacity-95" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative p-6">
        {/* Header with Edit Button */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Product Classification
            </h3>
            <p className="text-sm text-purple-200">AI-powered categorization</p>
          </div>
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-[1fr,auto] gap-6">
          {/* Category Tree Visualization */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-200 mb-3">
              Category Hierarchy
            </h4>
            <div className="space-y-1">
              {categoryPath.map((node, index) => (
                <div key={`${node.name}-${index}`}>
                  {renderCategoryTree(node, index)}
                </div>
              ))}
            </div>
          </div>

          {/* Circular Confidence Meter */}
          <div className="flex flex-col items-center justify-start">
            <div className="relative">
              <svg className="transform -rotate-90" width="120" height="120">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={getConfidenceColor(confidence)}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    strokeDasharray: circumference,
                  }}
                />
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className={`text-3xl font-bold ${getConfidenceColor(
                    confidence
                  )}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {confidence}%
                </motion.span>
                <span className="text-xs text-purple-200 mt-1">confidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detected Features List */}
        <div className="mt-6 pt-6 border-t border-purple-400/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-purple-200">
              Detected Features
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-purple-200 hover:text-white hover:bg-white/10 h-auto py-1 px-2"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="grid gap-2"
            >
              {detectedFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {feature.verified && (
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    )}
                    <span className="text-sm text-white font-medium">
                      {feature.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getConfidenceColor(
                          feature.confidence
                        ).replace("text-", "bg-")}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.confidence}%` }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${getConfidenceColor(
                        feature.confidence
                      )} min-w-[3rem] text-right`}
                    >
                      {feature.confidence}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}
