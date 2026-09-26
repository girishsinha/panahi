"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Edit,
  Home,
  LogOut,
  Brain,
  ShoppingBag,
  ChessKing,
  ChessQueen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Cart } from "./cart";

const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "AI Search", href: "/aisearch", icon: Brain },
  { title: "Men", href: "/mens-collection", icon: ChessKing },
  { title: "Women", href: "/womens-collection", icon: ChessQueen },
];

export default function AiSidenav() {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  async function handleLogout() {
    const res = await fetch("/api/admin/login", { method: "GET" });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Logout failed");
    }
  }

  const isActive = (item: any) => item.href === pathname;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {navItems.map((item) => (
          <SidebarGroup key={item.href}>
            {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item)}
                    tooltip={item.title}
                  >
                    <Link href={item.href} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Cart>
                    <ShoppingBag size={24} />
                    <span>Cart</span>
                  </Cart>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}

      <SidebarRail />
    </Sidebar>
  );
}
