import { 
  type Product, type InsertProduct, type Scan,
  products, scans 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(ownerId: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct & { ownerId: string }): Promise<Product>;
  updateProduct(id: number, updates: Partial<Product>): Promise<Product>;
  
  // Scans
  createScan(scan: any): Promise<Scan>;
  getScans(productId: number): Promise<Scan[]>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(ownerId: string): Promise<Product[]> {
    return await db.select()
      .from(products)
      .where(eq(products.ownerId, ownerId))
      .orderBy(desc(products.createdAt));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select()
      .from(products)
      .where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct & { ownerId: string }): Promise<Product> {
    const [newProduct] = await db.insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    const [updated] = await db.update(products)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  async createScan(scan: any): Promise<Scan> {
    const [newScan] = await db.insert(scans)
      .values(scan)
      .returning();
    return newScan;
  }

  async getScans(productId: number): Promise<Scan[]> {
    return await db.select()
      .from(scans)
      .where(eq(scans.productId, productId))
      .orderBy(desc(scans.createdAt));
  }
}

export const storage = new DatabaseStorage();
