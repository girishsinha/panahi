"use client";

const collections = [
  {
    title: "RUNNING",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "STREET",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "SPORT",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "LUXURY",
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1400&auto=format&fit=crop",
  },

  {
    title: "MODERN",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function FeaturedCollections() {
  const infiniteCollections = [...collections, ...collections];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        {/* HEADER */}
        <div>
          <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
            Featured Collections
          </p>

          <h2 className="text-5xl md:text-7xl font-black tracking-[-0.06em] leading-none mt-6">
            <span className="text-black">BUILT FOR</span>

            <br />

            <span className="text-zinc-300">MOVEMENT</span>
          </h2>
        </div>
      </div>

      {/* AUTO MOVING STRIP */}
      <div className="relative">
        <div className="flex gap-8 animate-marquee w-max">
          {infiniteCollections.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[35px] flex-shrink-0 w-[320px]"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500"></div>

              {/* CONTENT */}
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-4xl font-black tracking-[-0.05em]">
                  {item.title}
                </h3>

                <button className="mt-5 bg-white text-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition">
                  EXPLORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
