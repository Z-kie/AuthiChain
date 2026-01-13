import { motion } from "framer-motion";
import { Microscope, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface MicroscopicAnalysisProps {
  isVerified?: boolean;
}

export function MicroscopicAnalysis({ isVerified = false }: MicroscopicAnalysisProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { name: "Fiber Pattern", confidence: 98.2, status: "verified" },
    { name: "Surface Texture", confidence: 96.5, status: "verified" },
    { name: "Material Density", confidence: 99.1, status: "verified" },
    { name: "Color Spectrum", confidence: 97.8, status: "verified" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Microscope className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold">TrueMark™ Microscopic Analysis</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Microscopic View Simulation */}
        <div className="relative aspect-square rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden border border-blue-500/30">
          {/* Scanning grid overlay */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" className="absolute">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="cyan" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Animated scanning circles */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-blue-400/40"
                style={{
                  width: `${30 + i * 20}%`,
                  height: `${30 + i * 20}%`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Center focus point */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                  "0 0 30px rgba(34, 211, 238, 0.8)",
                  "0 0 10px rgba(34, 211, 238, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner markers */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
            <div
              key={pos}
              className={`absolute w-6 h-6 border-cyan-400 ${
                pos === "top-left" ? "top-2 left-2 border-t-2 border-l-2" :
                pos === "top-right" ? "top-2 right-2 border-t-2 border-r-2" :
                pos === "bottom-left" ? "bottom-2 left-2 border-b-2 border-l-2" :
                "bottom-2 right-2 border-b-2 border-r-2"
              }`}
            />
          ))}

          {/* Zoom indicator */}
          <div className="absolute bottom-4 left-4 text-cyan-400 font-mono text-xs">
            10000x MAGNIFICATION
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground mb-4">
            Advanced optical analysis of microscopic signatures
          </div>

          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className={`p-3 rounded-lg border transition-all ${
                activeFeature === index
                  ? "bg-blue-500/10 border-blue-500/50"
                  : "bg-card border-border/50"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm">{feature.name}</span>
                </div>
                <span className="text-xs font-mono text-green-500">
                  {feature.confidence}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.confidence}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}

          {/* Overall status */}
          <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-bold text-green-500">Analysis Complete</p>
                <p className="text-xs text-muted-foreground">
                  All microscopic signatures verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
