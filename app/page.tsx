"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/models/product";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/allproduct")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        {products.map((product: Product) => (
          <div key={product._id}>
            <img src={product.imageUrl} alt="" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.mrp.toFixed(2)}</p>
            <p>
              Discount:
              {Math.floor(
                ((product.mrp - product.salePrice) / product.mrp) * 100,
              )}
              %
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}
