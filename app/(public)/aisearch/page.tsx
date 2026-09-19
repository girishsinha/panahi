"use client";

import React, { useState, useRef, useEffect, memo } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpIcon, MessageCircleDashedIcon } from "lucide-react";

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
  <Item variant="outline">
    <ItemMedia variant="image">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="aspect-square h-24 w-24 rounded-sm object-cover"
      />
    </ItemMedia>
    <ItemContent>
      <ItemTitle className="line-clamp-1">
        {product.name}
        <span className="ml-2 text-muted-foreground font-normal">
          {product.brand}
        </span>
      </ItemTitle>
      <ItemDescription>{product.description.slice(0, 70)}... </ItemDescription>
    </ItemContent>
    <ItemContent className="flex-none text-right">
      <ItemDescription className="flex flex-col gap-1">
        ₹{product.salePrice.toFixed(2)}
      </ItemDescription>

      <p className=" text-[0.6rem] line-clamp-2 text-left  leading-normal font-normal text-muted-foreground group-data-[size=[0.4rem]]/item:text-xs ">
        <span className="text-red-500 font-stretch-ultra-condensed">
          {(((product.mrp - product.salePrice) / product.mrp) * 100).toFixed(1)}
          % OFF
        </span>
        <span className="line-through"> ₹{product.mrp}</span>
      </p>
    </ItemContent>
  </Item>
));
ProductCard.displayName = "ProductCard";

const Page = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<MSG[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  console.log("messages", messages);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage = prompt.trim();
    setPrompt("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/testingAgent", {
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
          {
            role: "assistant",
            content: data.answer,
            products: data.products,
          },
        ]);
      }

      // if (data.products?.length > 0) {
      //   setMessages((prev) => [
      //     ...prev,
      //     { role: "products", content: "", products: data.products },
      //   ]);
      // }
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
    <main className="  z-10 sm:px-6 lg:px-10">
      <MessageScrollerProvider>
        <div className="relative flex flex-col gap-4">
          <Card className="mx-auto h-screen w-full max-w-4xl gap-0 sm:rounded-none">
            <CardContent className="flex-1 overflow-hidden p-0">
              {messages.length === 0 ? (
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircleDashedIcon />
                    </EmptyMedia>
                    <EmptyTitle>Welcome, To store</EmptyTitle>
                    <EmptyDescription>
                      Are you looking for anything specific?
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <MessageScroller className="p-4 flex items-center ">
                  <MessageScrollerViewport className="p-4">
                    <MessageScrollerContent className="p-(--card-spacing) ">
                      {messages.map((message, i) => (
                        <MessageScrollerItem
                          key={i}
                          messageId={"id" + i}
                          scrollAnchor={message.role === "user"}
                        >
                          <Message
                            align={message.role === "user" ? "end" : "start"}
                          >
                            <MessageContent>
                              {" "}
                              {message.role == "user" ? (
                                <Bubble variant="secondary">
                                  <BubbleContent>
                                    {message.content}
                                  </BubbleContent>
                                </Bubble>
                              ) : (
                                <Bubble variant="ghost">
                                  <BubbleContent></BubbleContent>
                                </Bubble>
                              )}
                            </MessageContent>
                          </Message>

                          {message.role === "assistant" && (
                            <Markdown>{message.content}</Markdown>
                          )}

                          {message.products && (
                            <ItemGroup className="w-full max-w-md gap-3 pt-2">
                              {message.products.map((product) => (
                                <ProductCard
                                  key={product._id}
                                  product={product}
                                />
                              ))}
                            </ItemGroup>
                          )}
                        </MessageScrollerItem>
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2 relative">
              <form onSubmit={handleSubmit} className="w-full">
                <InputGroup>
                  <div className=" w-full px-3 py-2.5 sticky ">
                    <span className="line-clamp-2 opacity-60 data-[status=ready]:opacity-100 ">
                      <InputGroupTextarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        id="block-end-textarea"
                        placeholder="What i can do for you..."
                      />
                    </span>
                  </div>
                  <InputGroupAddon align="block-end" className="pt-1">
                    <InputGroupButton
                      type="submit"
                      variant="default"
                      size="icon-sm"
                      disabled={isLoading}
                      className="ml-auto"
                    >
                      <ArrowUpIcon />
                      <span className="sr-only">Send</span>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            </CardFooter>
          </Card>
        </div>
      </MessageScrollerProvider>
    </main>
  );
};

export default Page;
