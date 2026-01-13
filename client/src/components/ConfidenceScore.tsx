import { motion } from "framer-motion";
import { Brain, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ConfidenceScoreProps {
  score?: number;
  category?: string;
}

export function ConfidenceScore({ score = 97.8, category = "Luxury Goods" }: ConfidenceScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 95) return "from-green-500 to-emerald-500";
    if (score >= 80) return "from-yellow-500 to-amber-500";
    return "from-orange-500 to-red-500";
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-purple-500" />
        <h3 className="font-bold">AI Confidence Score</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Circular Progress */}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Background circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted/20"
              />

              {/* Progress circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#scoreGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={score >= 95 ? "stop-green-500" : score >= 80 ? "stop-yellow-500" : "stop-orange-500"} />
                  <stop offset="100%" className={score >= 95 ? "stop-emerald-500" : score >= 80 ? "stop-amber-500" : "stop-red-500"} />
                </linearGradient>
              </defs>
            </svg>

            {/* Score text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className={`text-5xl font-bold ${getScoreColor(displayScore)}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {displayScore.toFixed(1)}%
              </motion.div>
              <div className="text-xs text-muted-foreground mt-1">CONFIDENCE</div>
            </div>

            {/* Animated glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${getScoreGradient(score)} opacity-20 blur-xl`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Classification</div>
            <div className="font-bold text-lg">{category}</div>
          </div>

          <div className="space-y-3">
            <ScoreMetric
              label="Image Quality"
              value={98.5}
              color="green"
            />
            <ScoreMetric
              label="Pattern Match"
              value={97.2}
              color="green"
            />
            <ScoreMetric
              label="Feature Detection"
              value={96.8}
              color="green"
            />
            <ScoreMetric
              label="Database Match"
              value={98.7}
              color="green"
            />
          </div>

          <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                This score indicates <span className="font-bold text-foreground">extremely high confidence</span> in authenticity verification based on our AI analysis.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreMetric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-mono font-bold ${color === 'green' ? 'text-green-500' : 'text-yellow-500'}`}>
          {value}%
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-yellow-500 to-amber-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
