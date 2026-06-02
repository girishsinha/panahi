"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

import React, { useState } from "react";

export interface StockBySize {
  size: number;
  quantity: number;
}
export interface ProductInput {
  name: string;
  art: string;
  brand: string;
  category: string;
  color: string;
  costPrice: number;
  mrp: number;
  salePrice: number;
  stockBySize: StockBySize[];
  image: string;
  description: string;
  tags?: string[];
  isAvailable?: boolean;
}
const page = () => {
  const [productData, setProductData] = useState<ProductInput>({
    name: "",
    art: "",
    brand: "",
    category: "",
    color: "",
    costPrice: 0,
    mrp: 0,
    salePrice: 0,
    image: "",
    description: "",
    isAvailable: true,
    stockBySize: [],
    tags: ["hello"],
  });
  const [tagtext, setTagtext] = useState("");
  const handaleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <main className="p-8 sm:w-4/5">
      <form
        onSubmit={handaleAddProduct}
        className="grid grid-cols-3  gap-4 p-4 "
      >
        <Card className="col-span-2 grid grid-cols-2 gap-4 p-4">
          <CardTitle>Basic Information </CardTitle>

          <Input
            type="text"
            id="Name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            placeholder="Product Name"
            className="col-span-2"
          />
          <Input type="text" id="brand" placeholder=" Brand" />
          <Input type="text" id="art" placeholder="Art" />
        </Card>
        <Card className="sm:col-span-1 grid grid-cols-1 gap-4 p-4">
          <CardTitle className="">Pricing Structure </CardTitle>

          <Input type="text" id="costPrice" placeholder="Cost Price" />
          <Input type="text" id="mrp" placeholder="MRP" />
          <Input type="text" id="salePrice" placeholder="Sale Price" />
        </Card>

        <Card className="col-span-2 grid grid-cols-3 gap-4 p-4 self-start h-">
          <CardTitle className="col-span-3">Description and Media </CardTitle>
          <Input type="file" className=" bg-amber-200 h-full aspect-square " />
          <Textarea
            id="description"
            placeholder="Description"
            className="col-span-2"
          />
        </Card>

        <Card className="sm:col-span-1 grid-cols-subgrid gap-4 p-4 self-start">
          <CardTitle className="">Organization and Status</CardTitle>
          <Input type="text" id="category" placeholder="Category" />
          <Input type="text" id="color" placeholder="Color" />
          <div className="flex flex-wrap gap-2">
            {productData.tags?.map((tag, i) => (
              <Badge
                key={`${tag}-${i}`}
                variant="default"
                className="pr-1 h-8 "
              >
                {tag}
                <Button
                  variant="secondary"
                  size="xs"
                  className="rounded-full "
                  onClick={() =>
                    setProductData((prev) => ({
                      ...prev,
                      tags: prev.tags?.filter((t) => t !== tag),
                    }))
                  }
                >
                  <X />
                </Button>
              </Badge>
            ))}
          </div>
          <Input
            type="text"
            value={tagtext}
            onChange={(e) => setTagtext(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!tagtext.trim()) return;
                setProductData((prev) => ({
                  ...prev,
                  tags: [...(prev.tags || []), tagtext.trim()],
                }));
                setTagtext("");
              }
            }}
            id="tags"
            placeholder="Tags (press Enter to add)"
          />
        </Card>
        <Card className="col-span-2 grid grid-cols-2 gap-4 p-4">
          <CardTitle className="col-span-2">Inventory/Variant</CardTitle>
          <Input
            type="text"
            id="stockBySize"
            placeholder='Stock By Size (e.g. [{"size": 38, "quantity": 10}, {"size": 39, "quantity": 5}])'
          />
        </Card>

        <Button type="submit" className="">
          Add Product
        </Button>
      </form>
    </main>
  );
};

export default page;
