"use client";
import React from "react";
import { createProductSchema } from "@/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button"; // Custom button component
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Input = z.infer<typeof createProductSchema>;

const AddProductForm = () => {
  const form = useForm<Input>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: [
        { size: "XS", stockQuantity: 0 },
        { size: "S", stockQuantity: 0 },
        { size: "M", stockQuantity: 0 },
        { size: "L", stockQuantity: 0 },
        { size: "XL", stockQuantity: 0 },
        { size: "XXL", stockQuantity: 0 },
      ],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "stock",
  });

  // onSubmit function
  const onSubmit = async (data: Input) => {
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
    <div className="w-2/6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl">Product Name</FormLabel>
                <FormControl className="flex-[1] text-l">
                  <Input placeholder="Basic T-Shirt" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Product Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl">
                  Product Description
                </FormLabel>
                <FormControl className="flex-[1] text-l">
                  <Textarea
                    placeholder="Trendy design suits your casual style"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Product Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl">Price (RM)</FormLabel>
                <FormControl className="flex-[1] text-l">
                  <Input
                    placeholder="50.00"
                    type="number"
                    step=".01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Stock Quantity Fields for Each Size */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Stock Quantity</h3>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div className="ml-60 w-1/2" key={field.id}>
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
                              field.onChange(parseFloat(e.target.value))
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

          {/* Use a native button for testing */}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
