import { motion } from "framer-motion";
import { Award, Download, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface NFTCertificateProps {
  productName?: string;
  productId?: number;
  imageUrl?: string;
  issueDate?: Date;
  tokenId?: string;
}

export function NFTCertificate({
  productName = "Premium Product",
  productId = 1,
  imageUrl = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
  issueDate = new Date(),
  tokenId = "0x1a2b3c4d5e6f"
}: NFTCertificateProps) {
  const handleDownload = () => {
    console.log("Downloading NFT certificate...");
  };

  const handleViewNFT = () => {
    window.open(`https://opensea.io/assets/vechain/${tokenId}`, '_blank');
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-violet-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-500" />
          <h3 className="font-bold">NFT Certificate of Authenticity</h3>
        </div>
        <Sparkles className="w-5 h-5 text-violet-500 animate-pulse" />
      </div>

      {/* Certificate Card */}
      <motion.div
        className="relative rounded-xl overflow-hidden border-2 border-violet-500/30 shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="nft-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="white" />
                <circle cx="0" cy="0" r="2" fill="white" />
                <circle cx="50" cy="50" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nft-pattern)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative p-8 text-white">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-sm font-semibold opacity-90 mb-1">CERTIFICATE OF AUTHENTICITY</div>
              <div className="text-xs opacity-70">AuthiChain NFT Collection</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Product Image */}
          <div className="mb-6 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
            <img
              src={imageUrl}
              alt={productName}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-3 mb-6">
            <div>
              <div className="text-xs opacity-70 mb-1">Product Name</div>
              <div className="text-xl font-bold">{productName}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs opacity-70 mb-1">Certificate ID</div>
                <div className="font-mono font-bold">#{productId.toString().padStart(6, '0')}</div>
              </div>
              <div>
                <div className="text-xs opacity-70 mb-1">Issue Date</div>
                <div className="font-semibold">{format(issueDate, "MMM d, yyyy")}</div>
              </div>
            </div>
          </div>

          {/* Token ID */}
          <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="text-xs opacity-70 mb-1">NFT Token ID</div>
            <div className="font-mono text-xs break-all">{tokenId}</div>
          </div>

          {/* Verification Seal */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">VERIFIED AUTHENTIC</div>
                  <div className="text-xs opacity-70">VeChainThor Network</div>
                </div>
              </div>
              <motion.div
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => (
          <div
            key={corner}
            className={`absolute w-16 h-16 border-white/30 ${
              corner === "top-left" ? "top-0 left-0 border-t-2 border-l-2" :
              corner === "top-right" ? "top-0 right-0 border-t-2 border-r-2" :
              corner === "bottom-left" ? "bottom-0 left-0 border-b-2 border-l-2" :
              "bottom-0 right-0 border-b-2 border-r-2"
            }`}
          />
        ))}
      </motion.div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Certificate
        </Button>
        <Button
          size="sm"
          onClick={handleViewNFT}
          className="flex-1"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on OpenSea
        </Button>
      </div>

      {/* Info footer */}
      <div className="mt-4 p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">
            This NFT certificate is a unique digital token stored on the VeChainThor blockchain,
            providing permanent proof of authenticity and ownership. It can be transferred,
            traded, or kept as a collectible.
          </p>
        </div>
      </div>
    </div>
  );
}
