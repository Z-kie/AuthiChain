import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AIStoryGeneratorProps {
  productName?: string;
  category?: string;
}

export function AIStoryGenerator({
  productName = "Premium Product",
  category = "Luxury Goods"
}: AIStoryGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [story, setStory] = useState(
    "Crafted in the heart of Kyoto by master artisans, this exceptional piece represents centuries of traditional craftsmanship. Each element has been carefully selected and verified through our TrueMark™ technology, ensuring authenticity at every step of its journey from creation to your hands."
  );

  const stories = [
    "Crafted in the heart of Kyoto by master artisans, this exceptional piece represents centuries of traditional craftsmanship. Each element has been carefully selected and verified through our TrueMark™ technology, ensuring authenticity at every step of its journey from creation to your hands.",
    "Born from a vision of perfection, this product embodies the pinnacle of quality and authenticity. Our AI-powered verification system has traced its origins through the supply chain, confirming that every material meets the highest standards of excellence.",
    "This remarkable creation tells a story of dedication and precision. From its humble beginnings in artisan workshops to its blockchain-verified journey across the globe, every moment has been documented and authenticated using cutting-edge technology.",
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      setStory(randomStory);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-pink-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <h3 className="font-bold">AI-Generated Product Story</h3>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-8"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="h-8"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isGenerating ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {/* Typing animation simulation */}
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-4 bg-gradient-to-r from-pink-500/20 to-transparent rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - i * 20}%` }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 animate-pulse text-pink-500" />
              <span>AI is crafting your product story...</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-2 -left-2 text-5xl text-pink-500/20 font-serif leading-none">
                "
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground pl-6 pr-2 py-2 relative">
                {story}
              </p>

              <div className="absolute -bottom-2 -right-2 text-5xl text-pink-500/20 font-serif leading-none rotate-180">
                "
              </div>
            </div>

            {/* Metadata tags */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">
                  AI-Generated
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                  {productName}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                  {category}
                </span>
              </div>
            </div>

            {/* AI insights */}
            <div className="mt-4 p-3 rounded-lg bg-pink-500/5 border border-pink-500/20">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-pink-500 mt-0.5 shrink-0" />
                <div className="text-xs text-muted-foreground">
                  This narrative is generated using advanced AI that analyzes your product's journey,
                  materials, and verification data to create an authentic and engaging story.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
