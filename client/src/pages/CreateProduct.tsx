import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type InsertProduct } from "@shared/schema";
import { useCreateProduct, useClassifyImage } from "@/hooks/use-products";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, Sparkles, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

export default function CreateProduct() {
  const [, setLocation] = useLocation();
  const createProduct = useCreateProduct();
  const classifyImage = useClassifyImage();
  const [imageUrl, setImageUrl] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      category: "",
    },
  });

  // Simulate progress during AI analysis
  useEffect(() => {
    if (classifyImage.isPending) {
      setAnalysisProgress(0);
      const stages = [
        { progress: 0, label: "Initializing AI..." },
        { progress: 25, label: "Processing image..." },
        { progress: 50, label: "Analyzing features..." },
        { progress: 75, label: "Classifying product..." },
        { progress: 95, label: "Finalizing results..." },
      ];

      let currentStage = 0;
      setAnalysisStage(stages[0].label);

      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          const next = prev + 1;

          // Update stage label based on progress
          const nextStageIndex = stages.findIndex(s => s.progress > next);
          if (nextStageIndex > 0 && currentStage !== nextStageIndex - 1) {
            currentStage = nextStageIndex - 1;
            setAnalysisStage(stages[currentStage].label);
          }

          if (next >= 98) {
            return 98; // Stop at 98% until actual API completes
          }
          return next;
        });
      }, 50); // Update every 50ms for smooth animation

      return () => clearInterval(interval);
    } else {
      // When analysis completes, quickly finish the progress
      if (analysisProgress > 0) {
        setAnalysisProgress(100);
        setAnalysisStage("Complete!");
        setTimeout(() => {
          setAnalysisProgress(0);
          setAnalysisStage("");
        }, 1000);
      }
    }
  }, [classifyImage.isPending]);

  const onSubmit = (data: InsertProduct) => {
    createProduct.mutate(data, {
      onSuccess: () => setLocation("/dashboard"),
    });
  };

  const handleImageAnalysis = async () => {
    if (!imageUrl) return;
    
    // Simulate image upload by just using the URL provided
    // In a real app, we'd upload file -> get URL -> analyze
    form.setValue("imageUrl", imageUrl);
    
    try {
      const result = await classifyImage.mutateAsync(imageUrl);
      form.setValue("category", result.category);
      // Could also autofill description based on attributes
    } catch (error) {
      console.error("Analysis failed", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Register New Product</h1>
        <p className="text-muted-foreground mt-2">
          Add an item to the AuthiChain registry. We'll use AI to help classify it.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Enter the basic information about your item.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="space-y-4">
                <FormLabel>Product Image URL</FormLabel>
                <div className="flex gap-4">
                  <Input
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleImageAnalysis}
                    disabled={!imageUrl || classifyImage.isPending}
                  >
                    {classifyImage.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Analyze
                  </Button>
                </div>

                {/* AI Analysis Loading Animation */}
                <AnimatePresence>
                  {classifyImage.isPending && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div
                            animate={{
                              rotate: 360,
                              scale: [1, 1.2, 1]
                            }}
                            transition={{
                              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            <Brain className="w-5 h-5 text-primary" />
                          </motion.div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">AI Image Analysis</p>
                            <motion.p
                              key={analysisStage}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-muted-foreground"
                            >
                              {analysisStage}
                            </motion.p>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {analysisProgress}%
                          </span>
                        </div>

                        <div className="relative">
                          <Progress value={analysisProgress} className="h-2" />
                          <motion.div
                            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            animate={{ x: [-32, 300] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            style={{
                              filter: "blur(4px)",
                              pointerEvents: "none"
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Preview */}
                {imageUrl && (
                  <div className="aspect-video rounded-lg border bg-muted overflow-hidden relative group">
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=80"; // Fallback
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-medium">Image Preview</p>
                    </div>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Luxury Handbag Limited Edition" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (AI Suggested)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Fashion Accessories" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the item..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="ghost" onClick={() => setLocation("/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createProduct.isPending}>
                  {createProduct.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Register Product
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
