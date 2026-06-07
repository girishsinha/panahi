"use client";
import react, { useEffect, useState } from "react";
import type { Product } from "@/models/product";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GridDisplay({
  category,
  gender,
  type,
}: {
  category?: string;
  gender?: string;
  type?: string;
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/allproduct?category=${category || ""}&gender=${gender || ""}&type=${type || ""}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error fetching products:");
        setLoading(false);
      });
  }, [category, gender, type]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid w-fit gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {products &&
        products.map((product: Product) => (
          <Card
            key={product._id.toString()}
            className="relative mx-auto w-full max-w-sm pt-0 ring-0 gap-2 rounded-none"
          >
            <div className="relative inset-0 z-30 " />
            <img
              src={product.imageUrl}
              alt="Event cover"
              className="z-20 aspect-square h-full  w-full object-cover"
            />
            <Badge className="absolute top-4 right-2 z-30" variant="secondary">
              Featured
            </Badge>

            <CardTitle className="flex  gap-2">
              <span className="font-bold">{product.brand + " "}</span>
              {product.name}
            </CardTitle>

            <CardDescription>{product.description}</CardDescription>
            <CardContent className="gap-1 sm:gap-2 flex items-baseline px-0 w-full font-bold">
              ₹{product.salePrice}
              <span className="line-through text-gray-500 text-xs">
                ₹{product.mrp}
              </span>
              <span className="text-red-500 font-bold w-full sm:text-sm text-xs ">
                {(
                  ((product.mrp - product.salePrice) / product.mrp) *
                  100
                ).toFixed(1)}
                % OFF
              </span>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
