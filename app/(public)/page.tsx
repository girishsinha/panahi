"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/models/product";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/components/layout/home/hero-section";
import BrandStrip from "@/components/layout/home/brand-strip";
import NewArrivals from "@/components/layout/home/new-arrivals";
import FeaturedCollections from "@/components/layout/home/featured-products";
import EditorialShowcase from "@/components/layout/home/editorial-showcase";
import Footer from "@/components/layout/footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/allproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  return (
    <main className="scroll-smooth ">
      {/* <Navbar /> */}
      <HeroSection />
      <BrandStrip />
      {/* <NewArrivals /> */}
      <FeaturedCollections />
      <EditorialShowcase />
      <Footer />
      {/* {products.map((product: Product) => (
          <Card
            key={product._id.toString()}
            className="relative mx-auto w-full max-w-sm pt-0 ring-0 rounded-none"
          >
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
              src={product.imageUrl}
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">Featured</Badge>
              </CardAction>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                {product.description}A practical talk on component APIs,
                accessibility, and shipping faster.
              </CardDescription>
              <p className="flex gap-2 items-baseline font-bold">
                ₹{product.salePrice}
                <span className="line-through text-gray-500 text-xs">
                  ₹{product.mrp.toFixed(2)}
                </span>
                <span className="text-red-500 font-bold">
                  (
                  {(
                    ((product.mrp - product.salePrice) / product.mrp) *
                    100
                  ).toFixed(1)}
                  % OFF)
                </span>
              </p>
            </CardHeader>
          </Card>
        ))} */}
    </main>
  );
}
