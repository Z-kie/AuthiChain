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
import { Loader2, Upload, Sparkles } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { analytics } from "@/lib/analytics";

export default function CreateProduct() {
  const [, setLocation] = useLocation();
  const createProduct = useCreateProduct();
  const classifyImage = useClassifyImage();
  const [imageUrl, setImageUrl] = useState("");
  
  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      category: "",
    },
  });

  const onSubmit = (data: InsertProduct) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        // Track product upload
        analytics.trackProductUpload(data.category || "Uncategorized", data.name);
        analytics.trackIndustryUsage(data.category || "Uncategorized");

        // Log summary stats
        analytics.logSummary();

        setLocation("/dashboard");
      },
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

      // Track AI classification with confidence score
      analytics.trackClassification(
        result.category,
        result.confidence,
        imageUrl
      );

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
