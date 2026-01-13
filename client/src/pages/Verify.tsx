import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Scan, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { useVerifyProduct } from "@/hooks/use-products";
import { motion, AnimatePresence } from "framer-motion";
import { TrueMarkScanner } from "@/components/TrueMarkScanner";

export default function Verify() {
  const [productId, setProductId] = useState("");
  const [step, setStep] = useState<"input" | "scan" | "result">("input");
  const verifyProduct = useVerifyProduct();
  const [result, setResult] = useState<any>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) setStep("scan");
  };

  const handleScanComplete = () => {
    verifyProduct.mutate(parseInt(productId), {
      onSuccess: (data) => {
        setResult(data);
        setStep("result");
      },
      onError: () => {
        setResult({ authentic: false });
        setStep("result");
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
          >
            <ShieldCheck className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold">Verify Authenticity</h1>
          <p className="text-muted-foreground mt-2">
            AuthiChain Public Verification Portal
          </p>
        </div>

        <div className="bg-card border border-border shadow-xl rounded-2xl overflow-hidden relative min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Input ID */}
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8 space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product ID or Serial Number</label>
                  <form onSubmit={handleLookup} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="e.g. 12345" 
                        className="pl-9"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={!productId}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or scan code</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={() => {
                    setProductId("1"); // Mock ID for demo
                    setStep("scan");
                  }}
                >
                  <Scan className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </motion.div>
            )}

            {/* Step 2: Physical Scan */}
            {step === "scan" && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8"
              >
                <div className="text-center mb-6">
                  <h3 className="font-bold text-lg">Physical Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Scanning ID #{productId}
                  </p>
                </div>
                <TrueMarkScanner onScanComplete={handleScanComplete} />
                <Button 
                  variant="ghost" 
                  className="w-full mt-4"
                  onClick={() => setStep("input")}
                >
                  Cancel
                </Button>
              </motion.div>
            )}

            {/* Step 3: Result */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                {result?.authentic ? (
                  <div className="space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-12 h-12 text-secondary" />
                    </motion.div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Verified Authentic</h2>
                      <p className="text-muted-foreground mt-2">
                        This product matches the immutable record on AuthiChain.
                      </p>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-xl text-left text-sm space-y-2 border border-border/50">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product</span>
                        <span className="font-medium">{result.product?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Owner</span>
                        <span className="font-mono text-xs">{result.product?.ownerId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verified</span>
                        <span className="text-secondary font-medium">Just now</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center mx-auto">
                      <XCircle className="w-12 h-12 text-destructive" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-destructive">Verification Failed</h2>
                      <p className="text-muted-foreground mt-2">
                        This item could not be verified. It may be counterfeit or not registered.
                      </p>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full mt-8" 
                  onClick={() => {
                    setStep("input");
                    setProductId("");
                  }}
                >
                  Verify Another
                </Button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
