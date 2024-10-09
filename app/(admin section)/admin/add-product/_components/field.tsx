import React from "react";
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


type Props = {};

const export default const AddProductForm = (props: Props) => {
    return(

    );
}

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
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <Button type="submit">
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
