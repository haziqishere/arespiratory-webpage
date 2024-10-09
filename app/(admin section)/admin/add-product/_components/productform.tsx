"use client";
import React from "react";
import { createProductSchema } from "@/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button"; // Custom button component
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import ImagePicker from "./image-picker";

type Input = z.infer<typeof createProductSchema>;

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<Input>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      sku: "",
      stock: [
        { size: "XS", stockQuantity: 0 },
        { size: "S", stockQuantity: 0 },
        { size: "M", stockQuantity: 0 },
        { size: "L", stockQuantity: 0 },
        { size: "XL", stockQuantity: 0 },
        { size: "XXL", stockQuantity: 0 },
      ],
      images: [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "stock",
  });

  // onSubmit function
  const onSubmit = async (data: Input) => {
    setLoading(true);
    try {
      console.log("Submitting data: ", data);
      const response = await fetch("/api/product/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      console.log("Product added successfully:", result);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      //TODO: Add breadcrumb
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start w-full ">
                        <FormLabel className="block text-sm font-semibold text-gray-700 ">
                          Product Name
                        </FormLabel>
                        <FormControl className=" text-l">
                          <Input placeholder="Basic T-Shirt" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start w-full ">
                        <FormLabel className=" block text-sm font-semibold text-gray-700">
                          Description
                        </FormLabel>
                        <FormControl className=" text-l">
                          <Textarea
                            placeholder="Trendy design suits your casual style"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start w-full ">
                          <FormLabel className=" block text-sm font-semibold text-gray-700">
                            Price
                          </FormLabel>
                          <FormControl className="flex-[1] text-l">
                            <Input
                              placeholder="50.00"
                              type="number"
                              step=".01"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start w-full ">
                          <FormLabel className=" block text-sm font-semibold text-gray-700">
                            SKU
                          </FormLabel>
                          <FormControl className="flex-[1] text-l">
                            <Input placeholder="ABC-123" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="mt-4">
                      <h2 className="text-medium font-semibold text-gray-700">
                        Stock Quantity
                      </h2>
                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <div className="ml-10 w-1/2" key={field.id}>
                            <FormField
                              control={form.control}
                              name={`stock.${index}.stockQuantity`}
                              render={({ field }) => (
                                <FormItem className="flex flex-col sm:flex-row items-start sm:items-center w-full">
                                  <FormLabel className="flex-[1] text-l">
                                    {fields[index].size}
                                  </FormLabel>
                                  <FormControl className="flex-[1]">
                                    <Input
                                      type="number"
                                      placeholder={`Stock for size ${fields[index].size}`}
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(
                                          parseFloat(e.target.value)
                                        )
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-6">
                    <ImagePicker
                      label="Product Images"
                      name="images"
                      onImagesChange={setImages}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <Button type="submit" disabled={loading}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Product
                </Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;
