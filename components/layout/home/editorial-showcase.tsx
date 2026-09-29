// "use client";

// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";

// const features = [
//   {
//     number: "01",
//     title: "DESIGNED\nFOR STYLE",
//     desc: "Clean silhouettes with refined details made to elevate your everyday look.",
//     image: "/images/style.png",
//   },
//   {
//     number: "02",
//     title: "ENGINEERED\nFOR PERFORMANCE",
//     desc: "Responsive cushioning and advanced support for powerful everyday movement.",
//     image: "/images/performance.png",
//   },
//   {
//     number: "03",
//     title: "MADE\nFOR COMFORT",
//     desc: "Soft interiors and breathable materials that keep you comfortable all day.",
//     image: "/images/comfort.png",
//   },
// ];

// export default function EditorialShowcase() {
//   const [open, setOpen] = useState(false);
//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 80 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//       viewport={{ once: true }}
//       className="bg-black text-white overflow-hidden"
//     >
//       {/* HERO */}
//       <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
//         {/* LEFT */}
//         <div>
//           <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
//             VELTRIX® PERFORMANCE
//           </p>

//           <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-[-0.06em] mt-8">
//             DESIGNED
//             <br />
//             TO FLOW
//           </h2>

//           <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mt-10">
//             Every silhouette is engineered with precision, balancing modern
//             streetwear aesthetics with high-performance movement and timeless
//             design.
//           </p>

//           <button
//             onClick={() => setOpen(true)}
//             className="mt-12 border border-white px-10 py-5 rounded-full hover:bg-[#f5f5f2] hover:text-black transition duration-500"
//           >
//             DISCOVER MORE
//           </button>
//         </div>

//         {/* RIGHT */}
//         <div className="relative">
//           <div
//             className="
//     overflow-hidden
//     rounded-[32px]
//     border border-white/5
//     shadow-[0_20px_60px_rgba(0,0,0,0.35)]
//     transition-all duration-700
//   "
//           >
//             <img
//               src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1400&auto=format&fit=crop"
//               alt="shoe"
//               className="w-full
//   h-[240px]

//   object-cover
//   rounded-[28px]
//   transition-all
//   duration-700
//   group-hover:scale-[1.03]
//   brightness-105
//   contrast-110"
//             />
//           </div>

//           {/* FLOAT CARD */}
//           <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-black p-6 md:p-8 rounded-[30px] shadow-2xl w-[90%] md:w-auto">
//             <p className="uppercase text-xs tracking-[0.3em] text-zinc-500">
//               New Drop
//             </p>

//             <h3 className="text-2xl md:text-4xl font-black mt-3">
//               VELTRIX REACT
//             </h3>

//             <p className="text-zinc-600 mt-3">Built for everyday movement.</p>
//           </div>
//         </div>
//       </div>

//       {/* WHY SECTION */}
//       <div className="border-t border-white/10 bg-[#111111]">
//         <div className="max-w-7xl mx-auto px-6 py-24">
//           {/* TITLE */}
//           <div className="text-center mb-20">
//             <p className="text-zinc-500 tracking-[0.4em] uppercase text-xs">
//               Why Veltrix?
//             </p>

//             <h2
//               className="text-5xl md:text-7xl mt-6 font-black tracking-[-0.06em]"
//               style={{ fontFamily: "cursive" }}
//             >
//               BUILT FOR YOU
//             </h2>

//             <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
//               Every element inside our shoes is designed with purpose, for the
//               way you move.
//             </p>
//           </div>

