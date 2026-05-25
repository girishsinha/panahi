"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { useEffect, useState } from "react";

// import { useCart } from "../../../context/cart-context";

type Product = {
  _id: string;
  art: string;
  category: string;
  salePrice: number;
  imageUrl: string;
  description: string;
};

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  // const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/allproduct");

      const data = await res.json();

      setProducts(data.products);
      console.log(data);
    };

    fetchProducts();
  }, []);

  return (
    <section id="new-arrivals" className="bg-zinc-50 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-20">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
              Latest Drop
            </p>

            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.06em] mt-6 text-black">
              NEW
              <br />
              ARRIVALS
            </h2>
          </div>

          <button className="hidden md:block bg-black text-white border border-black px-8 py-4 rounded-full hover:bg-white hover:text-black transition duration-500 font-semibold shadow-lg">
            VIEW ALL
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="group"
              >
                {/* IMAGE CARD */}
                <div className="relative overflow-hidden rounded-[30px] bg-white shadow-sm hover:shadow-2xl transition duration-500">
                  {/* LABEL */}
                  <div className="absolute top-4 left-4 z-20 bg-black text-white px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase">
                    New
                  </div>

                  {/* IMAGE */}
                  <img
                    src={product.imageUrl}
                    alt={product.art}
                    className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500" />

                  {/* QUICK ADD */}
                  {/* <button
                    onClick={(e) => {
                      e.preventDefault();

                      addToCart({
                        id: index,
                        title: product.title,
                        price: `₹${product.price}`,
                        image: product.image,
                      });
                    }}
                    className="
absolute 
bottom-6 
left-1/2 
-translate-x-1/2 
bg-white 
text-black 
px-6 
py-3 
rounded-full 
transition 
duration-500 
font-semibold 
hover:bg-zinc-200

opacity-100
translate-y-0

md:translate-y-20
md:opacity-0
md:group-hover:opacity-100
md:group-hover:translate-y-0
"
                  >
                    QUICK ADD
                  </button> */}
                </div>

                {/* CONTENT */}
                <div className="bg-white rounded-[24px] mt-4 px-5 py-5 shadow-sm border border-zinc-100 transition duration-500 group-hover:shadow-xl">
                  <p className="uppercase tracking-[0.3em] text-[10px] text-zinc-400">
                    {product.category}
                  </p>

                  <h3 className="text-2xl font-black text-black tracking-[-0.05em] mt-2">
                    {product.art.toLocaleUpperCase()}
                  </h3>

                  <p className="text-black font-semibold mt-3 text-lg">
                    ₹{product.salePrice}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
