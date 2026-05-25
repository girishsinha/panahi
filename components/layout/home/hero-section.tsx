"use client";

import { useEffect, useState } from "react";

const shoes = [
  {
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
    title: "MOVE SILENTLY",
    price: "₹3,999",
  },

  {
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop",
    title: "OWN THE STREET",
    price: "₹1,999",
  },

  {
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop",
    title: "RUN BEYOND",
    price: "₹999",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === shoes.length - 1 ? 0 : prev + 1));
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#f6f6f3] overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div className="relative z-10 pt-28 lg:pt-0">
          {/* <p className="uppercase tracking-[0.4em] text-xs text-zinc-500 mb-8">
            VELTRIX® 2026 COLLECTION
          </p> */}

          <h1 className="text-[4rem] md:text-[6rem] xl:text-[7rem] leading-[0.9] font-black text-black tracking-[-0.08em] transition-all duration-1000 ease-in-out">
            {shoes[current].title}
          </h1>

          {/* MEANING BOX */}
          <div className="mt-10 border-l border-black pl-5">
            <p className="uppercase tracking-[0.35em] text-[11px] text-zinc-500 mb-4">
              Veltrix - Crafted for Motion
            </p>
          </div>

          <div className="flex gap-5 mt-10">
            <button className="bg-black text-white px-8 py-4 rounded-full text-sm tracking-wide hover:scale-105 hover:bg-zinc-800 transition duration-300">
              SHOP COLLECTION
            </button>

            <button className="text-black text-sm tracking-wide hover:opacity-60 transition">
              EXPLORE →
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center items-center h-[650px]">
          {/* BG CIRCLE */}
          <div className="absolute w-[420px] h-[420px] bg-white rounded-full shadow-2xl"></div>

          {/* IMAGE */}
          <img
            key={shoes[current].image}
            src={shoes[current].image}
            alt="Premium Shoe"
            className="relative z-10 w-[88%] md:w-full max-w-xl object-contain rotate-[-10deg] md:rotate-[-12deg] mx-auto transition-all duration-700"
          />

          {/* FLOATING PRICE */}
          <div className="absolute bottom-16 left-0 bg-black text-white px-5 py-4 rounded-2xl shadow-2xl z-20">
            <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">
              Starting From
            </p>

            <h3 className="text-2xl font-black mt-2">{shoes[current].price}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
