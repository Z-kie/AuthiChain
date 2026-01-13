import { motion } from "framer-motion";
import { ExternalLink, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VeChainBadgeProps {
  txHash?: string;
  verified?: boolean;
}

export function VeChainBadge({
  txHash = "0x7f9a8e3d2c1b4f5a6e9d8c7b6a5e4f3d2c1b9a8e",
  verified = true
}: VeChainBadgeProps) {
  const openVeChainExplorer = () => {
    window.open(`https://explore.vechain.org/transactions/${txHash}`, '_blank');
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/5 to-cyan-500/5 border border-blue-500/20 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute">
          <defs>
            <pattern id="vechain-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" className="text-blue-500" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#vechain-pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header with VeChain branding */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* VeChain Logo simulation */}
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Shield className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold flex items-center gap-2">
                VeChain Verified
                {verified && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </h3>
              <p className="text-xs text-muted-foreground">Blockchain Authentication</p>
            </div>
          </div>

          {verified && (
            <motion.div
              className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              VERIFIED
            </motion.div>
          )}
        </div>

        {/* Transaction details */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              VeChainThor Transaction
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 font-mono text-xs bg-muted/50 p-3 rounded border border-border/50 break-all">
                {txHash}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={openVeChainExplorer}
                className="shrink-0"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Network info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-card border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Network</div>
              <div className="font-bold text-sm">VeChainThor</div>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/50">
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 0 6px rgba(34, 197, 94, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Confirmed
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-2">
            <Feature
              icon="⚡"
              text="Low-cost enterprise blockchain"
            />
            <Feature
              icon="🔒"
              text="Immutable proof of authenticity"
            />
            <Feature
              icon="🌍"
              text="Globally accessible verification"
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              This product's authenticity is permanently recorded on the VeChainThor blockchain,
              providing transparent and tamper-proof verification for the entire supply chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }: { icon: string; text: string }) {
  return (
    <motion.div
      className="flex items-center gap-2 text-sm"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-muted-foreground">{text}</span>
    </motion.div>
  );
}
