"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";

export interface StockBySize {
  size: number;
  quantity: number;
}
export interface ProductInput {
  name: string;
  art: string;
  brand: string;
  type: string;
  gender: "male" | "female" | "unisex";
  category: string;
  color: string;
  costPrice: number;
  mrp: number;
  salePrice: number;
  stockBySize: StockBySize[];
  image: File | null;
  description: string;
  tags?: string[];
  isAvailable?: boolean;
}
const page = () => {
  const [productData, setProductData] = useState<ProductInput>({
    name: "",
    art: "",
    brand: "",
    type: "",
    gender: "unisex",
    category: "",
    color: "",
    costPrice: 0,
    mrp: 0,
    salePrice: 0,
    image: null,
    description: "",
    isAvailable: true,
    stockBySize: [
      { size: 6, quantity: 1 },
      { size: 7, quantity: 1 },
      { size: 8, quantity: 1 },
      { size: 9, quantity: 1 },
    ],
    tags: [],
  });
  const [file, setFile] = useState<File | null>(null);
  const [tagtext, setTagtext] = useState("");
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handaleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here

    // Validate required fields
    const requiredFields = {
      name: "Product Name",
      art: "Art/SKU",
      brand: "Brand",
      type: "Type",
      category: "Category",
      color: "Color",
      costPrice: "Cost Price",
      mrp: "MRP",
      salePrice: "Sale Price",
      description: "Description",
      image: "Product Image",
    };

    const missingFields = [];
    for (const [key, label] of Object.entries(requiredFields)) {
      if (key === "costPrice" || key === "mrp" || key === "salePrice") {
        if (
          productData[key as keyof ProductInput] === 0 ||
          productData[key as keyof ProductInput] === ""
        ) {
          missingFields.push(label);
        }
      } else if (key === "image") {
        if (!file) {
          missingFields.push(label);
        }
      } else {
        if (
          !productData[key as keyof ProductInput] ||
          productData[key as keyof ProductInput] === ""
        ) {
          missingFields.push(label);
        }
      }
    }

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following required fields:\n${missingFields.join("\n")}`,
      );
      return;
    }
    // console.log("Product Data:", productData);

    const formData = new FormData();
    formData.append("image", file as Blob);
    formData.append("name", productData.name);
    formData.append("art", productData.art);
    formData.append("brand", productData.brand);
    formData.append("type", productData.type);
    formData.append("gender", productData.gender);
    formData.append("category", productData.category);
    formData.append("color", productData.color);
    formData.append("costPrice", productData.costPrice.toString());
    formData.append("mrp", productData.mrp.toString());
    formData.append("salePrice", productData.salePrice.toString());
    formData.append("description", productData.description);
    formData.append("stockBySize", JSON.stringify(productData.stockBySize));
    formData.append("tags", JSON.stringify(productData.tags));
    // console.log("FormData entries:", formData.getAll("gender"));
    try {
      const response = await fetch("/api/addProduct", {
        headers: {
          // "Content-Type": "multipart/form-data", // Let the browser set this boundary for multipart data
        },
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("failed to add product");
      }
      const result = await response.json();
      alert(result);
      setProductData({
        name: "",
        art: "",
        brand: "",
        type: "",
        gender: "unisex",
        category: "",
        color: "",
        costPrice: 0,
        mrp: 0,
        salePrice: 0,
        image: null,
        description: "",
        isAvailable: true,
        stockBySize: [
          { size: 6, quantity: 1 },
          { size: 7, quantity: 1 },
          { size: 8, quantity: 1 },
          { size: 9, quantity: 1 },
        ],
        tags: [],
      });
      setPreview(null);
    } catch (error) {
      console.log("error while adding product", error);
    }
  };

  const [preview, setPreview] = useState<string | null>(null);
  const [addSize, setAddSize] = useState<number>(0);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <main className="sm:p-8 pb-12 sm:w-4/5 w-full">
      <form
        onSubmit={handaleAddProduct}
        className="grid sm:grid-cols-3 grid-cols-1  gap-4 p-4 "
      >
        <Card className="sm:sm:col-span-2 grid grid-cols-2 gap-4 p-4">
          <CardTitle>Basic Information </CardTitle>

          <Input
            type="text"
            id="Name"
            name="name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            placeholder="Product Name"
            className="col-span-2"
          />
          <Input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            id="brand"
            placeholder=" Brand"
          />
          <Input
            type="text"
            name="art"
            value={productData.art}
            onChange={handleInputChange}
            id="art"
            placeholder="Art"
          />
        </Card>
        <Card className="sm:col-span-1 grid grid-cols-1 gap-4 p-4">
          <CardTitle className="">Pricing Structure </CardTitle>

          <Label htmlFor="costPrice">Cost Price</Label>
          <Input
            type="text"
            name="costPrice"
            value={productData.costPrice}
            onChange={handleInputChange}
            id="costPrice"
            placeholder="Cost Price"
          />
          <Label htmlFor="mrp">MRP</Label>
          <Input
            type="text"
            name="mrp"
            value={productData.mrp}
            onChange={handleInputChange}
            id="mrp"
            placeholder="MRP"
          />
          <Label htmlFor="salePrice">Sale Price</Label>
          <Input
            type="text"
            name="salePrice"
            value={productData.salePrice}
            onChange={handleInputChange}
            id="salePrice"
            placeholder="Sale Price"
          />
        </Card>

        <Card className="sm:col-span-2 grid grid-cols-3 gap-4 p-4 self-start h-">
          <CardTitle className="col-span-full">
            Description and Media{" "}
          </CardTitle>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full aspect-square rounded-md object-cover"
            />
          ) : (
            <Input
              type="file"
              accept=".png,.jpg,.jpeg"
              className=" h-full aspect-square "
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
              }}
            />
          )}

          <Textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            id="description"
            placeholder="Description"
            className="col-span-2"
          />
        </Card>

        <Card className="sm:col-span-1 grid-cols-subgrid gap-4 p-4 self-start">
          <CardTitle className="col-span-full">
            Organization and Status
          </CardTitle>
          <Input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            id="category"
            placeholder="Category"
          />
          <Input
            type="text"
            name="color"
            value={productData.color}
            onChange={handleInputChange}
            id="color"
            placeholder="Color"
          />
          <Select
            name="type"
            value={productData.type}
            onValueChange={(value: string) =>
              setProductData({
                ...productData,
                type: value as any,
              })
            }
            // className="col-span-2"
          >
            <SelectTrigger className="w-full">
              <SelectValue
                // placeholder={productData.type || "Select Type"}
                placeholder={"Select Type"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="shoes">shoes</SelectItem>
                <SelectItem value="sliders">sliders</SelectItem>
                <SelectItem value="chappal">chappal</SelectItem>
                <SelectItem value="sandals">sandals</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            name="gender"
            value={productData.gender}
            onValueChange={(value: string) =>
              setProductData({
                ...productData,
                gender: value as any,
              })
            }
            // className="col-span-2"
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={productData.gender || "Select Gender"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
            name="tags"
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
        <Card className="sm:col-span-2 grid sm:grid-cols-5 grid-cols-3 gap-4 p-4">
          <CardTitle className="col-span-full">Inventory / Variant</CardTitle>
          {/* <Input
            type="text"
            id="stockBySize"
            placeholder='Stock By Size (e.g. [{"size": 38, "quantity": 10}, {"size": 39, "quantity": 5}])'
          /> */}
          {productData.stockBySize.map((stock, index) => (
            <div key={index} className=" flex ">
              <span className=" bg-primary text-primary-foreground h-8 px-2.5 py-1.5 rounded-md">
                {stock.size}
              </span>
              <Input
                type="text"
                value={stock.quantity}
                onChange={(e) => {
                  const newStockBySize = [...productData.stockBySize];
                  newStockBySize[index].quantity =
                    parseInt(e.target.value) || 0;
                  setProductData({
                    ...productData,
                    stockBySize: newStockBySize,
                  });
                }}
              />
            </div>
          ))}
          <div className=" flex  cursor-pointer text-primary">
            <Input
              className=" min-w-9"
              type="text"
              value={addSize}
              onChange={(e) => setAddSize(parseInt(e.target.value) || 0)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();

                if (
                  productData.stockBySize.some(
                    (stock) => stock.size === addSize,
                  )
                ) {
                  alert("Size already exists");
                  return;
                }
                setProductData((prev) => ({
                  ...prev,
                  stockBySize: [
                    ...prev.stockBySize,
                    { size: addSize, quantity: 1 },
                  ],
                }));
                setAddSize(addSize + 1);
              }}
            >
              <Plus />
            </Button>
            <Button
              onClick={() => {
                setProductData((prev) => ({
                  ...prev,
                  stockBySize: [],
                }));
                setAddSize(0);
              }}
            >
              Clear All
            </Button>
          </div>
        </Card>

        <Button type="submit" className="">
          Add Product
        </Button>
      </form>
    </main>
  );
};

export default page;
