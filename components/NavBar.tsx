"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between gap-4">
        {/* Logo + Mobile Menu */}
        <div className="flex w-full items-center justify-between gap-3 md:w-auto">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              className="dark:hidden"
            />
            <Image
              src="/logo-dark.png"
              alt="Logo"
              width={24}
              height={24}
              className="hidden dark:block"
            />
            <span>Classic</span>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-4">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/company">Company</Link>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm hover:text-black dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm hover:text-black dark:hover:text-white"
          >
            Products
          </Link>
          <Link
            href="/pricing"
            className="text-sm hover:text-black dark:hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-sm hover:text-black dark:hover:text-white"
          >
            Blog
          </Link>
          <Link
            href="/company"
            className="text-sm hover:text-black dark:hover:text-white"
          >
            Company
          </Link>
        </nav>

        {/* Search + CTA */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Input placeholder="Search" className="h-9 w-44 pl-8" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M21 21l-6-6" />
            </svg>
          </div>
          <Button className="px-8 font-bold shadow-[0px_-2px_0px_rgba(255,255,255,0.4)_inset] dark:bg-white dark:text-black">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
