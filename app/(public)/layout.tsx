"use client";

import AiSidenav from "@/components/layout/home/ai-sidenav";
import Navbar from "@/components/layout/navbar";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const isAiSearch = pathname.includes("aisearch");

  return isAiSearch ? (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AiSidenav />
        <SidebarInset>
          <header className="absolute z-20  h-14 w-14 flex items-center gap-2  px-4">
            <SidebarTrigger />
          </header>

          {children}
        </SidebarInset>
        <div className=" relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear"></div>
      </SidebarProvider>
    </TooltipProvider>
  ) : (
    <>
      <Navbar /> {children}
    </>
  );
}
