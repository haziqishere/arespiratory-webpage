"use client";
import React from "react";

import { Button } from "@/components/ui/button";
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

import { useForm, useFieldArray } from "react-hook-form";

import { createProductSchema } from "@/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Props = {};

type Input = z.infer<typeof createProductSchema>;

const AddItemForm = (props: Props) => {
  // Define the input type
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

      //TODO: Upload Image
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "stock",
  });

  function onSubmit(data: Input) {
    console.log("form data:", data);
    return;
  }
  form.watch();
  console.log("form watch:", form.watch());

  return (
    <div className="w-2/6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl">
                    Product Name
                  </FormLabel>
                  <FormControl className="flex-[1] text-l">
                    <Input placeholder="Basic T-Shirt" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl text-l">
                    Product Description
                  </FormLabel>
                  <FormControl className="flex-[1] text-l">
                    <Textarea
                      placeholder="Trendy design suits your casual style"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl text-l">
                    Price (RM)
                  </FormLabel>
                  <FormControl className="flex-[1] text-l">
                    <Input
                      placeholder="50.00"
                      type="number"
                      step=".01"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          {/* Stock Quantity Fields for Each Size */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Stock Quantity</h3>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div className="ml-60 w-1/2">
                  <FormField
                    key={field.id}
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
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg">
            Add Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddItemForm;
