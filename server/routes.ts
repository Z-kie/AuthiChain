import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { openai } from "./replit_integrations/image"; // Re-use client
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // 1. Setup Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // 2. Setup AI Integrations
  registerChatRoutes(app);
  registerImageRoutes(app);

  // 3. App Routes

  // Products List
  app.get(api.products.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const products = await storage.getProducts(userId);
    res.json(products);
  });

  // Product Get (Public if verified? Or owner only? Let's allow public for verification page logic, but maybe restrict data)
  // For now, allow public access for "verification" flow, but maybe specific endpoint for that.
  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  // Create Product
  app.post(api.products.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const input = api.products.create.input.parse(req.body);
      const userId = req.user.claims.sub;
      
      const product = await storage.createProduct({
        ...input,
        ownerId: userId
      });
      
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // AI Classify
  app.post(api.ai.classify.path, isAuthenticated, async (req, res) => {
    try {
      const { imageUrl } = req.body;
      
      // Use GPT-4 Vision (via chat completions)
      const response = await openai.chat.completions.create({
        model: "gpt-5.1", // or gpt-4o
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this product image. Identify the category, brand if visible, and any key attributes. Return JSON with 'category', 'confidence' (0-1), and 'attributes' (key-value pairs)." },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      res.json(result);
    } catch (error) {
      console.error("AI Classification error:", error);
      res.status(500).json({ message: "Failed to classify image" });
    }
  });

  // Register (Blockchain Mock)
  app.post(api.products.register.path, isAuthenticated, async (req, res) => {
    const id = Number(req.params.id);
    const product = await storage.getProduct(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Mock Blockchain Transaction
    const txHash = "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    const trueMarkId = "TM-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    const updated = await storage.updateProduct(id, {
      isRegistered: true,
      blockchainTxHash: txHash,
      trueMarkId: trueMarkId,
      trueMarkData: {
        pattern: "microscopic_grain_v1",
        points: Array(10).fill(0).map(() => ({ x: Math.random(), y: Math.random() }))
      }
    });

    res.json(updated);
  });

  // Verify
  app.post(api.products.verify.path, async (req, res) => {
    const id = Number(req.params.id);
    const product = await storage.getProduct(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const isAuthentic = product.isRegistered; // Simple logic for MVP

    await storage.createScan({
      productId: id,
      isAuthentic,
      location: "Unknown", // Could get from request
      deviceInfo: req.headers['user-agent']
    });

    res.json({
      authentic: isAuthentic,
      product,
      scanId: 0 // Mock
    });
  });

  return httpServer;
}