//           {/* FEATURES */}
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((item, index) => {
//               const ref = useRef(null);

//               const isInView = useInView(ref, {
//                 amount: 0.6,
//                 once: false,
//               });

//               return (
//                 <motion.div
//                   ref={ref}
//                   key={index}
//                   className={`group border rounded-[35px] overflow-hidden transition-all duration-700
//       ${
//         isInView
//           ? "bg-[#212121] text-black border-[#212121] scale-[1.02]"
//           : "bg-[#0a0a0a] text-white border-white/10"
//       }`}
//                 >
//                   {/* IMAGE */}
//                   <div className="p-8 overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className={`w-full h-[240px] p-6 object-cover rounded-[25px] transition-all duration-700 contrast-110 brightness-105 saturate-110 ${
//                         isInView ? "scale-105" : "scale-100"
//                       }`}
//                     />
//                   </div>

//                   {/* CONTENT */}
//                   <div className="px-8 pb-10 transition duration-500">
//                     <p
//                       className={`font-bold text-sm tracking-[0.3em] mb-5 transition-all duration-500 ${
//                         isInView ? "text-[#f5f5f2]" : "text-yellow-400"
//                       }`}
//                     >
//                       {item.number}
//                     </p>

//                     <h3
//                       className={`text-3xl font-black leading-none whitespace-pre-line transition-all duration-500 ${
//                         isInView ? "text-[#f5f5f2]" : "text-white"
//                       }`}
//                     >
//                       {item.title}
//                     </h3>

//                     <div
//                       className={`w-14 h-[3px] mt-6 mb-6 transition-all duration-500 ${
//                         isInView ? "bg-[#f5f5f2]" : "bg-yellow-400"
//                       }`}
//                     ></div>

//                     <p
//                       className={`leading-relaxed text-lg transition-all duration-500 ${
//                         isInView ? "text-[#d7d2cb]" : "text-zinc-400"
//                       }`}
//                     >
//                       {item.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       {/* POPUP */}
//       {open && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6">
//           <div className="bg-[#111111] border border-white/10 rounded-[35px] w-full max-w-md p-8 relative">
//             {/* CLOSE */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-5 right-5 text-zinc-400 hover:text-white text-2xl"
//             >
//               ×
//             </button>

//             {/* TITLE */}
//             <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
//               VELTRIX® ACCESS
//             </p>

//             <h2 className="text-4xl font-black mt-5 leading-none">
//               JOIN THE
//               <br />
//               MOVEMENT
//             </h2>

//             <p className="text-zinc-400 mt-5 leading-relaxed">
//               Get notified about exclusive drops, premium releases and
//               members-only collections.
//             </p>

//             {/* FORM */}
//             <div className="mt-8 space-y-4">
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 className="w-full bg-black border border-white/10 rounded-2xl px-5 h-14 outline-none text-white"
//               />

//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full bg-black border border-white/10 rounded-2xl px-5 h-14 outline-none text-white"
//               />

//               <input
//                 type="text"
//                 placeholder="Your City"
//                 className="w-full bg-black border border-white/10 rounded-2xl px-5 h-14 outline-none text-white"
//               />

//               <button className="w-full bg-white text-black h-14 rounded-2xl font-bold hover:bg-zinc-200 transition">
//                 JOIN NOW
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.section>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";

const features = [
  {
    number: "01",
    title: "DESIGNED\nFOR STYLE",
    desc: "Clean silhouettes with refined details made to elevate your everyday look.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "02",
    title: "ENGINEERED\nFOR PERFORMANCE",
    desc: "Responsive cushioning and advanced support for powerful everyday movement.",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop",
  },
  {
    number: "03",
    title: "MADE\nFOR COMFORT",
    desc: "Soft interiors and breathable materials that keep you comfortable all day.",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function EditorialShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-black text-white overflow-hidden"
    >
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
            PANAHI.com® PERFORMANCE
          </p>

          <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-[-0.06em] mt-8">
            DESIGNED
            <br />
            TO FLOW
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mt-10">
            Every silhouette is engineered with precision, balancing modern
            streetwear aesthetics with high-performance movement and timeless
            design.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-12 border border-white px-10 py-5 rounded-full hover:bg-[#f5f5f2] hover:text-black transition duration-500"
          >
            DISCOVER MORE
          </button>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div
            className="
              overflow-hidden
              rounded-[36px]
              bg-[#161616]
              border border-white/5
              transition-all duration-500
            "
          >
            <img
              src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1400&auto=format&fit=crop"
              alt="shoe"
              className="
                w-full
                h-[520px]
                object-cover
                rounded-[32px]
              "
            />
          </div>

          {/* FLOAT CARD */}
          <div
            className="
              absolute
              -bottom-10
              left-10
              bg-[#f5f5f2]
              text-black
              p-8
              rounded-[30px]
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              w-[360px]
            "
          >
            <p className="uppercase text-xs tracking-[0.35em] text-zinc-500">
              NEW DROP
            </p>

            <h3 className="text-4xl font-black mt-3 tracking-[-0.05em]">
              PANAHI REACT
            </h3>

            <p className="text-zinc-600 mt-3 text-lg">
              Built for everyday movement.
            </p>
          </div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className="border-t border-white/10 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* TITLE */}
          <div className="text-center mb-20">
            <p className="text-zinc-500 tracking-[0.4em] uppercase text-xs">
              Why PANAHI?
            </p>

            <h2
              className="text-5xl md:text-7xl mt-6 font-black tracking-[-0.06em]"
              style={{ fontFamily: "cursive" }}
            >
              BUILT FOR YOU
            </h2>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
              Every element inside our shoes is designed with purpose, for the
              way you move.
            </p>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => {
              const ref = useRef(null);

              const isInView = useInView(ref, {
                amount: 0.6,
                once: false,
              });

              return (
                <motion.div
                  ref={ref}
                  key={index}
                  className={`group border rounded-[35px] overflow-hidden transition-all duration-700
                  ${
                    isInView
                      ? "bg-[#3b3b3b] text-white border-white/10"
                      : "bg-[#0a0a0a] text-white border-white/10"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="p-8 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-60 object-cover rounded-[28px] transition-all duration-700 ${
                        isInView ? "scale-[1.02]" : "scale-100"
                      }`}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="px-8 pb-10 transition duration-500">
                    <p
                      className={`font-bold text-sm tracking-[0.3em] mb-5 transition-all duration-500 ${
                        isInView ? "text-amber-300" : "text-zinc-300"
                      }`}
                    >
                      {item.number}
                    </p>

                    <h3
                      className={`text-3xl font-black leading-none whitespace-pre-line transition-all duration-500 ${
                        isInView ? "text-white" : "text-zinc-100"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div
                      className={`w-14 h-[3px] mt-6 mb-6 transition-all duration-500 ${
                        isInView ? "bg-amber-300" : "bg-zinc-500"
                      }`}
                    ></div>

                    <p
                      className={`leading-relaxed text-lg transition-all duration-500 ${
                        isInView ? "text-zinc-300" : "text-zinc-400"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-[#111111] border border-white/10 rounded-[35px] w-full max-w-md p-8 relative">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white text-2xl"
            >
              ×
            </button>

            {/* TITLE */}
            <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
              VELTRIX® ACCESS
            </p>

            <h2 className="text-4xl font-black mt-5 leading-none">
              JOIN THE
              <br />
              MOVEMENT
            </h2>

            <p className="text-zinc-400 mt-5 leading-relaxed">
              Get notified about exclusive drops, premium releases and
              members-only collections.
            </p>

            {/* FORM */}
            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-black border border-white/10 rounded-2xl px-5 h-14 outline-none text-white"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-black border border-white/10 rounded-2xl px-5 h-14 outline-none text-white"
              />

              <input
                type="text"
                placeholder="Your City"
                className="w-full bg-black border border-white/10 rounded-2xl px-5 h-14 outline-none text-white"
              />

              <button className="w-full bg-white text-black h-14 rounded-2xl font-bold hover:bg-zinc-200 transition">
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
