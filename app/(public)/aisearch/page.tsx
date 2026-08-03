// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
// import Image from "next/image";

// interface Product {
//   _id: string;
//   name: string;
//   brand: string;
//   category: string;
//   color: string;
//   gender: string;
//   salePrice: number;
//   mrp: number;
//   imageUrl: string;
//   description: string;
//   tags?: string[];
// }

// interface MSG {
//   role: "user" | "assistant" | "products";
//   content: string;
//   products?: Product[];
// }

// const Page = () => {
//   const [prompt, setPrompt] = useState<string>("");
//   const [messages, setMessages] = useState<MSG[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   // Auto scroll to bottom on new messages
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!prompt.trim() || isLoading) return;

//     const userMessage = prompt.trim();
//     setPrompt("");

//     // Add user message
//     setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

//     setIsLoading(true);

//     try {
//       const res = await fetch("/api/aisearch", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: userMessage }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.details);
//       }
//       const data = await res.json();
//       console.log(data);

//       // Add AI answer
//       if (!data.error) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: data.answer.content },
//         ]);
//       }

//       // Add products if found
//       if (data.products?.length > 0) {
//         setMessages((prev) => [
//           ...prev,
//           { role: "products", content: "", products: data.products },
//         ]);
//       }
//     } catch (error: any) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: error.message,
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Submit on Enter (not Shift+Enter)
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e as any);
//     }
//   };

