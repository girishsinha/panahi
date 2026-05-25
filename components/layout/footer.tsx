export default function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="grid md:grid-cols-2 gap-20 border-b border-zinc-800 pb-20">
          {/* LEFT */}
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-zinc-500">
              VELTRIX® FOOTWEAR
            </p>

            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.06em] mt-8">
              MOVE
              <br />
              DIFFERENT
            </h2>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-10">
            {/* SHOP */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-8">
                Shop
              </h3>

              <div className="space-y-4 text-zinc-300">
                <p className="hover:text-white transition cursor-pointer">
                  Running
                </p>

                <p className="hover:text-white transition cursor-pointer">
                  Streetwear
                </p>

                <p className="hover:text-white transition cursor-pointer">
                  New Arrivals
                </p>

                <p className="hover:text-white transition cursor-pointer">
                  Collections
                </p>
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-8">
                Company
              </h3>

              <div className="space-y-4 text-zinc-300">
                <p className="hover:text-white transition cursor-pointer">
                  About
                </p>

                <p className="hover:text-white transition cursor-pointer">
                  Journal
                </p>

                <p className="hover:text-white transition cursor-pointer">
                  Careers
                </p>

                <p className="hover:text-white transition cursor-pointer">
                  Contact
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-6">
          <p className="text-zinc-500 text-sm">
            © 2026 VELTRIX® — All Rights Reserved
          </p>

          <div className="flex gap-8 text-sm text-zinc-500">
            <p className="hover:text-white transition cursor-pointer">
              Instagram
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Twitter
            </p>

            <p className="hover:text-white transition cursor-pointer">
              Pinterest
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// export default function Footer() {
//   return (
//     <footer className="bg-black text-white pt-28 md:pt-36 pb-14 overflow-hidden border-t border-zinc-900">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* TOP */}
//         <div className="grid lg:grid-cols-2 gap-20 border-b border-zinc-800 pb-20">
//           {/* LEFT */}
//           <div>
//             <p className="uppercase tracking-[0.45em] text-xs text-zinc-500">
//               VELTRIX® PERFORMANCE
//             </p>

//             <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-[-0.07em] mt-8">
//               MOVE
//               <br />
//               DIFFERENT
//             </h2>

//             {/* TAGLINE */}
//             <p className="mt-8 text-zinc-400 text-lg max-w-md leading-relaxed">
//               Crafted for motion — engineered for everyday luxury and modern
//               streetwear movement.
//             </p>

//             {/* BRAND MEANING */}
//             <div className="mt-10 border-l border-zinc-700 pl-5">
//               <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-3">
//                 What is Veltrix?
//               </p>

//               <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
//                 “Vel” symbolizes velocity and movement while “trix” represents
//                 futuristic engineered fashion.
//               </p>
//             </div>

//             {/* NEWSLETTER */}
//             <div className="mt-12">
//               <p className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-5">
//                 Join The Movement
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 max-w-md">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="bg-zinc-900 border border-zinc-800 rounded-full px-6 py-4 text-sm outline-none focus:border-white transition w-full"
//                 />

//                 <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:scale-105 transition duration-300">
//                   JOIN
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
//             {/* SHOP */}
//             <div>
//               <h3 className="text-sm uppercase tracking-[0.35em] text-zinc-500 mb-8">
//                 Shop
//               </h3>

//               <div className="space-y-5 text-zinc-300">
//                 <p className="hover:text-white transition cursor-pointer">
//                   Running
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Streetwear
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   New Arrivals
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Collections
//                 </p>
//               </div>
//             </div>

//             {/* COMPANY */}
//             <div>
//               <h3 className="text-sm uppercase tracking-[0.35em] text-zinc-500 mb-8">
//                 Company
//               </h3>

//               <div className="space-y-5 text-zinc-300">
//                 <p className="hover:text-white transition cursor-pointer">
//                   About
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Journal
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Careers
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Contact
//                 </p>
//               </div>
//             </div>

//             {/* SUPPORT */}
//             <div>
//               <h3 className="text-sm uppercase tracking-[0.35em] text-zinc-500 mb-8">
//                 Support
//               </h3>

//               <div className="space-y-5 text-zinc-300">
//                 <p className="hover:text-white transition cursor-pointer">
//                   FAQs
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Shipping
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Returns
//                 </p>

//                 <p className="hover:text-white transition cursor-pointer">
//                   Privacy
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MIDDLE STRIP */}
//         <div className="py-8 border-b border-zinc-900 overflow-hidden">
//           <div className="flex gap-20 whitespace-nowrap animate-marquee text-2xl md:text-4xl font-black tracking-[0.35em] text-zinc-800 uppercase">
//             <span>VELTRIX® PERFORMANCE</span>
//             <span>CRAFTED FOR MOTION</span>
//             <span>PREMIUM STREETWEAR</span>
//             <span>ENGINEERED LUXURY</span>
//             <span>VELTRIX® PERFORMANCE</span>
//             <span>CRAFTED FOR MOTION</span>
//           </div>
//         </div>

//         {/* BOTTOM */}
//         <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-6">
//           <p className="text-zinc-500 text-sm text-center md:text-left">
//             © 2026 VELTRIX® — Crafted for Motion.
//             <br className="md:hidden" />
//             All Rights Reserved.
//           </p>

//           {/* SOCIALS */}
//           <div className="flex gap-8 text-sm text-zinc-500">
//             <p className="hover:text-white transition cursor-pointer">
//               Instagram
//             </p>

//             <p className="hover:text-white transition cursor-pointer">
//               Twitter
//             </p>

//             <p className="hover:text-white transition cursor-pointer">
//               Pinterest
//             </p>

//             <p className="hover:text-white transition cursor-pointer">TikTok</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
