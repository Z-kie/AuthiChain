import { useProduct, useRegisterProduct } from "@/hooks/use-products";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ShieldAlert,
  Share2,
  Activity,
  Box,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TrueMarkScanner } from "@/components/TrueMarkScanner";
import { MicroscopicAnalysis } from "@/components/MicroscopicAnalysis";
import { ConfidenceScore } from "@/components/ConfidenceScore";
import { WorkflowTimeline } from "@/components/WorkflowTimeline";
import { AIStoryGenerator } from "@/components/AIStoryGenerator";
import { VeChainBadge } from "@/components/VeChainBadge";
import { NFTCertificate } from "@/components/NFTCertificate";
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function ProductDetails() {
  const [match, params] = useRoute("/products/:id");
  const id = parseInt(params?.id || "0");
  const { data: product, isLoading, error } = useProduct(id);
  const registerProduct = useRegisterProduct();
  const [showScanner, setShowScanner] = useState(false);

  if (isLoading) return <DetailsSkeleton />;
  if (error || !product) return <div>Product not found</div>;

  const handleScanComplete = () => {
    registerProduct.mutate(id);
    setShowScanner(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-display font-bold">{product.name}</h1>
            {product.isRegistered ? (
              <Badge variant="secondary" className="bg-secondary/15 text-secondary border-secondary/20">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Verified Authentic
              </Badge>
            ) : (
              <Badge variant="destructive" className="bg-orange-500/15 text-orange-500 border-orange-500/20">
                <ShieldAlert className="w-3 h-3 mr-1" />
                Unregistered
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="font-mono text-xs">ID: {product.id.toString().padStart(6, '0')}</span>
            <span>•</span>
            <span>Created {format(new Date(product.createdAt), "PPP")}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => window.open(`/verify?id=${product.id}`, '_blank')}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Public View
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Image & TrueMark */}
        <div className="space-y-6">
          <div className="aspect-square rounded-2xl bg-card border border-border shadow-sm overflow-hidden relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"; 
              }}
            />
          </div>

          {!product.isRegistered && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Complete Registration
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                To verify this product on the blockchain, you must complete a TrueMark™ scan of the physical item.
              </p>
              
              {showScanner ? (
                <div className="bg-background rounded-xl p-4">
                  <TrueMarkScanner onScanComplete={handleScanComplete} />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => setShowScanner(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowScanner(true)} className="w-full">
                  Initialize TrueMark™ Scan
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Details & Blockchain */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Box className="w-5 h-5" />
              Product Details
            </h3>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Category</span>
                <span className="col-span-2 font-medium">{product.category || "N/A"}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border/50">
                <span className="text-muted-foreground">Description</span>
                <span className="col-span-2 text-muted-foreground">{product.description}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <span className="text-muted-foreground">Owner</span>
                <span className="col-span-2 font-mono text-xs bg-muted px-2 py-1 rounded">
                  {product.ownerId}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              Blockchain Record
            </h3>

            {product.isRegistered ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <Activity className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-secondary">Secured on AuthiChain</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This product's authenticity is cryptographically guaranteed.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Transaction Hash
                  </label>
                  <div className="font-mono text-xs break-all bg-muted p-3 rounded border border-border/50">
                    {product.blockchainTxHash || "0x7f9a...3b21"}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    TrueMark ID
                  </label>
                  <div className="font-mono text-xs break-all bg-muted p-3 rounded border border-border/50">
                    {product.trueMarkId || "tm_8a92...1c4d"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 px-4 text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                <p>No blockchain record found.</p>
                <p className="text-sm">Complete verification to generate record.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Visualization Components */}
      {product.isRegistered && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* TrueMark Microscopic Analysis */}
          <MicroscopicAnalysis isVerified={product.isRegistered} />

          {/* Confidence Score */}
          <ConfidenceScore
            score={97.8}
            category={product.category || "Luxury Goods"}
          />

          {/* Grid layout for side-by-side components */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Workflow Timeline */}
            <WorkflowTimeline
              productName={product.name}
              currentStage={4}
            />

            {/* AI Story Generator */}
            <AIStoryGenerator
              productName={product.name}
              category={product.category || "Luxury Goods"}
            />
          </div>

          {/* VeChain Badge */}
          <VeChainBadge
            txHash={product.blockchainTxHash || "0x7f9a8e3d2c1b4f5a6e9d8c7b6a5e4f3d2c1b9a8e"}
            verified={product.isRegistered}
          />

          {/* NFT Certificate */}
          <NFTCertificate
            productName={product.name}
            productId={product.id}
            imageUrl={product.imageUrl}
            issueDate={new Date(product.createdAt)}
            tokenId={product.trueMarkId || "0x1a2b3c4d5e6f"}
          />
        </motion.div>
      )}
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
