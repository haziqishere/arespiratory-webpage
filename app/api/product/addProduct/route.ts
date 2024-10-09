import { NextResponse } from "next/server";
import { createProductSchema } from "@/validators/product";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {

    try {
        // Parse the request body
        const body = await req.json();
        console.log("Received body:", body);
    
        const validatedData = createProductSchema.parse(body);

        // Create the new product and product sizes in a transaction
        const product = await prisma.$transaction(async (prismaClient) => {
            const newProduct = await prismaClient.product.create({
                data: {
                    name: validatedData.name,
                    description: validatedData.description,
                    price: validatedData.price,
                    imagePath: "C:/test", // TODO: Replace with actual image path
                    sku: validatedData.sku,
                },
            });

            for (const sizeData of validatedData.stock) {
                const productSize = await prismaClient.productSize.create({
                    data: {
                        productId: newProduct.productId,
                        size: sizeData.size,
                        stockQuantity: sizeData.stockQuantity,
                    },
                });
            }

            return newProduct;
        });


        return NextResponse.json({
            message: "Product created successfully",
            product: product,
        }, { status: 201 });
    } catch (error) {
        console.error("Error in API route:", error);
        if (error instanceof ZodError) {
            return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}