//   return (
//     <main className="w-full fixed overflow-y-scroll z-10 h-full items-center px-4 sm:px-6 lg:px-10">
//       <section className="m-auto max-w-4xl h-full px-4 sm:px-6 lg:px-10">
//         {/* Empty state */}
//         <AnimatePresence>
//           {messages.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center justify-center flex-col h-96 gap-2"
//             >
//               <h1 className="text-3xl font-bold">What are you looking for?</h1>
//               <p className="text-muted-foreground">
//                 Ask me anything — brands, colors, styles, budget...
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Messages */}
//         <div className="space-y-4 pb-28 pt-6">
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className={`flex  ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//             >
//               {/* User message */}
//               {msg.role === "user" && (
//                 <Card className="max-w-[80%] px-4 py-3 bg-accent text-accent-foreground rounded-br-none">
//                   <CardContent className="p-0 text-start">
//                     {msg.content}
//                   </CardContent>
//                 </Card>
//               )}

//               {/* AI answer */}
//               {msg.role === "assistant" && (
//                 <div className="max-w-[80%] text-start">
//                   <TextGenerateEffect words={msg.content} />
//                 </div>
//               )}

//               {/* Product cards */}
//               {msg.role === "products" && msg.products && (
//                 <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
//                   {msg.products.map((product) => (
//                     <motion.div
//                       key={product._id}
//                       initial={{ opacity: 0, scale: 0.95 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <Card className="relative mx-auto w-full max-w-sm pt-0 ring-0 gap-2 rounded-none cursor-pointer">
//                         <div className="relative inset-0 z-30 " />
//                         <img
//                           src={product.imageUrl}
//                           alt="Event cover"
//                           className="z-20 aspect-square h-full  w-full object-cover"
//                         />
//                         <CardTitle className="flex  gap-2">
//                           <span className="font-bold">
//                             {product.brand + " "}
//                           </span>
//                           {product.name}
//                         </CardTitle>

//                         <CardDescription>{product.description}</CardDescription>
//                         <CardContent className="gap-1 sm:gap-2 flex items-baseline px-0 w-full font-bold">
//                           ₹{product.salePrice}
//                           <span className="line-through text-gray-500 text-xs">
//                             ₹{product.mrp}
//                           </span>
//                           <span className="text-red-500 font-bold w-full sm:text-sm text-xs ">
//                             {(
//                               ((product.mrp - product.salePrice) /
//                                 product.mrp) *
//                               100
//                             ).toFixed(1)}
//                             % OFF
//                           </span>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}

//           {/* Loading indicator */}
//           {isLoading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex justify-start"
//             >
//               <div className="flex gap-1 px-4 py-3">
//                 {[0, 1, 2].map((i) => (
//                   <motion.div
//                     key={i}
//                     className="w-2 h-2 bg-muted-foreground rounded-full"
//                     animate={{ y: [0, -6, 0] }}
//                     transition={{
//                       duration: 0.6,
//                       repeat: Infinity,
//                       delay: i * 0.15,
//                     }}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           <div ref={bottomRef} />
//         </div>

//         {/* Input bar */}
//         <div className="z-30 sticky bottom-0 h-32 w-full pt-2 bg-background">
//           <form
//             onSubmit={handleSubmit}
//             className="max-w-3xl flex mx-auto items-center justify-around bg-accent rounded-[40px] min-h-20 sm:min-h-16 sm:p-2 p-4 gap-2"
//           >
//             <Textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Search anything — white nike shoes, casual sneakers..."
//               className="md:text-lg text-lg w-full border-0 ring-0 active:ring-0 focus-visible:ring-0 min-h-10"
//               disabled={isLoading}
//             />
//             <Button
//               type="submit"
//               disabled={isLoading || !prompt.trim()}
//               className="rounded-full aspect-square h-12"
//             >
//               &rarr;
//             </Button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Page;

"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  color: string;
  gender: string;
  salePrice: number;
  mrp: number;
  imageUrl: string;
  description: string;
  tags?: string[];
}

interface MSG {
  role: "user" | "assistant" | "products";
  content: string;
  products?: Product[];
}

// Memoized product card
const ProductCard = memo(({ product }: { product: Product }) => (
  <Card className="relative mx-auto w-full max-w-sm pt-0 ring-0 gap-2 rounded-none cursor-pointer">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="z-20 aspect-square h-full w-full object-cover"
    />
    <CardTitle className="flex gap-2">
      <span className="font-bold">{product.brand} </span>
      {product.name}
    </CardTitle>
    <CardDescription>{product.description}</CardDescription>
    <CardContent className="gap-1 sm:gap-2 flex items-baseline px-0 w-full font-bold">
      ₹{product.salePrice}
      <span className="line-through text-gray-500 text-xs">₹{product.mrp}</span>
      <span className="text-red-500 font-bold w-full sm:text-sm text-xs">
        {(((product.mrp - product.salePrice) / product.mrp) * 100).toFixed(1)}%
        OFF
      </span>
    </CardContent>
  </Card>
));
ProductCard.displayName = "ProductCard";

const Page = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<MSG[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage = prompt.trim();
    setPrompt("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/aisearch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details);
      }

      const data = await res.json();

      if (!data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer.content },
        ]);
      }

      if (data.products?.length > 0) {
        setMessages((prev) => [
          ...prev,
          { role: "products", content: "", products: data.products },
        ]);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <main className="w-full fixed z-10 h-full px-4 sm:px-6 lg:px-10">
      <section className="m-auto max-w-4xl h-full overflow-y-auto px-4 sm:px-6 lg:px-10">
        {/* Empty state */}
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center flex-col h-96 gap-2"
            >
              <h1 className="text-3xl font-bold">What are you looking for?</h1>
              <p className="text-muted-foreground">
                Ask me anything — brands, colors, styles, budget...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="space-y-4 pb-36 pt-6">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              // Only animate the newest message
              initial={i >= messages.length - 2 ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {/* User message */}
              {msg.role === "user" && (
                <Card className="max-w-[80%] px-4 py-3 bg-accent text-accent-foreground rounded-br-none">
                  <CardContent className="p-0 text-start">
                    {msg.content}
                  </CardContent>
                </Card>
              )}

              {/* AI answer — only animate latest, plain text for older */}
              {msg.role === "assistant" && (
                <div className="max-w-[80%] text-start">
                  {i >= messages.length - 2 ? (
                    <TextGenerateEffect words={msg.content} />
                  ) : (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                </div>
              )}

              {/* Product cards */}
              {msg.role === "products" && msg.products && (
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {msg.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-1 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-muted-foreground rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="z-30 sticky bottom-0 h-32 w-full pt-2 bg-background">
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl flex mx-auto items-center justify-around bg-accent rounded-[40px] min-h-20 sm:min-h-16 sm:p-2 p-4 gap-2"
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search anything — white nike shoes, casual sneakers..."
              className="md:text-lg text-lg w-full border-0 ring-0 active:ring-0 focus-visible:ring-0 min-h-10"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="rounded-full aspect-square h-12"
            >
              &rarr;
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Page;
