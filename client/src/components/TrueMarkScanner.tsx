import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scan, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrueMarkScannerProps {
  onScanComplete: () => void;
  isSimulated?: boolean;
}

export function TrueMarkScanner({ onScanComplete, isSimulated = true }: TrueMarkScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanning(false);
            onScanComplete();
            return 100;
          }
          return prev + 2; // 50 steps * 20ms = ~1s scan time
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [scanning, onScanComplete]);

  const handleStartScan = () => {
    setScanning(true);
    setProgress(0);
  };

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto bg-black/5 dark:bg-white/5 rounded-3xl overflow-hidden border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-8">
      {/* Scanning Grid Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(120,0,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(120,0,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {scanning && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0 z-10"
          initial={{ top: "-100%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative z-20 text-center space-y-4">
        <div className="relative">
          <Scan className={`w-16 h-16 ${scanning ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
          {progress === 100 && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="absolute -right-2 -bottom-2 bg-background rounded-full"
            >
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </motion.div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-display font-bold text-xl">
            {scanning ? "Scanning TrueMark™..." : "TrueMark™ Scanner"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {scanning ? `${progress}% Complete` : "Align microscopic pattern within frame"}
          </p>
        </div>

        {!scanning && progress !== 100 && (
          <Button onClick={handleStartScan} className="w-full">
            {isSimulated ? "Simulate Scan" : "Start Camera"}
          </Button>
        )}
      </div>

      {/* Corner Markers */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
    </div>
  );
}
