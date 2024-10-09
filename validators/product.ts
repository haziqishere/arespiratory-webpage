import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().max(100, "Product name must be 100 characters or fewer"),
  description: z.string().max(1000, "Description must be 1000 characters or fewer"),
  price: z.number().positive("Price must be a positive number"),
  sku: z.string().max(10, "SKU must be 10 characters or fewer"),
  stock: z.array(
    z.object({
      size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]),
      stockQuantity: z.number().int().nonnegative("Stock quantity must be a positive integer"),
    })
  ).min(1, "At least one size must be provided with stock quantity"),
  images: z.array(z.string().url()).min(1, "At least one image URL must be provided"),
});
